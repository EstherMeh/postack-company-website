"use client"
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ReviewForm from "./ReviewForm";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  review: string;
  rating: number;
  image: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 10001,
    name: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    review: "This product has completely transformed our workflow. The intuitive interface and powerful features have made our team significantly more productive.",
    rating: 5,
    image: "/images/gil2.jpeg"
  },
  {
    id: 10002,
    name: "Michael Chen",
    position: "Senior Developer at InnovateLabs",
    review: "Outstanding service and exceptional quality. The attention to detail and customer support are unmatched in the industry.",
    rating: 5,
    image: "/images/gent2.jpeg"
  },
  {
    id: 10003,
    name: "Emily Rodriguez",
    position: "Marketing Director at GrowthCo",
    review: "A game-changer for our marketing campaigns. We've seen remarkable results since implementing this solution.",
    rating: 4,
    image: "/images/girl.jpeg"
  },
  {
    id: 10004,
    name: "David Kim",
    position: "CEO at StartupX",
    review: "Incredible value for money. The ROI we've seen has exceeded our expectations by a significant margin.",
    rating: 5,
    image: "/images/boy.jpeg"
  }
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
    >
      <div className="relative w-20 h-20 mb-4">
        <Image
          src={testimonial.image}
          alt={`${testimonial.name}'s profile picture`}
          fill
          sizes="80px"
          className="rounded-full object-cover"
          priority={false}
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{testimonial.position}</p>
      <div className="flex gap-1 mb-4" role="img" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={index < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed">{testimonial.review}</p>
    </motion.div>
  );
};

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [fetchedTestimonials, setFetchedTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setFetchedTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setFetchedTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const allTestimonials = React.useMemo(() => {
    if (fetchedTestimonials.length > 0) {
      return fetchedTestimonials;
    }
    return defaultTestimonials;
  }, [fetchedTestimonials]);

  const visibleTestimonials = React.useMemo(() => {
    const numTestimonials = allTestimonials.length;
    if (numTestimonials === 0) return [];
    
    return Array.from({ length: Math.min(3, numTestimonials) }, (_, i) => {
      const index = (currentIndex + i) % numTestimonials;
      return allTestimonials[index];
    });
  }, [allTestimonials, currentIndex]);
  useEffect(() => {
    if (allTestimonials.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allTestimonials.length]);

  const handleReviewSubmitted = async () => {
    await fetchTestimonials();
  };

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8" aria-label="Testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover why companies trust us to deliver exceptional results
          </p>
          <button
            onClick={() => setIsReviewFormOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Leave a Review
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((testimonial) => (
                  <TestimonialCard 
                    key={`testimonial-${testimonial.id}`} 
                    testimonial={testimonial} 
                  />
                ))}
              </AnimatePresence>
            </div>

            {allTestimonials.length > 3 && (
              <div className="flex justify-center mt-8 gap-2">
                {allTestimonials.map((_, index) => (
                  <button
                    key={`nav-${index}`}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial slide ${index + 1}`}
                    aria-current={currentIndex === index ? "true" : "false"}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isReviewFormOpen && (
          <ReviewForm
            isOpen={isReviewFormOpen}
            onClose={() => setIsReviewFormOpen(false)}
            onReviewSubmitted={handleReviewSubmitted}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialSection;