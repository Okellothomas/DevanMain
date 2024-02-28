import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getTours, { IToursParams } from "@/app/actions/getTours";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getUsers, { IUsersParams } from "@/app/actions/getUsers";
import deleteUsers from "@/app/actions/deleteUsers";
import getAdmins from "@/app/actions/getAdmins";
import Image from "next/image";
import ListingCard from "@/app/components/listing/ListingCard";
import getMyListingsHouses from "@/app/aagetMethods/getMyListingsHouses";
import HouseMyCard from "@/app/aahooks/HouseMyCard";
import getMyListingsHotels from "@/app/aagetMethods/getMyListingsHotels";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  userParams: IUsersParams;
}

// Home component is defined as an asynchronous function
const AdministratorsPage = async ({ searchParams, userParams }: HotelPageProps) => {
  try {
    // Fetch listings, current user, and users asynchronously
    let currentUser: any;
    if (searchParams.userId) {
      currentUser = await getCurrentUser();
    }

    // const listings = await getMyListingsHotels(searchParams);

    const listings = await getMyListingsHotels({ ...searchParams, userId: currentUser?.id, hotel: "hotel" });

    // Delete user function
    const handleDeleteUser = async (id: string) => {
      try {
        // Call your deleteUsers function from the API to delete the user
        await deleteUsers({ id });

        // After deletion, fetch the updated user list
        const updatedUsers = await getUsers({ ...userParams, userType: "admin" });

        // Update the state or re-render the component with the updated user list
        // (This depends on how you manage state in your application)
        console.log("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        // Handle error as needed (e.g., show an error message)
      }
    };

    // Check if searchParams exists before accessing userId

    // Render the Home component with the fetched listings

    // Render the Home component with the fetched listings
    return (
      <div>
        <div className="all-destinations-main-admin-profile flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="color-h1-destinations-main-admin-profile">
            {currentUser?.name}
            <span className="color-span-green"></span>
          </h1>
        </div>
        <Container>
          <div className="grid grid-cols-5 gap-10 pt-16">
            <div className="col-span-1">
              <SideBar />
            </div>
            <div className="col-span-4">
              <div className="pb-2">
                <h1 className="text-2xl font-bold">All My Hotels</h1>
              </div>
              <div className="items-center pb-1">
                <div className="pt-2 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                  {listings.map((listing: any) => {
                    return (
                      <HouseMyCard
                        currentUser={currentUser ? {
                          ...currentUser,
                          createdAt: currentUser.createdAt.toISOString(),
                          updatedAt: currentUser.updatedAt.toISOString(),
                          emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                        } : null} // Pass the current user to each ListingCard
                        key={listing.id} // Use the listing ID as the unique key
                        data={listing} // Pass the listing data to each ListingCard
                      />
                    );
                  })}
                </div>
              </div>
              {/* <AdminInfo userParams={userParams} /> */}
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    // Handle error as needed
    // return <div>Error occurred: {error.message}</div>;
  }
};

export default AdministratorsPage;
