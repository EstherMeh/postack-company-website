import React from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

interface ReviewCardProps {
  name: string;
  image: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, image }) => {
  return (
    <div className='mt-24 w-full lg:w-[90%] relative mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <FaQuoteLeft className='w-14 h-14 opacity-10 absolute top-8 left-4' />

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 items-center pt-24'>
        {/* Text Content */}
        <div className='col-span-3 order-2 lg:order-1'>
          <p className='mt-8 text-sm sm:text-base md:text-lg font-medium leading-[1.5rem] sm:leading-[1.8rem] md:leading-[2.5rem]'>
            Lorem ipsum dolor sit amet consectetur adirecusandae. Fugit adi nobis omnis, cupiditate fugit voluptas culpa.
          </p>
          <div className='flex items-center mt-6'>
            <FaStar className='text-yellow-600 w-6 h-6' />
            <FaStar className='text-yellow-600 w-6 h-6' />
            <FaStar className='text-yellow-600 w-6 h-6' />
            <FaStar className='text-yellow-600 w-6 h-6' />
            <FaStar className='text-yellow-600 w-6 h-6' />
          </div>
          <h1 className='text-xl font-semibold mt-8'>{name}</h1>
        </div>

        {/* Image Content */}
        <div className='col-span-2 mx-auto order-1 lg:order-2'>
          <Image
            src={image}
            alt={name}
            width={1000}
            height={1000}
            className='rounded-full mx-auto'
          />
        </div>
        </div>
      </div>
  );
};

export default ReviewCard;
