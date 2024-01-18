import getCurrentUser from "./actions/getCurrentUsers";
import getListings from "./actions/getListings";
import Container from "./components/container/Container";
import EmptyState from "./components/container/EmptyState";
import ListingCard from "./components/listing/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  // const isEmpty = true;

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listings: any) => {
          return (
            <ListingCard
              currentUser={currentUser}
              key={listings.id}
              data={listings}
            />
          )
        })}
      </div>
    </Container>
  )
}
