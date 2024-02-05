'use client'

import Container from "@/app/components/container/Container";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { safeTour } from "@/app/types";
import TourHead from "@/app/components/listing/TourHead";
import TourInfo from "@/app/components/listing/TourInfo";
import { SlCalender } from "react-icons/sl";
import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountries";
import { SlLocationPin } from "react-icons/sl";
import { ImLocation2 } from "react-icons/im";
import { GiWorld } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { MdOutlineDepartureBoard } from "react-icons/md";
import { FaPlaneArrival } from "react-icons/fa6";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface TourClientProps {
    reservations?: safeReservation[];
    tour: safeTour & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    locationValue: string;
}

const TourClient: React.FC<TourClientProps> = ({
    tour,
    reservations = [],
    currentUser,
    locationValue
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservations) => {
            const range = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate)
            });

            dates = [...dates, ...range]
        })

        return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(tour.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        setIsLoading(true);

        axios.post(`/api/reservations`, {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            tourId: tour?.id
        })
            .then(() => {
                toast.success('Tour reserved!');
                setDateRange(initialDateRange);
                // redirect to /trips
                router.push('/trips');
            }).catch(() => {
                toast.error('Something went wrong')
            }).finally(() => {
                setIsLoading(false);
            })
    }, [
        totalPrice,
        dateRange,
        tour?.id,
        router,
        currentUser,
        loginModal
    ]);
    
    const Map = dynamic(() => import('../../components/container/Map'), {
        ssr: false
    } )

    // Calucating the price. 
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && tour.price) {
                setTotalPrice(dayCount * tour.price);
            } else {
                setTotalPrice(tour.price);
            }
        }
    }, [dateRange, tour.price])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === tour.category);
    }, [tour.category])


  return (
    <Container>
          <div className="max-w-sreen-lg mx-auto">
              <div className="flex flex-col gap-6">
                  <TourHead
                      title={tour.title}
                      imageSrc={tour.imageSrc}
                      locationValue={tour.locationValue}
                      id={tour.id}
                      currentUser={currentUser}
                  /> 
                  {/* <div className="grid grid-cols-1 md:grid-cols-7 md:grid-10 mt-6">    */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                    <div className="col-span-3 flex flex-col gap-7">  
                    <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><MdOutlineDepartureBoard size={ 23} /></span> <span>Departure</span>
                                  </div> 
                                  <div>
                                      <span>{tour.depStart }</span>
                                  </div>
                              </div>
                            <div className="py-3 w-full">
                            <hr />
                            </div>
                        
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-red-500"><FaPlaneArrival size={ 23} /></span> <span>End/Return</span>
                                  </div> 
                                  <div>
                                      <span>{tour.depStart }</span>
                                  </div>
                              </div>
                              <div className="py-3 w-full">
                            <hr />
                        </div>

                       <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-orange-500"><FaPersonMilitaryToPerson size={ 23} /></span> <span>Tour Operator:</span>
                                  </div> 
                                  <div>
                                      <span>{tour.operator }</span>
                                  </div>
                              </div>   
                        <div>
                                  
                        </div>
                          </div>
                    
                  <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                     <span className="text-xl font-bold">OVERVIEW</span>
                                  </div>
                              </div>
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                        
                        <div className="flex w-full flex-row items-center justify-between"> 
                                  <div>
                                      <span className="text-md text-justify text-neutral-600">{tour.overView }</span>
                                  </div>
                              </div>  
                        <div>
                                  
                        </div>
                    </div>   


                     <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                     <span className="text-xl font-bold">TOUR ITINERARY</span>
                                  </div>
                              </div>
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                        
                        <div className="flex w-full flex-row items-center justify-between"> 
                                  <div>
                                      <span className="text-md text-justify text-neutral-600">{tour.overView }</span>
                                  </div>
                              </div>  
                        <div>           
                        </div>
                    </div>  

                    <div className="flex h-[65vh] flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 w-full rounded-lg">
                       <iframe
                        src={tour.ourLink}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                        ></iframe>
                    </div>       
                  </div>

                    <div className="border-[1px] h-[93vh] border-solid py-4 px-4 border-neutral-300 col-span-2 rounded-lg" style={{position: 'sticky', top: '10vh'}}>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-blue-400"><SlCalender size={23 } /></span><span>Tour Length</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>{tour.days}</span> <span>Days</span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-green-400"><SlLocationPin size={23 } /></span><span>Tour Starts</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>{tour.locStart}</span> 
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                <span className="text-red-400"><ImLocation2 size={23 } /></span><span>Tour Ends</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>{tour.locEnd}</span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          </div>
                          <TourInfo
                           locationValue={tour.locationValue} />
                          
                          <div className="px-4 py-3">
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                <span className="text-orange-400"><GiWorld size={23 } /></span><span>Countries Explored:</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>{tour.countries}</span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                <span className="text-red-400"><GiTakeMyMoney size={23 } /></span><span>Price per person:</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>${tour.price}</span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                <span className="text-yellow-400"><GiReceiveMoney size={23 } /></span><span>Save per person:</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>${tour.save}</span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                        <div className="px-4 w-full text-center item-center">
                              <div className="w-full text-center items-center">
                                 <span>
                                  <button className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white">Book Tour Now</button>    
                                </span>
                              </div>
                          </div>
                      </div>

                    
                  </div>


              </div>
          </div>  
    </Container>
  )
}

export default TourClient