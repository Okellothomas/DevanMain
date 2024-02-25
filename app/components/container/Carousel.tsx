// 'use client'

// // Import necessary modules
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { images } from "@/utils/constants";

// const Carousel = () => {
//     // Initialize current state to 0
//     let [current, setCurrent] = useState(0);

//     const nextSlide = () => {
//         setCurrent((current + 1) % images.length);
//     }

//     useEffect(() => {
//         const timer = setInterval(() => {
//             nextSlide();
//         }, 1000); // 600000 4 seconds interval

//         // Clear the interval when the component unmounts
//         return () => clearInterval(timer);
//     }, [current, nextSlide]);

//     // Check if the last image is reached and reset to the first one
//     useEffect(() => {
//         if (current === images.length - 1) {
//             setCurrent(0);
//         }
//     }, [current]);

//     return (
//        <div>
//             <div className="carousel-container">
//                 <div className="flex transition ease-out duration-4 carousel-images-main"
//                     style={{ transform: `translateX(${current * -100}%)` }}
//                 >
//                     {images.map((s, index) => (
//                         <div className="block w-full h-[85vh] object-over transition-all duration-500 ease-in-out" key={index}>
//                             {/* Add a div for the overlay */}
//                             <div className="overlay absolute inset-0 bg-black bg-opacity-15"></div>
//                             <Image
//                                 src={s.src}
//                                 fill={true}
//                                 layout="fill"
//                                 className="carousel-images w-full h-full object-cover"
//                                 alt=""
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 
// "use client";
// import { useEffect } from "react";

// const Carousel = () => {
//   useEffect(() => {
//     const init = async () => {
//       const { Carousel, initTE } = await import("tw-elements");
//       initTE({ Carousel });
//     };
//     init();
//   }, []);

//   return (
//     <div
//       id="carouselExampleCrossfade"
//       className="relative"
//       data-te-carousel-init
//       data-te-ride="carousel">
//       <div
//         className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
//         data-te-carousel-indicators>
//         <button
//           type="button"
//           data-te-target="#carouselExampleCrossfade"
//           data-te-slide-to="0"
//           data-te-carousel-active
//           className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
//           aria-current="true"
//           aria-label="Slide 1"></button>
//         <button
//           type="button"
//           data-te-target="#carouselExampleCrossfade"
//           data-te-slide-to="1"
//           className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
//           aria-label="Slide 2"></button>
//         <button
//           type="button"
//           data-te-target="#carouselExampleCrossfade"
//           data-te-slide-to="2"
//           className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
//           aria-label="Slide 3"></button>
//       </div>

//       <div
//         className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
//         <div
//           className="relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
//           data-te-carousel-fade
//           data-te-carousel-item
//           data-te-carousel-active>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
//             className="block w-full"
//             alt="Wild Landscape" />
//         </div>
//         <div
//           className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
//           data-te-carousel-fade
//           data-te-carousel-item>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
//             className="block w-full"
//             alt="Camera" />
//         </div>

//         <div
//           className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
//           data-te-carousel-fade
//           data-te-carousel-item>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
//             className="block w-full"
//             alt="Exotic Fruits" />
//         </div>
//       </div>
//       <button
//         className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
//         type="button"
//         data-te-target="#carouselExampleCrossfade"
//         data-te-slide="prev">
//         <span className="inline-block h-8 w-8">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="h-6 w-6">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </span>
//         <span
//           className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
//           >Previous</span
//         >
//       </button>

//       <button
//         className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
//         type="button"
//         data-te-target="#carouselExampleCrossfade"
//         data-te-slide="next">
//         <span className="inline-block h-8 w-8">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="h-6 w-6">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </span>
//         <span
//           className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
//           >Next</span
//         >
//       </button>
//     </div>
//   );
// };

// export default Carousel;



// 'use client'

// // Import necessary modules
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { images } from "@/utils/constants";

// const Carousel = () => {
//     // Initialize current state to 0
//     let [current, setCurrent] = useState(0);

//     const nextSlide = () => {
//         setCurrent((current + 1) % images.length);
//     }

//     useEffect(() => {
//         const timer = setInterval(() => {
//             nextSlide();
//         }, 1000); // 1 second interval for image transition

//         // Clear the interval when the component unmounts
//         return () => clearInterval(timer);
//     }, [current, nextSlide]);

//     // Check if the last image is reached and reset to the first one
//     useEffect(() => {
//         if (current === images.length - 1) {
//             setCurrent(0);
//         }
//     }, [current]);

//     return (
//         <div>
//             <div className="carousel-container">
//                 <div className="flex transition ease-out duration-4 carousel-images-main"
//                     style={{ transform: `translateX(${current * -100}%)` }}
//                 >
//                     {[...images, ...images, ...images].map((s, index) => (
//                         <div className="block w-full h-[85vh] object-over transition-opacity duration-1000 ease-in-out" key={index} style={{ opacity: index === current ? 1 : 0 }}>
//                             {/* Add a div for the overlay */}
//                             <div className="overlay absolute inset-0 bg-black bg-opacity-15"></div>
//                             <Image
//                                 src={s.src}
//                                 fill={true}
//                                 layout="fill"
//                                 className="carousel-images w-full h-full object-cover"
//                                 alt=""
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Carousel;

'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "@/utils/constants";

const Carousel = () => {
    // Initialize current state to 0
    let [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((current + 1) % images.length);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000); // 1 second interval for image transition

        // Clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, [current, nextSlide]);

    // Check if the last image is reached and reset to the first one
    useEffect(() => {
        if (current === images.length - 1) {
            setCurrent(0);
        }
    }, [current]);

    // Determine the indices of the images to render
    const renderIndices = [current, (current + 1) % images.length];

    return (
        <div>
            <div className="carousel-container">
                <div className="flex transition ease-out duration-4 carousel-images-main">
                    {renderIndices.map((index) => (
                        <div className="block w-full h-[80vh] object-over transition-opacity duration-1000 ease-in-out" key={index}>
                            {/* Add a div for the overlay */}
                            {/* <div className="overlay absolute inset-0 bg-black bg-opacity-15"></div> */}
                            <Image
                                src={images[index].src}
                                fill={true}
                                layout="fill"
                                className="carousel-images w-full object-cover"
                                alt=""
                            />
                        <div className="overlay carousel-images absolute inset-0 bg-black bg-opacity-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;



// Import necessary modules
// import Image from "next/image";
// import { images } from "@/utils/constants";

// const Carousel = () => {
//   // Display only the first image
//   const current = 0;

//   return (
//     <div>
//       <div className="carousel-container">
//         <div className="flex transition ease-out duration-4 carousel-images-main">
//           <div className="block w-full h-[85vh] object-cover transition-all duration-500 ease-in-out">
//             {/* Add a div for the overlay */}
//             <div className="overlay-pro overlay h-[75] absolute inset-0 bg-black bg-opacity-45"></div>
//             <Image
//               src={images[current].src}
//             //   fill={true} 
//                 //layout="fill"
//                 height={700}
//                 width={1000}
//               className="carousel-images w-full h-[75vh] object-cover"
//               alt=""
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

