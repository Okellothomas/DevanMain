import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getTours, { IToursParams } from "@/app/actions/getTours";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getUsers, { IUsersParams } from "@/app/actions/getUsers";

import getAdmins from "@/app/actions/getAdmins";

// Define the interface for the Home component props
interface AdminPageProps {
  userParams: IUsersParams;
}

// Home component is defined as an asynchronous function
const AdministratorsPage = async ({ userParams }: AdminPageProps) => {
  // Fetch listings, current user, and users asynchronously
  const currentUser = await getCurrentUser();
  const users = await getAdmins({ ...userParams, userType: "admin" });
  // Delete user function

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
              <h1 className="text-2xl font-bold">All Administrators</h1>
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
                        <p>0702939929</p>
                      </div>
                      <button>Delete</button> {/* onClick={() => handleDeleteUser(user.id)} */}
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

// eslint-disable-next-line import/no-default-export
export default AdministratorsPage;
