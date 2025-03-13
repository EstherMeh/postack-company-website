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

export default function ServiceRequestForm({ isOpen, onClose, selectedService, services }: ServiceRequestFormProps) {
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

  useEffect(() => {
    // Update service type when selectedService changes
    setFormData((prev) => ({
      ...prev,
      serviceType: selectedService,
    }))
  }, [selectedService])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission to database
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/forms/services", {
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
    } catch (error) {
      console.error("Network error:", error);
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
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting your request.");
    }
  };

  if (!isOpen) return null;

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
    await handleEmailForwarding();
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please describe your project requirements in detail..."
            ></textarea>
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
              className="px-4 py-2 bg-[#1e3a8a] hover:bg-blue-800 text-white font-medium rounded-md transition duration-200"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}