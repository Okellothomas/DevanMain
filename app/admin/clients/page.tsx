
import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getTours, { IToursParams } from "@/app/actions/getTours";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getUsers, { IUsersParams } from "@/app/actions/getUsers";
import deleteUsers from "@/app/actions/deleteUsers";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
  userParams: IUsersParams;
}

// Home component is defined as an asynchronous function
const ClientsPage = async ({ searchParams, tourParams, userParams }: HotelPageProps) => {
  // Fetch listings, current user, and users asynchronously
  const currentUser = await getCurrentUser();
  const users = await getUsers({ ...userParams, userType: "client" });

  // Delete user function
  const handleDeleteUser = async (id: string) => {
    try {
      // Call your deleteUsers function from the API to delete the user
      await deleteUsers({ id });

      // After deletion, fetch the updated user list
      const updatedUsers = await getUsers({ ...userParams, userType: "client" });

      // Update the state or re-render the component with the updated user list
      // (This depends on how you manage state in your application)
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error as needed (e.g., show an error message)
    }
  };

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
            <div className="pb-6">
              <h1 className="text-2xl font-bold">All Clients</h1>
            </div>
            <div className="items-center pb-1">
               {users.length === 0 ? (
                  <p>No operators are currently available please come back later!</p>
                ) : (
                  users.map((user) => (
                    <div className="flex flex-row py-7 justify-between border-b-2" key={user.id}>
                      <div>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.contact }</p>
                      </div>
                      <button onClick={() => handleDeleteUser(user.id)}>Delete</button> {/* onClick={() => handleDeleteUser(user.id)} */}
                    </div>
                  ))
                )}
            </div>
            {/* <AdminInfo userParams={userParams} /> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClientsPage;
