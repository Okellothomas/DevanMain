'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../container/Heading";
import Image from "next/image";
import HeartButton from "../container/HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string[];
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

  return (
      <>
          <Heading
              title={title}
              subtitle={`${location?.region}, ${location?.label}`}
          />
          <div className="w-full h-[63vh] overflow-hidden rounded-xl relative">
              

         <div className="grid justify-between grid-cols-3">
                <div className="col-span-2 hidden row-span-4">
                    <img src={imageSrc[0]} alt="Main Image" />
                        </div>
                        <div className="flex flex-col justify-center col-span-2 row-span-2">
                        {imageSrc.slice(1,3).map((imageUrl: string | undefined, index: number) => (
                        <img key={index} src={imageUrl} alt={`Small Image ${index + 1}`} />
                        ))}
                      </div>
                  <div className="col-span-4 hidden row-span-4">
                      <img src={imageSrc[3]} alt="Main Image" />
                 </div>
                    
          </div> 


              <div className="absolute top-5 right-5">
                  <HeartButton
                      listingId={id}
                      currentUser={currentUser}
                  />
              </div>
          </div>
      </>
  )
}




//  <div className="image-gallery">
//                 <div className="main-image">
//                     <img src={imageSrc[0]} alt="Main Image" />
//                         </div>
//                         <div className="small-images">
//                         {imageSrc.slice(1).map((imageUrl: string | undefined, index: number) => (
//                         <img key={index} src={imageUrl} alt={`Small Image ${index + 1}`} />
//                         ))}
            
//                     </div>
//           </div> 
export default ListingHead