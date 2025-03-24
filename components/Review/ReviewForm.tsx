"use client"
import React, { useState } from 'react';
import { FaStar, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    review: '',
    rating: 5,
    image: '/images/Postack_logo.jpeg',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      Swal.fire({
        title: 'Success!',
        text: 'Your review has been submitted successfully!',
        icon: 'success',
      });

      onReviewSubmitted();
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit review. Please try again.',
        icon: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-[95%] sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Leave a Review
          </h2>
          <button 
                onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
              >
            <FaTimes className="h-5 w-5" />
              </button>
            </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position/Company *
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your position and company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              <div className="flex gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    className="text-xl sm:text-2xl focus:outline-none p-1"
                  >
                    <FaStar
                      className={
                        star <= (hoveredRating ?? formData.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review *
              </label>
              <textarea
                required
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: Square image, max 2MB
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 mt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </form>
    </motion.div>
    </motion.div>
  );
};

export default ReviewForm;
