// 'use client';

// import React, { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Image from 'next/image';
// import { FaGlobe, FaGlobeEurope } from 'react-icons/fa'; 
// import { useRouter } from 'next/navigation';
// import { GiAfrica, GiEarthAmerica, GiKangaroo } from "react-icons/gi";
// import { BsGlobeAsiaAustralia, BsGlobeCentralSouthAsia } from "react-icons/bs";

// // Updated CategoryBoxProps definition
// interface CategoryBoxProps {
//     label: string;
//     image: string;
//     onClick: () => void;
// }
// // Updated CategoryBox component
// const UpdatedCategoryBox: React.FC<CategoryBoxProps> = ({ label, image, onClick }) => {
//     return (
//         <div className="col-span-1 cursor-pointer group flex flex-col gap-2 w-full">
//             <div className="aspect-square w-full relative overflow-hidden rounded-xl">
//                 <Image
//                     fill
//                     alt={label} // Use label as alt text
//                     src={image}
//                     className="object-cover h-full w-full transition group-hover:scale-110"
//                 />
//             </div>
//             <div className='country-labels shadow-xl text-white p-1 font-semibold'>
//                 {label}
//             </div>
//         </div>
//     );
// };

// // Updated categoriesData structure
// const categoriesData: { [key: string]: { icon: React.ReactNode; countries: { label: string; image: string }[] }; } = {
//     Africa: {
//         icon: <GiAfrica size={25} />,
//     countries: [
//             { label: 'Uganda', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706656723/mmsi6lgaumup7a6tcouf.jpg' },
//             { label: 'Tanzania', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706655863/ohwvocfyquoo4fgjwf9g.jpg' },
//             { label: 'Kenya', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706654682/vjdst2i5en7fsf6ooswn.jpg' },
//             { label: 'South Africa', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706656153/dstqm5cnqfjwdqa70r2w.jpg' },
//         ],
//     },
//     Europe: {
//         icon: <FaGlobeEurope size={25} />,
//         countries: [
//             { label: 'United Kingdom', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773529/jdljafu5ypmfpjoyo8fw.jpg' },
//             { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773533/xrhli2kvf8zdgovolutw.jpg' },
//             { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773531/w5dxirkp7pfa3xhljuhr.jpg' },
//             { label: 'Italy', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706801036/k7zlv1w0bz8eohnl6cms.jpg' },
//         ],
//     },
//     Americas: {
//         icon: <GiEarthAmerica size={25} />,
//         countries: [
//             { label: 'United States', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805881/q2nzdhdev94hg2yzyozq.jpg' },
//             { label: 'Canada', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805878/sikqsj5659wtdsoxqg82.jpg' },
//             { label: 'Mexico', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805879/tz7ijw5c9rz4fhhzpwgd.jpg' },
//             { label: 'Brazil', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805877/uadyoxdygrwsu9lnhpkl.jpg' },
//         ],
//     },
//     Asia: {
//         icon: <BsGlobeAsiaAustralia size={25} />,
//         countries: [
//             { label: 'Singapore', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807737/zuwb65myobne2mtppa0w.jpg' },
//             { label: 'China', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807736/ukxnjpnkrxu9kcjcn1de.jpg' },
//             { label: 'India', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807735/yttxdq5hpem1rsjovq30.jpg' },
//             { label: 'Japan', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807736/dzerbzzgml29weuna4el.jpg' },
//         ],
//     },
//     Australia: {
//         icon: <GiKangaroo size={25} />,
//         countries: [
//             { label: 'Sydney', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809531/fg2j3slmxhzlqgmufotn.jpg' },
//             { label: 'Melbourne', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809529/oiosbnercqtsjkc4yhmy.jpg' },
//             { label: 'Hobart', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809531/jdbwjdv9p2ghba9xccr1.jpg' },
//             { label: 'Adeliade', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809532/gbklrppldg8z2kkaf60p.jpg' },
//         ],
//     },
//     MiddleEast: {
//         icon: <BsGlobeCentralSouthAsia size={25} />,
//         countries: [
//             { label: 'Saudi Arabia', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/bc6gwxxmglfkpmqxowys.jpg' },
//             { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/y5rbgikqyqyge7oo3xwh.jpg' },
//             { label: 'UAE', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/lbx7mjgfmhzs6ecxivuc.jpg' },
//             { label: 'Isreal', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/pleheggycj6zuna2cjg0.jpg' },
//         ],
//     },
// };

