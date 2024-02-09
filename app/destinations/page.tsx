import getCurrentUser from "../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/navbar/Categories";
import Search from "../components/navbar/Search";
import Link from "next/link";
import BookingCard from "../mainpage/components/BookingCard";
import ListingValue from "../components/listing/ListingValue";
import getTours, { IToursParams } from "../actions/getTours";
import TourCard from "../components/listing/TourCard";
import TheCategoriess from "./TheCategoriess";
import TourMainCard from "../components/listing/TourMainCard";
import TourPriceCard from "../components/listing/TourPriceCard";
import TourCardSecondary from "../components/listing/TourCardSecondary";
import ListingCardMain from "../components/listing/ListingCardMain";
import EmptyStates from "../components/container/EmptyStates";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();
    const tours = await getTours(tourParams);
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (tours.length === 0) {
    return (
      <EmptyStates showReset />
    );
  }

  return (
    <div>
    <div className="all-destinations-main-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-destinations-main">All Prime <span className="color-span-green">Destinations</span></h1>
        <div className="destination-search-main">
          <Search /> 
        </div>
      </div>
     <Container>
        <div className="flex flex-col gap-1 pt-6 pb-4">
        <h1 className="main-header-black w-full text-center pt-9 pb-0">ALL PRIME <span className="main-header-gradient py-1">DESTINATIONS</span></h1>
        <p className="text-md text-neutral-600 leading-8 pt-6 pb-0 text-md w-full text-justify">Embark on unparalleled travel experiences with our prime tour selection. Curated by experts, these journeys transport you to sought-after destinations. From African safaris to cruising the Galápagos Islands, and from breathtaking landscapes in the Swiss Alps to cultural immersions in historic Rome, immerse yourself in luxurious adventures filled with natural beauty, wildlife, and historic treasures. Explore the Grand Canyon and beyond on helicopter tours, redefining your travel expectations.</p>
        </div>
      </Container>
      <Container>
          <div className="pb-0">
            <hr />
          </div>
      </Container>
      <Container>
      <div className="pt-6 pb-4 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {tours.slice(0, 4).map((tour: any) => {
          return (
            <TourPriceCard
              currentUser={currentUser} // Pass the current user to each ListingCard
              key={tour.id} // Use the listing ID as the unique key
              data={tour} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/alldestinations">View prime destinations</Link>
        </div>
          </Container>
          
      <div className="tour-booking flex flex-col py-12 my-9 items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">How to book with us</h1>
        <Container>
          <div className="pt-10 pb-5 main-page-cards">
            <BookingCard />
          </div>
        </Container>
      </div>
          
        <Container>
        <div className="flex flex-col gap-1 pt-4">
        <h1 className="main-header-black w-full text-center">FEATURED <span className="main-header-gradient">CLASSIC TOUR</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Don&lsquo;t miss out on these incredible, once-in-a-lifetime travel experiences launching soon - book your spot today for the adventure of a lifetime.</p>
        </div>
        <div className="pt-9 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {tours.slice(4, 8).map((tour: any) => {
          return (
            <TourCardSecondary
              currentUser={currentUser} // Pass the current user to each ListingCard
              key={tour.id} // Use the listing ID as the unique key
              data={tour} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
      </Container>
      
    </div>
  );
};

export default DestinationPage