import EmptyState from "../components/container/EmptyState";

import getCurrentUser from "../actions/getCurrentUsers";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No Properties found"
                subtitle="Looks like you don't have properties."
            />
        )
    }

  return (
      <PropertiesClient
          currentUser={currentUser}
          listings={listings}
      />
  )
}

export default PropertiesPage