// const Categoriess = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [selectedContinent, setSelectedContinent] = useState<string>('Africa');
//   const [selectedCountries, setSelectedCountries] = useState(
//     categoriesData.Africa.countries
//   ); // Initialize with Africa's countries
//   const isHotelPage = pathname === '/';

//   if (!isHotelPage) {
//     return null;
//   }

//   const handleHeaderClick = (continent: string) => {
//     setSelectedContinent(continent);
//     setSelectedCountries(categoriesData[continent].countries);
//   };

//   const handleCategoryClick = (countryLabel: string) => {
//     router.push(`/country/${countryLabel}`);
//   };

//   return (
//     <div className="">
//       <div className="flex flex-row w-full gap-40">
//         {Object.keys(categoriesData).map((continent) => (
//   <div
//     className='flex gap-2 flex-row cursor-pointer'
//     key={continent}
//     onClick={() => handleHeaderClick(continent)}
//       >
//         {continent === selectedContinent ? (
//           <>{categoriesData[continent].icon}</>
//         ) : (
//           React.isValidElement(categoriesData[continent].icon) ? (
//             React.cloneElement(
//               categoriesData[continent].icon as React.ReactElement<any>,
//               { color: "gray", size: 25 }
//             )
//           ) : (
//             <span>Icon Not Found</span>
//           )
//         )}
//         {continent}
//       </div>
//     ))}
//       </div>
//       <div className="inset-0">
//         <div className='py-4 full-width-container'>
//           <hr />
//         </div>
//         <div className='full-width-container flex flex-row gap-8 w-full'>
//           {selectedCountries.map((country) => (
//             <UpdatedCategoryBox
//               key={country.label}
//               label={country.label}
//               image={country.image}
//               onClick={() => handleCategoryClick(country.label)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categoriess;

'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaGlobe, FaGlobeEurope } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { GiAfrica, GiEarthAmerica, GiKangaroo } from 'react-icons/gi';
import { BsGlobeAsiaAustralia, BsGlobeCentralSouthAsia } from 'react-icons/bs';

// Updated CategoryBoxProps definition
interface CategoryBoxProps {
  label: string;
  image: string;
  link: string;
  onClick: () => void;
}

