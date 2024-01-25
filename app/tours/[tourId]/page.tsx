import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/container/EmptyState";
import getReservations from "@/app/actions/getReservation";
import TourClient from "./TourClient";
import getTourById from "@/app/actions/getTourById";

interface IParams {
    tourId?: string;
}

const TourPage = async ({ params }: { params: IParams }) => {
    
    const tour = await getTourById(params);
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser();

    if (!tour) {
        return (
            <EmptyState />
        )
    }

    return (
        <div>
        <div className="european-hotel flex flex-col items-center justify-center text-lg font-bold">
            <h1 className="color-h1-white">European <span className="color-span-green">Hotels</span></h1>
        </div>
        <TourClient
            tour={tour}
            reservations={reservations}
            currentUser={currentUser}
        />
        </div>
        
  )
}

export default TourPage