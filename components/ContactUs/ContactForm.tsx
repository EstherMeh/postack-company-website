"use client";
import React, { useState } from "react";
import type { NextPage } from "next";
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

// Define an interface for form data
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✅ FIXED: Passing correct state data
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" }); // ✅ Reset form on success
      } else {
        console.log("Error submitting form:", await response.json());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center" id="contactus">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-md"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="w-full p-2 border rounded-md"
                  placeholder="Your Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Message</label>
                <textarea
                  name="message"
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-pink-700 text-white py-2 rounded-md">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Box */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <p><strong>Office Location:</strong> 123 Main Street, City, Country</p>
            <p><strong>Email:</strong> contact@yourcompany.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>

            {/* Socials */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center text-blue-500">
                  <FaTwitter className="mr-2" /> Twitter
                </a>
                <a href="#" className="flex items-center text-blue-700">
                  <FaFacebook className="mr-2" /> Facebook
                </a>
                <a href="#" className="flex items-center text-blue-600">
                  <FaLinkedin className="mr-2" /> LinkedIn
                </a>
                <a href="#" className="flex items-center text-blue-600">
                  <FaInstagram className="mr-2" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
