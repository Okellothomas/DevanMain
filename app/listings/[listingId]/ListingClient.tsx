'use client'

import PaymentModal from "@/app/components/Modals/PaymentModal";
import Container from "@/app/components/container/Container";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import usePaymentModal from "@/app/hooks/usePaymentModal";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: safeReservation[];
    listing: safeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModal = useLoginModal();
    const paymentModal = usePaymentModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservations) => {
            const range = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate)
            });

            dates = [...dates, ...range]
        })

        return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [showPay, setShowPay] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dataa, setDataa] = useState('')
    const [paymentMade, setPaymentMade] = useState(false)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);




    const handlePaymentComplete = (data: any) => {
        // Handle the data passed from PaymentModal
        console.log('Payment completed with data:', data);
        setDataa(data)
        setPaymentMade(true)
        // You can also update the state or trigger other actions
        // ...
      };
      
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

       console.log("Reserve loading...", paymentModal.isOpen)
        try {
            
            setShowPay(true)
        } catch (error) {
            console.log(error)
        }
       setIsLoading(true);

       if(paymentMade)
       {
        console.log("Payment Data",dataa)
        axios.post(`/api/reservations`, {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                // redirect to /trips
                router.push('/trips');
            }).catch(() => {
                toast.error('Something went wrong')
            }).finally(() => {
                setIsLoading(false);
            })
    }}, [
        totalPrice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        loginModal,
        paymentModal

    ]);

    // Calucating the price. 
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    }, [listing.category])
  return (
    <Container>
          <div className="max-w-sreen-lg mx-auto ">
              <div className="flex flex-col gap-6">
                  <ListingHead
                      title={listing.title}
                      imageSrc={listing.imageSrc}
                      locationValue={listing.locationValue}
                      id={listing.id}
                      currentUser={currentUser}
                  /> 
                  <div className="grid grid-cols-1 md:grid-cols-7 md:grid-10 mt-6">
                      <ListingInfo
                          user={listing.user}
                          category={category}
                          description={listing.description}
                          roomCount={listing.roomCount}
                          guestCount={listing.guestCount}
                          bathroomCount={listing.bathRoomCount}
                          locationValue={listing.locationValue}
                      />
                      <div className="order-first mb-10 md:order-last md:col-span-3 mx-10">
                          <ListingReservation
                              price={listing.price}
                              totalPrice={totalPrice}
                              onChangeDate={(value) => setDateRange(value)}
                              dateRange={dateRange}
                              onSubmit={onCreateReservation}
                              disabled={isLoading}
                              disabledDates={disabledDates}
                          />
                      </div>
                  </div>
              </div> 
              {showPay && <PayPalScriptProvider options={{ clientId: "AcbLNojs3zi8fz5CSO9t0XunN67EBkPBGkvClnuWXElfFB3dALy0lgjEj2zwVSLtcuKF9jwHvFrly2gD" }}>
                  <PaymentModal setShowPayModal={setShowPay} onPaymentComplete={handlePaymentComplete}/>
                </PayPalScriptProvider>}
          </div>  
    </Container>
  )
}

export default ListingClient