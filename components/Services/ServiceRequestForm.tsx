"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Swal from 'sweetalert2';

interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  features: string[]
}

interface ServiceRequestFormProps {
  isOpen: boolean
  onClose: () => void
  selectedService: string
  services: Service[]
}

interface FormErrors {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  requirements: string;
  budgetRange: string;
  timeline: string;
}

const VALIDATION_RULES = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    pattern: /^\+?[\d\s-]{10,}$/,
  },
  requirements: {
    required: true,
    minLength: 5,
    maxLength: 1000,
  },
};

export default function ServiceRequestForm({ isOpen, onClose, selectedService, services }: ServiceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    access_key: process.env.NEXT_PUBLIC_ACCESS_KEY || "",
    fullName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: selectedService,
    requirements: "",
    budgetRange: "",
    timeline: "",
  })

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    requirements: "",
    budgetRange: "",
    timeline: "",
  });

  useEffect(() => {
    // Update service type when selectedService changes
    setFormData((prev) => ({
      ...prev,
      serviceType: selectedService,
    }))
  }, [selectedService])

  const validateField = (name: string, value: string): string => {
    const rules = VALIDATION_RULES[name as keyof typeof VALIDATION_RULES];
    if (!rules) return '';

    if (rules.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if ('minLength' in rules && value.trim().length < rules.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`;
    }

    if ('maxLength' in rules && value.trim().length > rules.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${rules.maxLength} characters`;
    }

    if ('pattern' in rules && rules.pattern && !rules.pattern.test(value)) {
      switch (name) {
        case 'email':
          return 'Please enter a valid email address';
        case 'phone':
          return 'Please enter a valid phone number';
        case 'fullName':
          return 'Name can only contain letters, spaces, hyphens and apostrophes';
        default:
          return 'Invalid format';
      }
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      serviceType: !formData.serviceType ? 'Please select a service type' : '',
      requirements: validateField('requirements', formData.requirements),
      budgetRange: !formData.budgetRange ? 'Please select a budget range' : '',
      timeline: !formData.timeline ? 'Please select a timeline' : '',
    };

    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== '');
  };

  // Handle form submission to database
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setFormData({
          access_key: process.env.NEXT_PUBLIC_ACCESS_KEY || "",
          fullName: "",
          email: "",
          phone: "",
          company: "",
          serviceType: selectedService,
          requirements: "",
          budgetRange: "",
          timeline: "",
        });
      } else {
        const errorData = await response.text();
        console.log("Error submitting form:", errorData ? JSON.parse(errorData) : "No response body");
      }
    } catch {
      console.error("Network error");
    }
  };

  const handleEmailForwarding = async () => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Request Submitted Successfully!",
          icon: "success"
        });

        setFormData({
          access_key: process.env.NEXT_PUBLIC_ACCESS_KEY || "",
          fullName: "",
          email: "",
          phone: "",
          company: "",
          serviceType: selectedService,
          requirements: "",
          budgetRange: "",
          timeline: "",
        });
        onClose();
      } else {
        const errorData = await response.text();
        console.log("Error forwarding email:", errorData ? JSON.parse(errorData) : "No response body");
        alert("Something went wrong. Please try again.");
      }
    } catch {
      console.error("Error submitting form.");
      alert("An error occurred while submitting your request.");
    }
  };

  if (!isOpen) return null;

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please check the form for errors',
        icon: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await handleSubmit();
      await handleEmailForwarding();
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit the form. Please try again.',
        icon: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">Request Service</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company/Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
              Service Type *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
              Project Requirements *
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
              maxLength={1000} // Enforce a maximum of 500 characters
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.requirements ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Please describe your project requirements in detail..."
            ></textarea>
            <div className="flex justify-between items-center mt-1">
              {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
              <p className="text-gray-500 text-xs">
                {1000 - formData.requirements.length} characters remaining
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range *
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select budget range
                </option>
                <option value="under-5k">Under K5,000</option>
                <option value="5k-10k">K5,000 - K10,000</option>
                <option value="10k-25k">K10,000 - K25,000</option>
                <option value="25k-50k">K25,000 - K50,000</option>
                <option value="50k-100k">K50,000 - K100,000</option>
                <option value="over-100k">Over K100,000</option>
              </select>
              {errors.budgetRange && <p className="text-red-500 text-sm">{errors.budgetRange}</p>}
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Timeline *
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select timeline
                </option>
                <option value="urgent">Urgent (Less than 2 weeks)</option>
                <option value="1-month">1 month</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-plus-months">6+ months</option>
                <option value="flexible">Flexible</option>
              </select>
              {errors.timeline && <p className="text-red-500 text-sm">{errors.timeline}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-[#1e3a8a] hover:bg-blue-800 text-white font-medium rounded-md transition duration-200 flex items-center justify-center ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}