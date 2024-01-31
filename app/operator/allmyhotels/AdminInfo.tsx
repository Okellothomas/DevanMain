'use client'
import React, { useState, useEffect } from 'react';
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

// Home component is defined as a functional component
const AdminInfo: React.FC<HotelPageProps> = ({ searchParams, tourParams, userParams }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  // Function to fetch current user
  const fetchCurrentUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  // Function to fetch users
  const fetchUsers = async () => {
    const usersData = await getUsers({ ...userParams, userType: "admin" });
    setUsers(usersData);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Delete user function
  const handleDeleteUser = async (id: string) => {
    try {
      // Call your deleteUsers function from the API to delete the user
      await deleteUsers({ id });

      // After deletion, fetch the updated user list
      fetchUsers();

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
          <div className="col-span-4">
            <div className="py-6">
              <h1 className="text-2xl font-bold">All Clients</h1>
            </div>
            <div className="items-center pb-8">
              {users.map((user) => (
                <div className="flex flex-row py-7 justify-between border-b-2" key={user.id}>
                  <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    {/* Add more user information as needed */}
                  </div>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminInfo;
