// import getCurrentUser from "../actions/getCurrentUsers";
// import getReservations from "../actions/getReservation";
// import getTourById from "../actions/getTourById";
// import getTours, { IToursParams } from "../actions/getTours";
// import Container from "../components/container/Container"
// import EmptyState from "../components/container/EmptyState";
// import TourCard from "../components/listing/TourCard";
// import TourMainCard from "../components/listing/TourMainCard";
// import Contients from "./components/Continents";
// import Sort from "./components/Sort"

// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
// }

// const AllDestinationsPage = async ({ tourParams }: IParams) => {

// const tours = await getTours(tourParams);
// const currentUser = await getCurrentUser();

//  const products: any = [
// //   { id: 1, name: 'Product 1', price: 20, length: 5 },
// //   { id: 2, name: 'Product 2', price: 30, length: 8 },
//   // Add more products as needed
//   ];

//  // Check if there are no listings, display EmptyState component
//   if (tours.length === 0) {
//     return (
//       <EmptyState showReset />
//     );
//   }

//   return (
//     <div>
//       <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
//         <h1 className="alldestinations-white-main">All Prime <span className="color-span-green">Tour Destinations</span></h1>
//           </div> 
//           <Container>
//             <div className="flex flex-row justify-between items-center py-11">
//               <div className="flex font-bold flex-row gap-4 items-center">
//                   <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 text-start">
//                     <p>Filter Results</p>
//                   </div>
//                   <div>{ tours.length } Tours</div>
//               </div>
//               <div>
//                   <Sort products={products} />
//               </div>
//             </div>
//           </Container> 
//           <Container>
//               <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//               <div className="col-span-1">
//                 <Contients
//                     products={products}
//                 />   
//               </div>
//               <div className="col-span-4">
//              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
//                 {/* Map through the listings array and render ListingCard components */}
//                 {tours.map((tour: any) => {
//                 return (
//                     <TourMainCard
//                     currentUser={currentUser} // Pass the current user to each ListingCard
//                     key={tour.id} // Use the listing ID as the unique key
//                     data={tour} // Pass the listing data to each ListingCard
//                     />
//                 );
//                 })}
//                 </div>
//               </div>
//              </div>
//           </Container>  
//     </div>
//   )
// }

// export default AllDestinationsPage
//*******************************Second issu */
// 'use client'

// import React, { Component } from 'react';
// import getCurrentUser from '../actions/getCurrentUsers';
// import getTours, { IToursParams } from '../actions/getTours';
// import Container from '../components/container/Container';
// import EmptyState from '../components/container/EmptyState';
// import TourMainCard from '../components/listing/TourMainCard';
// import Contients from './components/Continents';
// import Sort from './components/Sort';

// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
// }

// interface IState {
//   tours: any[];
//   currentUser: {
//     createdAt: string;
//     updatedAt: string;
//     emailVerified: string | null;
//     id: string;
//     name: string | null;
//     email: string | null;
//     image: string | null;
//     hashedPassword: string | null;
//     favoriteIds: string[];
//   } | null;
//   currentPage: number;
// }

// class AllDestinationsPage extends Component<IParams, IState> {
//   constructor(props: IParams) {
//     super(props);
//     this.state = {
//       tours: [],
//       currentUser: null,
//       currentPage: 1,
//     };
//   }

//   async componentDidMount() {
//     await this.getToursAndRender();
//   }

//   async getToursAndRender() {
//     const { tourParams } = this.props;
//     const tours = await getTours(tourParams);
//     const currentUser = await getCurrentUser();

//     this.setState({
//       tours,
//       currentUser,
//       currentPage: 1, // Reset currentPage when fetching new data
//     });
//   }

//   handlePageChange = (newPage: number) => {
//     this.setState({ currentPage: newPage });
//   };

//   render() {
//     const { tours, currentPage, currentUser } = this.state;
//     const PAGE_SIZE = 15;

//     const startIndex = (currentPage - 1) * PAGE_SIZE;
//     const visibleTours = tours.slice(startIndex, startIndex + PAGE_SIZE);

//     if (visibleTours.length === 0) {
//       return <EmptyState showReset />;
//     }

//     return (
//       <div>
//         <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
//           <h1 className="alldestinations-white-main">
//             All Prime <span className="color-span-green">Tour Destinations</span>
//           </h1>
//         </div>

//         <Container>
//           <div className="flex flex-row justify-between items-center py-11">
//             <div className="flex font-bold flex-row gap-4 items-center">
//               <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 text-start">
//                 <p>Filter Results</p>
//               </div>
//               <div>{tours.length} Tours</div>
//             </div>
//             <div>
//               <Sort products={[]} />
//             </div>
//           </div>
//         </Container>

//         <Container>
//           <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//             <div className="col-span-1">
//               <Contients products={[]} />
//             </div>
//             <div className="col-span-4">
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
//                 {visibleTours.map((tour: any) => (
//                   <TourMainCard
//                     currentUser={null}
//                     key={tour.id}
//                     data={tour}
//                   />
//                 ))}
//               </div>

//               <div className="flex justify-center items-center mt-4">
//                 {currentPage > 1 && (
//                   <button onClick={() => this.handlePageChange(currentPage - 1)}>
//                     Previous
//                   </button>
//                 )}

//                 {Array.from({ length: Math.ceil(tours.length / PAGE_SIZE) }).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => this.handlePageChange(index + 1)}
//                     style={{
//                       background: currentPage === index + 1 ? 'gray' : 'none',
//                       color: currentPage === index + 1 ? 'white' : 'black',
//                       padding: '5px',
//                       margin: '2px',
//                     }}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}

