'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../components/container/HeartButton";
import Button from "../components/container/Button";
import { safeTour } from "@/app/types";
import prisma from '@/app/libs/prismadb';
import toast, { useToaster } from "react-hot-toast";
import axios from "axios";


interface ListingCardProps {
    data: safeTour;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

// const TourMyCard: React.FC<ListingCardProps> = ({
//     data,
//     reservation,
//     onAction,
//     disabled,
//     actionLabel,
//     actionId = "",
//     currentUser
// }) => {
//     const router = useRouter();
//     const { getByValue } = useCountries();
//     const location = getByValue(data?.locationValue); //added ?
//     const toaster = useToaster();

//     const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
//         e.stopPropagation();

//         if (disabled) {
//             return;
//         }

//         onAction?.(actionId);
//     }, [onAction, actionId, disabled])

//     const price = useMemo(() => {
//         if (reservation) {
//             return reservation.totalPrice;
//         }

//         return data.price;
//     }, [reservation, data?.price]) //added ?

//     const reservationDate = useMemo(() => {
//         if (!reservation) {
//             return null;
//         }

//         const start = new Date(reservation.startDate)
//         const end = new Date(reservation.endDate)

//         return `${format(start, 'pp')} - ${format(end, 'pp')}`
//     }, [reservation])


//    const deletedTours = async (id: string) => {
//         try {
//             await prisma.tour.delete({
//                 where: {
//                     id  
//                 }
//             });
//             // Show toast message
//             // toaster.success('Listing Created!');
//             // Navigate to "/"
//             router.push("/");
//         } catch (error) {
//             console.error(error);
//             // Show error toast if deletion fails
//             // toaster.error("Failed to delete tour");
//         }
//     }

//   return (
//       <div
//         onClick={() => router.push(`/tours/${data?.id}`)} //added ?
//         className="col-span-1 cursor-pointer group"
//       >
//           <div className="flex flex-col gap-2 w-full main-image-small-screen">
//               <div className="aspect-square w-full relative overflow-hidden rounded-xl">
//                   <Image
//                       fill
//                       alt="Listing"
//                       src={data?.imageSrc[0]} //added ?
//                       className="object-cover h-full w-full transition group-hover:scale-110 main-image-small-screen"
//                   />
//                   <div className="absolute top-3 right-3">
//                       <HeartButton
//                           listingId={data?.id} //added ?
//                           currentUser={currentUser}
//                       />
//                   </div>
//               </div>
//               <div className="text-sm">
//                  <span>{location?.label},</span> {location?.region}
//               </div>
//               <div className="font-light text-neutral-500">
//                  {reservationDate || data.category} 
//               </div>
//               <div className="flex flex-row items-center gap-1">
//                   <div className="font-semibold">
//                       $ {price}
//                   </div>
//                   {!reservation && (
//                       <div className="font-light">night</div>
//                   )}
//               </div>

//               <div className="flex flex-row items-center gap-1">
//                   <div className="font-semibold">
//                      <button onClick={() => deletedTours(data?.id)}>Delete</button>
//                   </div>
//               </div>
              
//               {onAction && actionLabel && (
//                   <Button
//                       disabled={disabled}
//                       small
//                       label={actionLabel}
//                       onClick={handleCancel}
//                   />
//               )}
//           </div>   
//     </div>
//   )
// }

// export default TourMyCard



const TourMyCard: React.FC<ListingCardProps> = ({
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
    const location = getByValue(data?.locationValue || ""); // Handle null locationValue
    const toaster = useToaster();

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

        return data?.price || 0; // Handle null data or price
    }, [reservation, data?.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate || "");
        const end = new Date(reservation.endDate || "");

        return `${format(start, 'pp')} - ${format(end, 'pp')}`
    }, [reservation])

    const deleteTour = async (id: string) => {
        try {
            await prisma.tour.delete({
                where: {
                    id
                }
            });
            // toaster.success('Tour deleted successfully!');
            router.push("/"); // Assuming you want to redirect to "/" after deletion
        } catch (error) {
            console.error(error);
            // toaster.error("Failed to delete tour. Please try again.");
        }
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log("button clicked");
    try {
        const response = await axios.delete(`/api/tours/${data?.id}`, {
            method: 'DELETE',
        });
        console.log("try is working")
        toast.success("Tour deleted successfully")
        router.push("/")
    } catch (error) {
        console.error(error);
        console.log('Failed to delete tour. Please try again.');
    }
};


  return (
      <div
        onClick={() => router.push(`/tours/${data?.id || ""}`)} // Handle null data or id
        className="col-span-1 cursor-pointer group"
      >
          <div className="flex flex-col gap-2 w-full main-image-small-screen">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0] || ""} // Handle null data or imageSrc
                      className="object-cover h-full w-full transition group-hover:scale-110 main-image-small-screen"
                  />
                  <div className="absolute top-3 right-3">
                      <HeartButton
                          listingId={data?.id || ""} // Handle null data or id
                          currentUser={currentUser}
                      />
                  </div>
              </div>
              <div className="text-sm">
                 <span>{location?.label || ""},</span> {location?.region || ""}
              </div>
              <div className="font-light text-neutral-500">
                 {reservationDate || data?.category || ""} 
              </div>
              <div className="flex flex-row items-center gap-1">
                  <div className="font-semibold">
                      $ {price}
                  </div>
                  {!reservation && (
                      <div className="font-light">night</div>
                  )}
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
          <div className="flex flex-row items-center gap-1">
                 <div className="font-semibold">
                    <button className="outline-main-btn" onClick={handleDelete}>Delete</button>
                </div>
         </div>
    </div>
  )
}

export default TourMyCard;