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
import { FaPersonShelter } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineUpdate } from "react-icons/md";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { LuBedDouble } from "react-icons/lu";
import { BsPersonCircle } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { BsFileEarmarkPerson } from "react-icons/bs";

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
        makeReservation(data)
        // You can also update the state or trigger other actions
        // ...
      };
      const makeReservation = (data:any) =>
      {
         
       {
        setShowPay(false)
        console.log("Payment Data",dataa)
        axios.post(`/api/reservations`, {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
            paymentDetails:data
        })
            .then(async () => {
                toast.success('Listing reserved!');

                setDateRange(initialDateRange);
                // redirect to /trips
                try {
                    const response = await axios.post('/api/mailing/', 
                  
                      {sender:'Info@devancatours.com',
                             recipient:'wanjooo.ken@gmail.com',
                             subject:"Devance Reservations",
                             user_name:currentUser?.name,
                             templateName: 'mail_template',
                             mail_body:`This is a sample test mail from Devance Application and these are the reservatio`

                                },

                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                    );
                
                    const data = await response.data;
                    console.log(data); // handle success message
                
                  } catch (error) {
                    console.error(error); // handle error message
                  }
                //router.push('/trips');
            }).catch(() => {
                toast.error('Something went wrong')
            }).finally(() => {
                setIsLoading(false);
            })
    }
      }
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

  }, [
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
                  <div className="grid grid-cols-1 gap-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-7 md:grid-10 mt-6">
                      {/* <ListingInfo
                          user={listing.user}
                          category={category}
                          description={listing.description}
                          roomCount={listing.roomCount}
                          guestCount={listing.guestCount}
                          bathroomCount={listing.bathRoomCount}
                          locationValue={listing.locationValue}
                      /> */}
                      <div className="w-full col-span-4">
                          
                          <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.city !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><CiLocationArrow1 size={23} /></span><span className="text-md">Location:</span></div> <span className="text-neutral-500">{listing.city}</span>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.distance !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><GiPathDistance size={23} /></span><span className="text-md">Distance from {listing.city}:</span></div> <span className="text-neutral-500">{listing.distance}</span>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.startDate !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><CiCalendarDate size={23} /></span><span className="text-md">Start Booking Date:</span></div><span className="text-neutral-500">{listing.startDate}</span>
                                  </div>
                              )}
                          <div className="w-full py-4">
                           <hr />
                         </div>

                              {listing.endDate !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-neutral-600"><MdOutlineUpdate size={23} /></span><span className="text-md">End Booking Date:</span></div><span className="text-neutral-500">{listing.endDate}</span>
                                  </div>
                              )}
                          <div className="w-full py-4">
                           <hr />
                        </div>
                              
                              {listing.category !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-yellow-600"><MdOutlineTipsAndUpdates size={23} /></span><span className="text-md">Category:</span></div><span className="text-neutral-500">{listing.category}</span>
                                  </div>
                              )}
                          </div>
                        
                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-500">Over View</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.description !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <span className="text-neutral-500">{listing.description}</span>
                                  </div>
                              )}
 
                        </div>

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-500">Where you will sleep!</p>

                        <div className="border-[1px] gap-4 grid grid-cols-4 border-solid py-6 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                          {listing.oneBedroom !== "" && (
                          <div className="border-[1px] border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                            <div className="flex flex-col p-2 items-start gap-2"> <span className="text-neutral-500"><LuBedDouble size={ 23 } /></span><span className="text-md">One Bedroom</span></div> <span className="text-neutral-500">{listing.oneBedroom} qeen bed</span>
                          </div>
                          )}
                              
                          {listing.twoBedroom !== "" && (
                          <div className="border-[1px] border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                            <div className="flex flex-col p-2 items-start gap-2"> <span className="text-neutral-500"><LuBedDouble size={23} /></span><span className="text-md">Two Bedroom</span></div> <span className="text-neutral-500">{listing.twoBedroom} qeen bed</span>
                                  </div>
                          )}
                            
                          {listing.threebedRoom !== "" && (
                          <div className="border-[1px] border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                            <div className="flex flex-col p-2 items-start gap-2"> <span className="text-neutral-600"><LuBedDouble size={23} /></span><span className="text-md">Three Bedroom</span></div><span className="text-neutral-500">{listing.threebedRoom} queen bed</span>
                          </div>
                          )}
                              
                           {listing.commonPlace !== "" && (
                            <div className="border-[1px] border-solid rounded-lg border-neutral-300 p-4 col-span-1">
                                <div className="flex flex-col p-2 items-start gap-2"> 
                                <span className="text-neutral-600"><LuBedDouble size={23} /></span>
                                <span className="text-md">Common spaces</span>
                                </div>
                                <span className="text-neutral-500">{listing.commonPlace} sofa bed</span>
                            </div>
                            )}

                          </div>

                        <p className="pt-6 pb-5 text-lg font-bold text-neutral-500">Host Info!</p>

                         <div className="border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                        
                              {listing.hostName !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><BsPersonCircle size={23} /></span><span className="text-md">Host name:</span></div> <span className="text-neutral-500">{listing.hostName}</span>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.cohostName !== "" && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><GoPerson size={23} /></span><span className="text-md">Co-Host Name:</span></div> <span className="text-neutral-500">{listing.cohostName}</span>
                                  </div>
                              )}

                          <div className="w-full py-4">
                           <hr />
                          </div>

                              {listing.hostContact !== "" && (
                                  <div className="flex flex-row pb-3 justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><BsFileEarmarkPerson size={23} /></span><span className="text-md">Host Contact</span></div><span className="text-neutral-500">{listing.hostContact}</span>
                                  </div>
                              )}

                       {listing.hotelLink !== "" && (
                        <div className="flex h-[66vh] flex-col gap-5 items-start py-4  w-full">
                        <iframe
                            src={listing.hotelLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                            ></iframe>
                        </div>     
                        )}
                              
                        </div>

                      </div>
                      <div className="order-first h-[85vh] w-full mb-10 md:order-last col-span-3" style={{position: 'sticky', top: '10vh'}}>
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
                  <PaymentModal setShowPayModal={setShowPay} onPaymentComplete={handlePaymentComplete} totalPrice={totalPrice.toString()}/>
                </PayPalScriptProvider>}
          </div>  
    </Container>
  )
}

export default ListingClient