'use client'

import Container from "@/app/components/container/Container";
import ListingHead from "@/app/components/listing/ListingHead.1";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { safeTour } from "@/app/types";
import TourHead from "@/app/components/listing/TourHead";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface TourClientProps {
    reservations?: safeReservation[];
    tour: safeTour & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const TourClient: React.FC<TourClientProps> = ({
    tour,
    reservations = [],
    currentUser
}) => {

    const loginModal = useLoginModal();
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
    const [totalPrice, setTotalPrice] = useState(tour.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        setIsLoading(true);

        axios.post(`/api/reservations`, {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            tourId: tour?.id
        })
            .then(() => {
                toast.success('Tour reserved!');
                setDateRange(initialDateRange);
                // redirect to /trips
                router.push('/trips');
            }).catch(() => {
                toast.error('Something went wrong')
            }).finally(() => {
                setIsLoading(false);
            })
    }, [
        totalPrice,
        dateRange,
        tour?.id,
        router,
        currentUser,
        loginModal
    ]);

    // Calucating the price. 
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && tour.price) {
                setTotalPrice(dayCount * tour.price);
            } else {
                setTotalPrice(tour.price);
            }
        }
    }, [dateRange, tour.price])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === tour.category);
    }, [tour.category])
  return (
    <Container>
          <div className="max-w-sreen-lg mx-auto">
              <div className="flex flex-col gap-6">
                  <TourHead
                      title={tour.title}
                      imageSrc={tour.imageSrc}
                      locationValue={tour.locationValue}
                      id={tour.id}
                      currentUser={currentUser}
                  /> 
                  <div className="grid grid-cols-1 md:grid-cols-7 md:grid-10 mt-6">
                      <ListingInfo
                          user={tour.user}
                          category={category}
                          description={tour.description}
                          roomCount={tour.roomCount}
                          guestCount={tour.guestCount}
                          bathroomCount={tour.bathRoomCount}
                          locationValue={tour.locationValue}
                      />
                      <div className="order-first mb-10 md:order-last md:col-span-3 mx-10">
                          <ListingReservation
                              price={tour.price}
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
          </div>  
    </Container>
  )
}

export default TourClient