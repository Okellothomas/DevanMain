'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
//import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { Key, useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../container/HeartButton";
import Button from "../container/Button";


interface ListingCardProps {
    data: safeListing;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCardMain: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data?.locationValue); //added ?

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data?.price]) //added ?

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'pp')} - ${format(end, 'pp')}`
    }, [reservation])

  return (
      <div
        onClick={() => router.push(`/listings/${data?.id}`)} //added ?
        className="col-span-1 bg-white shadow-sm pb-3 rounded-xl cursor-pointer group"
      >
          <div className="flex flex-col gap-2 w-full">
              <div className="aspect-square w-full relative overflow-hidden rounded-t-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                      <HeartButton
                          listingId={data?.id} //added ?
                          currentUser={currentUser}
                      />
                  </div>
              </div>

              <div className="flex flex-row justify-between px-4">
              <div>
                <span className="font-bold">Naivash</span>      
              </div>
              <div className="text-sm">
                 <span>{location?.label},</span> {location?.region}
              </div>
             </div>
              <div className="font-light px-4 text-neutral-500">
                 {reservationDate || data.category} 
              </div>
              <div className="px-4">
                  <hr />
              </div>
              <div className="flex flex-row px-4 justify-between items-center gap-1">
                  {/* <div className="font-semibold">
                     from ${price}
                  </div> */}
                  <div>
                     from <span className="font-semibold">${price}</span> 
                  </div>
                  <div>
                     save <span className="font-semibold text-blue-600">${price}</span>
                  </div>
                  {/* {!reservation && (
                      <div className="font-light">night</div>
                  )} */}
              </div>
              {onAction && actionLabel && (
                  <Button
                      disabled={disabled}
                      small
                      label={actionLabel}
                      onClick={handleCancel}
                  />
              )}
          </div>   
    </div>
  )
}

export default ListingCardMain