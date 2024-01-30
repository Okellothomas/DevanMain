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
//         }, 6000000); // 600000 4 seconds interval

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

// export default Carousel;

// Import necessary modules
import Image from "next/image";
import { images } from "@/utils/constants";

const Carousel = () => {
  // Display only the first image
  const current = 0;

  return (
    <div>
      <div className="carousel-container">
        <div className="flex transition ease-out duration-4 carousel-images-main">
          <div className="block w-full h-[85vh] object-cover transition-all duration-500 ease-in-out">
            {/* Add a div for the overlay */}
            <div className="overlay-pro overlay h-[75] absolute inset-0 bg-black bg-opacity-45"></div>
            <Image
              src={images[current].src}
            //   fill={true} 
                //layout="fill"
                height={700}
                width={1000}
              className="carousel-images w-full h-[75vh] object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

