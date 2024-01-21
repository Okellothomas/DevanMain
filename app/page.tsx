// import getCurrentUser from "./actions/getCurrentUsers";
// import getListings, { IListingsParams } from "./actions/getListings";
// import Container from "./components/container/Container";
// import EmptyState from "./components/container/EmptyState";
// import ListingCard from "./components/listing/ListingCard";

// interface HomeProps {
//   searchParams: IListingsParams
// }

// const Home = async({searchParams}: HomeProps) => {
//   const listings = await getListings(searchParams);
//   const currentUser = await getCurrentUser();
//   // const isEmpty = true;

//   if (listings.length === 0) {
//     return (
//       <EmptyState showReset />
//     )
//   }  
//   return (
//     <Container>
//       <div className="pt-24 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
//         {listings.map((listings: any) => {
//           return (
//             <ListingCard
//               currentUser={currentUser}
//               key={listings.id}
//               data={listings}
//             />
//           )
//         })}
//       </div>
//     </Container>
//   )
// }

// export default Home



import getCurrentUser from "./actions/getCurrentUsers";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/container/Container";
import EmptyState from "./components/container/EmptyState";
import ListingCard from "./components/listing/ListingCard";

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
  return (
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
  );
};

export default Home;

