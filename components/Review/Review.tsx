"use client";
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewCard from '@/components/Review/ReviewCard'; 

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };


const Review = () => {
  return (
    <div className='pt-16 pd-16'>
        <h1 className='mt-6 text-2xl md:text-3xl capitalized font-bold text-center'>
            What Clients Say About Our Services
            </h1>
            <div className='bg-blue-900 mt-20 w-[90%] md:w-[80%] max-w-5xl mx-auto px-6 py-12'>
                <Carousel
                arrows={true} 
                autoPlay={true} 
                autoPlaySpeed={5000} 
                infinite responsive={responsive} 
                showDots
                >
                    <ReviewCard name='Jessy Leng' image='/images/boy.jpeg'/>
                    <ReviewCard name='Ace maloui' image='/images/gent2.jpeg'/>
                    <ReviewCard name='Mambi tekii' image='/images/gil2.jpeg'/>
                    <ReviewCard name='Melly shaku' image='/images/girl.jpeg'/>
                </Carousel>
            </div>
    </div>
  )
}

export default Review;