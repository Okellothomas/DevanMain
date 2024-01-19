import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/container/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState />
        )
    }

    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser}
        />
  )
}

export default ListingPage