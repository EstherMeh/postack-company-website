import React, { useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  review: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    review: "This product has completely transformed our workflow. The intuitive interface and powerful features have made our team significantly more productive.",
    rating: 5,
    image: "/images/gil2.jpeg"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Senior Developer at InnovateLabs",
    review: "Outstanding service and exceptional quality. The attention to detail and customer support are unmatched in the industry.",
    rating: 5,
    image: "/images/gent2.jpeg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director at GrowthCo",
    review: "A game-changer for our marketing campaigns. We've seen remarkable results since implementing this solution.",
    rating: 4,
    image: "/images/girl.jpeg"
  },
  {
    id: 4,
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
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === testimonials.length - 3 ? 0 : prev + 1
        );
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay]);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8" aria-label="Testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why companies trust us to deliver exceptional results
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2" role="navigation" aria-label="Testimonial navigation">
            {testimonials.slice(0, testimonials.length - 2).map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial slide ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;