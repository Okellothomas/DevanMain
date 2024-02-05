
import Link from "next/link";
import getCurrentUser from "../actions/getCurrentUsers";
import getTours, { IToursParams } from "../actions/getTours";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import TourMainCard from "../components/listing/TourMainCard";
import Contients from "./components/Continents";
import Sort from "./components/Sort";
import TourStyles from "./components/TourStyles";
import TourOperators from "./components/TourOperators";
import TourSize from "./components/TourSize";

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
          <p className="text-neutral-600 py-4 text-md">Our prime tour selection offers once-in-a-lifetime travel opportunities to the world‘s most sought-after and awe-inspiring destinations, curated by our experts to provide the ultimate luxurious and immersive experience. From African safaris in search of the Big Five, to cruising the turquoise waters of the Galápagos Islands, to helicopter tours over the Grand Canyon, you‘ll be transported to magical realms brimming with natural beauty, exotic wildlife, and historic treasures beyond your wildest imagination.</p>
        </Container>
        <Container>
          <div className="py-3">
            <hr />
          </div>
        </Container>
        <Container>
          <div className="flex flex-row justify-between items-center py-3">
            <div className="flex font-bold flex-row gap-40 items-center">
              <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 text-start">
                <p>Filter Results</p>
              </div>
              <div className="font-semibold text-xl">{tours.length} Tours</div>
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
              <TourOperators products={products} />
              <TourSize products={products}/>
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