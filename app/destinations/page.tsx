import getCurrentUser from "../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/navbar/Categories";
import Search from "../components/navbar/Search";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams }: HotelPageProps) => {
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
  return (
    <div>
    <div className="all-destinations-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-destinations-main">All Prime <span className="color-span-green">Destinations</span></h1>
        <div className="destination-search">
          <Search /> 
        </div>
      </div>
      <div className="py-4">
        <Categories />
      </div>  
      <Container>
        <div className="flex flex-col gap-1 py-9">
        <h1 className="main-header-black w-full text-center">ALL PRIME <span className="main-header-gradient py-1">DESTINATIONS</span></h1>
        <p className="text-neutral-500 text-sm w-full text-justify">Our prime tour selection offers once-in-a-lifetime travel opportunities to the world&lsquo;s most sought-after and awe-inspiring destinations, curated by our experts to provide the ultimate luxurious and immersive experience. From African safaris in search of the Big Five, to cruising the turquoise waters of the Galápagos Islands, to helicopter tours over the Grand Canyon, you&lsquo;ll be transported to magical realms brimming with natural beauty, exotic wildlife, and historic treasures beyond your wildest imagination. With unique access, top-notch guides, luxury accommodations, bespoke services, and unparalleled attention to detail, our prime tours redefine high-end, exclusive travel so you can immerse yourself fully in your choice of remarkable destinations. Don&lsquo;t just dream about that trip of a lifetime - make it a reality with our premium all-inclusive prime tour packages, offering once-in-a-lifetime memories carefully crafted for the discerning traveler.</p>
        </div>
      <div className="pt-0 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
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

export default DestinationPage