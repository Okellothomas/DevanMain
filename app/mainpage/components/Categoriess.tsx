'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Container from '@/app/components/container/Container';
import Image from 'next/image';
import { FaGlobe, FaFlag } from 'react-icons/fa'; 
import { useRouter } from 'next/navigation';

// Updated CategoryBoxProps definition
interface CategoryBoxProps {
    label: string;
    image: string;
    onClick: () => void;
}
// Updated CategoryBox component
const UpdatedCategoryBox: React.FC<CategoryBoxProps> = ({ label, image, onClick }) => {
    return (
        <div className="col-span-1 cursor-pointer group flex flex-col gap-2 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image
                    fill
                    alt={label} // Use label as alt text
                    src={image}
                    className="object-cover h-full w-full transition group-hover:scale-110"
                />
            </div>
            <div className='country-labels shadow-xl text-white p-1 font-semibold'>
                {label}
            </div>
        </div>
    );
};

// Updated categoriesData structure
const categoriesData: { [key: string]: { icon: React.ReactNode; countries: { label: string; image: string }[] }; } = {
    Africa: {
        icon: <FaGlobe size={25} />,
        countries: [
            { label: 'Kenya', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'Uganda', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Ethiopia', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
        ],
    },
    Europe: {
        icon: <FaGlobe size={25} />,
        countries: [
            { label: 'UK', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Germany', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
        ],
    },
    Americas: {
        icon: <FaGlobe size={25} />,
        countries: [
            { label: 'UK', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705575296/dtmyeqsdvvxdv5lfspno.jpg' },
            { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705575296/dtmyeqsdvvxdv5lfspno.jpg' },
            { label: 'Germany', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705575296/dtmyeqsdvvxdv5lfspno.jpg' },
            { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705575296/dtmyeqsdvvxdv5lfspno.jpg' },
        ],
    },
    Asia: {
        icon: <FaGlobe size={25} />,
        countries: [
            { label: 'UK', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'Germany', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
        ],
    },
    Australia: {
        icon: <FaGlobe size={25} />,
        countries: [
            { label: 'UK', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706087927/aj6v1h2so1mhqnyuxmzc.jpg' },
            { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Germany', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706087927/aj6v1h2so1mhqnyuxmzc.jpg' },
        ],
    },
    MiddleEast: {
        icon: <FaGlobe size={25} />,
        countries: [
            { label: 'UK', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Germany', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
            { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705579729/ifg1uhhh4vpe1ofznvgt.jpg' },
            { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1705781708/phaozusyhgheyyawehzv.jpg' },
        ],
    },
    // Add similar structures for other continents
};

const Categoriess = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedContinent, setSelectedContinent] = useState<string>('Africa');
  const [selectedCountries, setSelectedCountries] = useState(
    categoriesData.Africa.countries
  ); // Initialize with Africa's countries
  const isHotelPage = pathname === '/';

  if (!isHotelPage) {
    return null;
  }

  const handleHeaderClick = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountries(categoriesData[continent].countries);
  };

  const handleCategoryClick = (countryLabel: string) => {
    router.push(`/country/${countryLabel}`);
  };

  return (
    <div className="">
      <div className="flex flex-row w-full gap-40">
        {Object.keys(categoriesData).map((continent) => (
          <div
            className='flex gap-2 flex-row'
            key={continent}
            onClick={() => handleHeaderClick(continent)}
          >
            {continent === selectedContinent ? (
              <FaGlobe size={25} />
            ) : (
              <FaGlobe size={25} color="gray" />
            )}
            {continent}
          </div>
        ))}
      </div>
      <div className="inset-0">
        <div className='py-4 full-width-container'>
          <hr />
        </div>
        <div className='full-width-container flex flex-row gap-8 w-full'>
          {selectedCountries.map((country) => (
            <UpdatedCategoryBox
              key={country.label}
              label={country.label}
              image={country.image}
              onClick={() => handleCategoryClick(country.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categoriess;