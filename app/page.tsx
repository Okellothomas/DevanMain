import getCurrentUser from "./actions/getCurrentUsers";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/container/Container";
import EmptyState from "./components/container/EmptyState";
import ListingCard from "./components/listing/ListingCard";

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams);
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

export default Home
