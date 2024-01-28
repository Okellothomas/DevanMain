import getCurrentUser from "../actions/getCurrentUsers";
import getReservations from "../actions/getReservation";
import getTourById from "../actions/getTourById";
import getTours, { IToursParams } from "../actions/getTours";
import Container from "../components/container/Container"
import EmptyState from "../components/container/EmptyState";
import TourCard from "../components/listing/TourCard";
import TourMainCard from "../components/listing/TourMainCard";
import Contients from "./components/Continents";
import Sort from "./components/Sort"

interface IParams {
  tourId?: string;
  tourParams: IToursParams;
}

const AllDestinationsPage = async ({ tourParams }: IParams) => {

const tours = await getTours(tourParams);
const currentUser = await getCurrentUser();

 const products: any = [
//   { id: 1, name: 'Product 1', price: 20, length: 5 },
//   { id: 2, name: 'Product 2', price: 30, length: 8 },
  // Add more products as needed
  ];

 // Check if there are no listings, display EmptyState component
  if (tours.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <div>
      <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="alldestinations-white-main">All Prime <span className="color-span-green">Tour Destinations</span></h1>
          </div> 
          <Container>
            <div className="flex flex-row justify-between items-center py-11">
              <div className="flex font-bold flex-row gap-4 items-center">
                  <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 text-start">
                    <p>Filter Results</p>
                  </div>
                  <div>{ tours.length } Tours</div>
              </div>
              <div>
                  <Sort products={products} />
              </div>
            </div>
          </Container> 
          <Container>
              <div className="pt-9 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
              <div className="col-span-1">
                <Contients
                    products={products}
                />   
              </div>
              <div className="col-span-4">
             <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
                {/* Map through the listings array and render ListingCard components */}
                {tours.slice(0, 4).map((tour: any) => {
                return (
                    <TourMainCard
                    currentUser={currentUser} // Pass the current user to each ListingCard
                    key={tour.id} // Use the listing ID as the unique key
                    data={tour} // Pass the listing data to each ListingCard
                    />
                );
                })}
                </div>
              </div>
             </div>
          </Container>  
    </div>
  )
}

export default AllDestinationsPage