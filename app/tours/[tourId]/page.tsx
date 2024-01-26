// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import getListingById from "@/app/actions/getListingById"
// import EmptyState from "@/app/components/container/EmptyState";
// import getReservations from "@/app/actions/getReservation";
// import TourClient from "./TourClient";
// import getTourById from "@/app/actions/getTourById";
// import Container from "@/app/components/container/Container";
// import TourCard from "@/app/components/listing/TourCard";
// import Link from "next/link";
// import { IToursParams } from "@/app/actions/getTours";
// import getTours from "@/app/actions/getTours";

// interface IParams {
//     tourId?: string;
//     tourParams: IToursParams;
// }

// const TourPage = async ({ params }: { params: IParams, tourParams }) => {
    
//     const tour = await getTourById(params);
//     const reservations = await getReservations(params)
//     const currentUser = await getCurrentUser();
//     const tours = await getTours(tourParams);

//     if (!tour) {
//         return (
//             <EmptyState />
//         )
//     }

//     return (
//         <div>
//         <div className="european-hotel flex flex-col items-center justify-center text-lg font-bold">
//                 <h1 className="color-h1-white">{ tour.title }<span className="color-span-green"></span></h1>
//         </div>
//         <div className="py-6">
//         <TourClient
//             tour={tour}
//             reservations={reservations}
//             currentUser={currentUser}
//                 />
//         </div>
            
//         <Container>
//         <div className="flex flex-col gap-1 pt-5">
//         <h1 className="main-header-black w-full text-center">CLASSIC <span className="main-header-gradient">ADVENTURE TOURS</span></h1>
//         <p className="text-neutral-500 text-sm w-full text-center">Experience the thrill of a lifetime on our curated selection of active, immersive tours full of adrenaline, culture and natural wonder.</p>
//         </div>
//       <div className="pt-10 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//         {/* Map through the listings array and render ListingCard components */}
//         {tours.map((tour: any) => {
//           return (
//             <TourCard
//               currentUser={currentUser} // Pass the current user to each ListingCard
//               key={tour.id} // Use the listing ID as the unique key
//               data={tour} // Pass the listing data to each ListingCard
//             />
//           );
//         })}
//         </div>
//         <div className="w-full text-center pt-8">
//           <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/hotels">View all intercontental hotels</Link>
//         </div>
//       </Container>
//         </div>
        
//   )
// }

// export default TourPage

// Import statements with consistent paths
import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservation";
import getTourById from "@/app/actions/getTourById";
import getTours, { IToursParams } from "@/app/actions/getTours";
import EmptyState from "@/app/components/container/EmptyState";
import Container from "@/app/components/container/Container";
import TourCard from "@/app/components/listing/TourCard";
import Link from "next/link";
import TourClient from "./TourClient";

// Define the interface for the TourPage component props
interface IParams {
  tourId?: string;
  tourParams: IToursParams;
}

// TourPage component is defined as an asynchronous function
const TourPage = async ({ params }: { params: IParams }) => {
  const tour = await getTourById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const tours = await getTours(params.tourParams);

  // Check if there is no tour, display EmptyState component
  if (!tour) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Header section */}
      <div className="european-hotel flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">
          {tour.title}
          <span className="color-span-green"></span>
        </h1>
      </div>

      {/* TourClient section */}
      <div className="py-6">
        <TourClient
          tour={tour}
          reservations={reservations}
          currentUser={currentUser}
        />
      </div>

      {/* Classic Adventure Tours section */}
      <Container>
        <div className="flex flex-col gap-1 pt-5">
          <h1 className="main-header-black w-full text-center">
            PREMIUM <span className="main-header-gradient">SIMILAR TOURS</span>
          </h1>
          <p className="text-neutral-500 text-sm w-full text-center">
            You viewed the magical {tour.title} tour - continue your luxury adventure with these premium recommendations for similar exotic journeys handpicked just for you.
          </p>
        </div>
        <div className="pt-10 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {/* Map through the tours array and render TourCard components */}
          {tours.map((tour: any) => (
            <TourCard
              currentUser={currentUser}
              key={tour.id}
              data={tour}
            />
          ))}
        </div>
        <div className="w-full text-center pt-8">
          <Link
            className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md"
            href="/hotels"
          >
            View all similar premium tours
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default TourPage;
