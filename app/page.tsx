// import { useRouter } from "next/navigation";
import getCurrentUser from "./actions/getCurrentUsers";
import getListings, { IListingsParams } from "./actions/getListings";
import getTours, { IToursParams } from "./actions/getTours";
import Carousel from "./components/container/Carousel";
import Container from "./components/container/Container";
import EmptyState from "./components/container/EmptyState";
import Slider from "./components/container/Slider";
import ListingCard from "./components/listing/ListingCard";
import Banner from "./mainpage/components/Banner";
import SearchMain from "./mainpage/components/SearchMain";
import MainButton from "./components/container/MainButton";
import Link from "next/link";
import CardDisplay from "./mainpage/components/CardDisplay";
import { FaStar } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdFoodBank } from "react-icons/md";
import { GiClockwork } from "react-icons/gi";
import Categoriess from "./mainpage/components/Categoriess";

// Define the interface for the Home component props
interface HomeProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
}

// Home component is defined as an asynchronous function
const Home = async ({ searchParams, tourParams }: HomeProps) => {
  // Fetch listings and current user asynchronously
  const listings = await getListings(searchParams);
  const tours = await getTours(tourParams);
  const currentUser = await getCurrentUser();
  // const router = useRouter();
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  // Render the Home component with the fetched listings

  // let slides = [
  //   "/images/spain.jpg",
  //   "/images/adventure2.jpg",
  //   "/images/eupope.jpg"
  // ]

  return (
    <div>
    <div className="w-full carousel-main-div">
        <Carousel />
        {/* <Carousel slides={slides} /> */}
        {/* <Slider /> */}
      </div>
      <div className="carousel-main-div banner-btn-r relative flex flex-col justify-center items-center">
        <Banner />
      </div>
      <div className="SearchMain-page">
        <SearchMain />
      </div>
      <Container>
        <div className="flex flex-col gap-1 pt-9">
        <h1 className="main-header-black w-full text-center">AMAZING <span className="main-header-gradient">UPCOMING TOURS</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Don&lsquo;t miss out on these incredible, once-in-a-lifetime travel experiences launching soon - book your spot today for the adventure of a lifetime.</p>
        </div>
        <div className="pt-9 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {/* Map through the listings array and render ListingCard components */}
        {tours.map((tour: any) => {
          return (
            <ListingCard
              currentUser={currentUser} // Pass the current user to each ListingCard
              key={tour.id} // Use the listing ID as the unique key
              data={tour} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/hotels">View all upcoming tours</Link>
        </div>
      </Container>
      <div className="tour-inconfort flex flex-col py-12 my-9 items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">Tour in comfort and style</h1>
        <Container>
          <div className="pt-10 pb-5 grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 main-page-cards">
            <CardDisplay
              icon={FaStar}
              label="Insightful experiences"
              />
              <CardDisplay
              icon={FaThreads}
              label="Make travel matter"
              />
              <CardDisplay
              icon={MdFoodBank}
              label="Superior first class hotels"
              />
              <CardDisplay
              icon={GiClockwork}
              label="20+ years of experience"
            />
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex flex-col gap-1 pt-5">
        <h1 className="main-header-black w-full text-center">INTERCONTENTAL <span className="main-header-gradient">CLASS HOTELS</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Experience timeless luxury and impeccable service at our handpicked collection of iconic five-star hotels spanning the globe.</p>
        </div>
      <div className="pt-10 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
        {/* Map through the listings array and render ListingCard components */}
        {listings.map((listing: any) => {
          return (
            <ListingCard
              currentUser={currentUser} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/hotels">View all intercontental hotels</Link>
        </div>
      </Container>
      {/* The categories page */}
      <Container>
        <div className="flex flex-col gap-1 pt-10">
        <h1 className="main-header-black w-full text-center">EXPLORE OUR <span className="main-header-gradient">PRIME DESTINATIONS</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Experience timeless luxury and impeccable service at our handpicked collection of iconic five-star hotels spanning the globe.</p>
        </div>
        <div className="pt-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        <Categoriess />
        </div>
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/hotels">View our prime destinations</Link>
        </div>
      </Container>
    </div>
  );
};

export default Home;

