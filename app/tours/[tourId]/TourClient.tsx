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
import { RiRadioButtonLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";

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
    const [isOpen, setIsOpen] = useState(false); 
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [isOpen10, setIsOpen10] = useState(false);
    const [isOpen11, setIsOpen11] = useState(false);
    const [isOpen12, setIsOpen12] = useState(false);
    const [isOpen13, setIsOpen13] = useState(false);
    const [isOpen14, setIsOpen14] = useState(false);
    const [isOpen15, setIsOpen15] = useState(false);
    const [isOpen16, setIsOpen16] = useState(false);
    const [isOpen17, setIsOpen17] = useState(false);
    const [isOpen18, setIsOpen18] = useState(false);

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
                                <span className="text-green-500"><GiWorld size={23 } /></span><span>Countries Explored:</span> 
                              </div>
                              <div>
                                 <span>{tour.countries}</span>
                              </div>
                          </div>
                          <div className="px-3 w-full">
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
                        
                        {/* <div className="flex w-full flex-row items-center justify-between"> 
                                  <div className="flex flex-row items-center gap-3">
                                      <span><RiRadioButtonLine size={23} /> </span>  <span className="text-md text-justify text-neutral-600">Day 1</span>
                                      <p>{ tour.day1 }</p>
                                  </div>
                              </div>   */}

                        {tour.day1 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen(!isOpen)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 1</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen && <p>{tour.day1}</p>}
                        </div>
                        )}
                              
                        {tour.day2 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen1(!isOpen1)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen1 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 2</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen1 && <p>{tour.day2}</p>}
                        </div>
                        )}
                              
                        {tour.Day3 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen2(!isOpen2)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen2 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 3</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen2 && <p>{tour.Day3}</p>}
                        </div>
                        )}
                              
                        {tour.Day4 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen3(!isOpen3)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen3 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 4</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen3 && <p>{tour.Day4}</p>}
                        </div>
                        )}
                              
                        {tour.Day5 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen4(!isOpen4)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen4 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 5</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen4 && <p>{tour.Day5}</p>}
                        </div>
                        )}
                              
                        {tour.Day6 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen5(!isOpen5)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen5 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 6</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen5 && <p>{tour.Day6}</p>}
                        </div>
                        )}
                              
                        {tour.Day7 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen6(!isOpen6)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen6 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 7</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen6 && <p>{tour.Day7}</p>}
                        </div>
                        )}
                              
                        {tour.Day8 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen7(!isOpen7)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen7 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 8</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen7 && <p>{tour.Day8}</p>}
                        </div>
                        )}

                        {tour.Day9 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen8(!isOpen8)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen8 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 9</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen8 && <p>{tour.Day9}</p>}
                        </div>
                        )}
                              
                        {tour.Day10 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen9(!isOpen9)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen9 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 10</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen9 && <p>{tour.Day10}</p>}
                        </div>
                        )}
                              
                        {tour.Day11 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen10(!isOpen10)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen10 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 11</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen10 && <p>{tour.Day11}</p>}
                        </div>
                        )}
                              
                        {tour.Day12 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen11(!isOpen11)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen11 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 12</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen11 && <p>{tour.Day12}</p>}
                        </div>
                        )}
                              
                        {tour.Day13 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen12(!isOpen12)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen12 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 13</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen12 && <p>{tour.Day13}</p>}
                        </div>
                        )}
                              
                        {tour.Day14 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen13(!isOpen13)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen13 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Day 14</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen13 && <p>{tour.Day14}</p>}
                        </div>
                        )}
                              
                        {tour.Week3 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen14(!isOpen14)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen14 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Week 3</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen14 && <p>{tour.Week3}</p>}
                        </div>
                        )}
                              
                        {tour.Week4 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen15(!isOpen15)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen15 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Week 4</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen15 && <p>{tour.Week4}</p>}
                        </div>
                        )}
                              
                        {tour.week5 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen16(!isOpen16)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen16 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Week 5</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen16 && <p>{tour.week5}</p>}
                        </div>
                        )}
                              
                        {tour.week6 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen17(!isOpen17)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen17 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Week 6</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen17 && <p>{tour.week6}</p>}
                        </div>
                        )}
                              
                        {tour.Week7 !== "" && (
                        <div className="flex flex-col w-full items-start gap-3" onClick={() => setIsOpen18(!isOpen18)}>
                            <div className="flex flex-row items-center gap-3 cursor-pointer">
                            <span>
                                <RiRadioButtonLine size={23} className={isOpen18 ? 'text-red-400' : ''} />
                            </span>
                            <span className="text-md text-justify text-neutral-600">Week 7</span>
                            </div>
                            <div className="w-full">       
                            <hr />
                            </div> 
                            {isOpen18 && <p>{tour.Week7}</p>}
                        </div>
                        )}
                              
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

                    <div className="border-[1px] h-[92vh] border-solid py-4 px-4 border-neutral-300 col-span-2 rounded-lg" style={{position: 'sticky', top: '10vh'}}>
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
                                <span className="text-green-400"><GiCash size={23} /></span><span>Price per room:</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>${tour.room}</span>
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