// Updated CategoryBox component
const UpdatedCategoryBox: React.FC<CategoryBoxProps> = ({ label, image, link, onClick }) => {

  const router = useRouter();

  const handleImageClick = () => {
    router.push(link);
    onClick(); // Call the onClick handler if needed
  };

  return (
    <div className="col-span-1 cursor-pointer group flex flex-col gap-2 w-full" onClick={handleImageClick}>
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image
          fill
          alt={label}
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
interface ContinentData {
  icon: React.ReactNode;
  countries: {
    label: string;
    image: string;
    link: string;
  }[];
  links: string; // Add a links property for the continent
}

const categoriesData: { [key: string]: ContinentData } = {
  Africa: {
    icon: <GiAfrica size={25} />,
    countries: [
      { label: 'Uganda', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706656723/mmsi6lgaumup7a6tcouf.jpg', link: '/allsinga' },
      { label: 'Tanzania', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706655863/ohwvocfyquoo4fgjwf9g.jpg', link: '/allsinga' },
      { label: 'Kenya', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706654682/vjdst2i5en7fsf6ooswn.jpg', link: '/allsinga' },
      { label: 'South Africa', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706656153/dstqm5cnqfjwdqa70r2w.jpg', link: '/allsinga' },
    ],
    links: "/allfricandestination",
  },
  Europe: {
    icon: <FaGlobeEurope size={25} />,
    countries: [
      { label: 'United Kingdom', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773529/jdljafu5ypmfpjoyo8fw.jpg', link: '/allsinga' },
      { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773533/xrhli2kvf8zdgovolutw.jpg', link: '/allsinga' },
      { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773531/w5dxirkp7pfa3xhljuhr.jpg', link: '/allsinga' },
      { label: 'Italy', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706801036/k7zlv1w0bz8eohnl6cms.jpg', link: '/allsinga' },
    ],
    links: "/alleuropeandestination",
  },
  Americas: {
    icon: <GiEarthAmerica size={25} />,
    countries: [
      { label: 'United States', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805881/q2nzdhdev94hg2yzyozq.jpg', link: '/allsinga' },
      { label: 'Canada', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805878/sikqsj5659wtdsoxqg82.jpg', link: '/allsinga' },
      { label: 'Mexico', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805879/tz7ijw5c9rz4fhhzpwgd.jpg', link: '/allsinga' },
      { label: 'Brazil', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805877/uadyoxdygrwsu9lnhpkl.jpg', link: '/allsinga' },
    ],
    links: "/allamericandestination",
  },
  Asia: {
    icon: <BsGlobeAsiaAustralia size={25} />,
    countries: [
      { label: 'Singapore', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807737/zuwb65myobne2mtppa0w.jpg', link: '/allsinga' },
      { label: 'China', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807736/ukxnjpnkrxu9kcjcn1de.jpg', link: '/allsinga' },
      { label: 'India', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807735/yttxdq5hpem1rsjovq30.jpg', link: '/allsinga' },
      { label: 'Japan', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807736/dzerbzzgml29weuna4el.jpg', link: '/allsinga' },
    ],
    links: "/allasiandestination",
  },
  Australia: {
    icon: <GiKangaroo size={25} />,
    countries: [
      { label: 'Sydney', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809531/fg2j3slmxhzlqgmufotn.jpg', link: '/allsinga' },
      { label: 'Melbourne', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809529/oiosbnercqtsjkc4yhmy.jpg', link: '/allsinga' },
      { label: 'Hobart', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809531/jdbwjdv9p2ghba9xccr1.jpg', link: '/allsinga' },
      { label: 'Adelaide', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809532/gbklrppldg8z2kkaf60p.jpg', link: '/allsinga' },
    ],
    links: "/allaustraliandestination",
  },
  MiddleEast: {
    icon: <BsGlobeCentralSouthAsia size={25} />,
    countries: [
      { label: 'Saudi Arabia', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/bc6gwxxmglfkpmqxowys.jpg', link: '/allsinga' },
      { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/pleheggycj6zuna2cjg0.jpg', link: '/allsinga' },
      { label: 'UAE', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/lbx7mjgfmhzs6ecxivuc.jpg', link: '/allsinga' },
      { label: 'Israel', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/y5rbgikqyqyge7oo3xwh.jpg', link: '/allsinga' },
    ],
    links: "/allmiddleeastdestination",
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

  const handleCategoryClick = (country: { label: string; link: string }) => {
    router.push(country.link);
  };

  return (
    <div className="">
      <div className="flex flex-row w-full gap-40">
        {Object.keys(categoriesData).map((continent) => (
          <div
            className="flex gap-2 flex-row cursor-pointer"
            key={continent}
            onClick={() => handleHeaderClick(continent)}
          >
            {continent === selectedContinent ? (
              <>{categoriesData[continent].icon}</>
            ) : (
              React.isValidElement(categoriesData[continent].icon) ? (
                React.cloneElement(
                  categoriesData[continent].icon as React.ReactElement<any>,
                  { color: "gray", size: 25 }
                )
              ) : (
                <span>Icon Not Found</span>
              )
            )}
            {continent}
          </div>
        ))}
      </div>
      <div className="inset-0">
        <div className="py-4 full-width-container">
          <hr />
        </div>
        <div className="full-width-container flex flex-row gap-8 w-full">
          {selectedCountries.map((country) => (
            <UpdatedCategoryBox
              key={country.label}
              label={country.label}
              image={country.image}
              link={country.link}
              onClick={() => handleCategoryClick(country)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categoriess;
