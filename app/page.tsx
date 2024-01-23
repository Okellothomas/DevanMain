import getCurrentUser from "./actions/getCurrentUsers";
import getListings, { IListingsParams } from "./actions/getListings";
import Carousel from "./components/container/Carousel";
import Container from "./components/container/Container";
import EmptyState from "./components/container/EmptyState";
import Slider from "./components/container/Slider";
import ListingCard from "./components/listing/ListingCard";
import Banner from "./mainpage/components/Banner";
import SearchMain from "./mainpage/components/SearchMain";

// Define the interface for the Home component props
interface HomeProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
}

// Home component is defined as an asynchronous function
const Home = async ({ searchParams }: HomeProps) => {
  // Fetch listings and current user asynchronously
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  // Render the Home component with the fetched listings

  let slides = [
    "/images/spain.jpg",
    "/images/adventure2.jpg",
    "/images/eupope.jpg"
  ]

  return (
    <div>
    <div className="w-full carousel-main-div">
        <Carousel />
        {/* <Carousel slides={slides} /> */}
        {/* <Slider /> */}
      </div>
      <div className="banner-btn-r relative flex flex-col justify-center items-center">
        <Banner />
      </div>
      <div className="SearchMain-page">
        <SearchMain />
      </div>
    <Container>
      <div className="pt-24 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
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
      </Container>
    </div>
  );
};

export default Home;