//                 {currentPage < Math.ceil(tours.length / PAGE_SIZE) && (
//                   <button onClick={() => this.handlePageChange(currentPage + 1)}>
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }
// }

// export default AllDestinationsPage;


//******************************************************************************************** */
import Link from "next/link";
import getCurrentUser from "../actions/getCurrentUsers";
import getTours, { IToursParams } from "../actions/getTours";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import TourMainCard from "../components/listing/TourMainCard";
import Contients from "./components/Continents";
import Sort from "./components/Sort";
import TourStyles from "./components/TourStyles";

// Define the interface for component props
interface IParams {
  tourId?: string;
  tourParams: IToursParams;
}

// Define the AllDestinationsPage component as a server component
export default function AllDestinationsPage({ tourParams }: IParams) {
  // Fetch data inside the render function (server component behavior)
  const getToursAndRender = async () => {
    const tours = await getTours(tourParams);
    const currentUser = await getCurrentUser();

    const PAGE_SIZE = 15;
    const currentPage = 1;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const visibleTours = tours.slice(startIndex, startIndex + PAGE_SIZE);

    const products: any = [];

    // Check if there are no listings, display EmptyState component
    if (visibleTours.length === 0) {
      return <EmptyState showReset />;
    }

    const totalPages = Math.ceil(tours.length / PAGE_SIZE);

    return (
      <div>
        <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="alldestinations-white-main">
            All Prime <span className="color-span-green">Tour Destinations</span>
          </h1>
        </div>
        <Container>
          <div className="flex flex-row justify-between items-center py-11">
            <div className="flex font-bold flex-row gap-4 items-center">
              <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 text-start">
                <p>Filter Results</p>
              </div>
              <div>{tours.length} Tours</div>
            </div>
            <div>
              <Sort products={products} />
            </div>
          </div>
        </Container>
        <Container>
          <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            <div className="col-span-1 flex flex-col gap-6">
              <Contients products={products} />
              <TourStyles products={products} />
            </div>
            <div className="col-span-4">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
                {/* Map through the visible listings array and render ListingCard components */}
                {visibleTours.map((tour: any) => (
                  <TourMainCard
                    currentUser={currentUser} // Pass the current user to each ListingCard
                    key={tour.id} // Use the listing ID as the unique key
                    data={tour} // Pass the listing data to each ListingCard
                  />
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center items-center mt-4">
                {currentPage > 1 && (
                  <Link href={`/alldestinations?page=${currentPage - 1}`}>
                    <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
                  </Link>
                )}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link key={index} href={`/alldestinations?page=${index + 1}`}>
                    <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
                      {index + 1}
                    </p>
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link href={`/alldestinations?page=${currentPage + 1}`}>
                    <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  };

  // Return the result of the render function
  return getToursAndRender();
}
//**********************************************************************
// import React, { useState, useEffect } from "react";
// import Container from "../components/container/Container";
// import EmptyState from "../components/container/EmptyState";
// import TourMainCard from "../components/listing/TourMainCard";
// import Contients from "./components/Continents";
// import Sort from "./components/Sort";
// import { IToursParams } from '../actions/getTours';
// import { fetchAllData } from './components/FetchData';

// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
// }

// const AllDestinationsPage: React.FC<IParams> = ({ tourParams }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tours, setTours] = useState<any[]>([]);
//   const [currentUser, setCurrentUser] = useState<any | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Use the fetchData function
//         const { toursData, user } = await fetchAllData(tourParams);
//         setTours(toursData);
//         setCurrentUser(user);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [tourParams]);


//   const products: any = [];
  
//   const PAGE_SIZE = 15;
//   const startIndex = (currentPage - 1) * PAGE_SIZE;
//   const visibleTours = tours.slice(startIndex, startIndex + PAGE_SIZE);

//   // Check if there are no listings, display EmptyState component
//   if (visibleTours.length === 0) {
//     return <EmptyState showReset />;
//   }

//   const totalPages = Math.ceil(tours.length / PAGE_SIZE);

//     return (
//       <div>
//         <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
//           <h1 className="alldestinations-white-main">
//             All Prime <span className="color-span-green">Tour Destinations</span>
//           </h1>
//         </div>
//         <Container>
//           <div className="flex flex-row justify-between items-center py-11">
//             <div className="flex font-bold flex-row gap-4 items-center">
//               <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 text-start">
//                 <p>Filter Results</p>
//               </div>
//               <div>{tours.length} Tours</div>
//             </div>
//             <div>
//               <Sort products={products} />
//             </div>
//           </div>
//         </Container>
//         <Container>
//           <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//             <div className="col-span-1">
//               <Contients products={products} />
//             </div>
//             <div className="col-span-4">
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
//                 {/* Map through the visible listings array and render ListingCard components */}
//                 {visibleTours.map((tour: any) => (
//                   <TourMainCard
//                     currentUser={currentUser} // Pass the current user to each ListingCard
//                     key={tour.id} // Use the listing ID as the unique key
//                     data={tour} // Pass the listing data to each ListingCard
//                   />
//                 ))}
//               </div>
//               {/* Pagination */}
//               <div className="flex justify-center items-center mt-4">
//                 {currentPage > 1 && (
//                   <button
//                     onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
//                     className="mx-2 p-2 bg-gray-500 text-white"
//                   >
//                     Previous
//                   </button>
//                 )}
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`mx-2 p-2 ${
//                       currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//                 {currentPage < totalPages && (
//                   <button
//                     onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
//                     className="mx-2 p-2 bg-gray-500 text-white"
//                   >
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   };

//   // Return the result of the render function


// export default AllDestinationsPage;
