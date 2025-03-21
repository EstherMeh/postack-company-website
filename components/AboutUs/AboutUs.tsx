import React from "react";
import Image from 'next/image';
import { FaHandsHelping, FaLightbulb, FaUsers, FaShieldAlt } from 'react-icons/fa'; // Icons for values

const teamMembers = [
  { name: "Yamikani Kalonge", role: "Managing Director", image: "/images/Yamikani.jpg" },
  { name: "Chipo Mukwavi", role: "Marketing Manager", image: "/images/chipo.jpg" },
    { name: "Mwewa Kalonge", role: "CTO and lead developer", image: "/images/mwewa.jpg" },
   { name: "Mwai Banda", role: "Full Stack Developer", image: "/images/mwai.jpg" },
];

const About = () => {
  return (
    <>
      <section className="relative w-full min-h-screen text-white" id="aboutus">
        {/* Background Animation */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed animate-bg-move z-0"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        ></div>

        {/* Content Wrapper to Keep Everything Visible */}
        <div className="relative z-10 bg-black bg-opacity-60 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
          {/* Company Overview */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About POSTACK SOLUTIONS</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            POSTACK SOLUTIONS is a cutting-edge hosting company dedicated to providing secure, scalable, and high-performance web hosting solutions.
          </p>
        </div>

        {/* Company Values & Culture */}
        <div className="relative z-10 py-20 text-center bg-gray-800">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6">Our Values & Culture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8">
            <div className="bg-gray-900 text-white shadow-md rounded-lg p-6">
              <FaShieldAlt className="text-blue-400 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Security First</h3>
              <p className="text-gray-400">We prioritize data security and privacy to ensure our clients' trust.</p>
            </div>
            <div className="bg-gray-900 text-white shadow-md rounded-lg p-6">
              <FaHandsHelping className="text-green-400 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Customer Commitment</h3>
              <p className="text-gray-400">We provide top-tier support and assistance for all our clients.</p>
            </div>
            <div className="bg-gray-900 text-white shadow-md rounded-lg p-6">
              <FaLightbulb className="text-yellow-400 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Innovation</h3>
              <p className="text-gray-400">We embrace new technologies to offer the best hosting solutions.</p>
            </div>
            <div className="bg-gray-900 text-white shadow-md rounded-lg p-6">
              <FaUsers className="text-red-400 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Teamwork</h3>
              <p className="text-gray-400">We believe in collaboration and mutual growth within our team.</p>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="relative z-10 py-20 text-center bg-gray-900">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white text-black shadow-md rounded-lg p-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96} // Adjust the width and height
                  height={96} // Adjust the width and height
                  className="rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
