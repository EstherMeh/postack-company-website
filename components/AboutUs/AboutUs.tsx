"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  { 
    name: "Mwai Banda", 
    role: "CTO", 
    image: "/images/mwaibanda.jpg",
    bio: "Full-stack Dev - I develop Android, iOS, iPadOS & Web Frontends & Backends. Mobile Developer || @The Christian Broadcasting Network, @Postack Solutions"
  },
  { 
    name: "Yamikani Kalonge", 
    role: "Managing Director", 
    image: "/Postack_logo.jpeg",
    bio: "Managing Director @Postack Solutions."
  },
  { 
    name: "Mwewa Kalonge", 
    role: "Head of Customer Support", 
    image: "/Postack_logo.jpeg",
    bio: "Head of Customer Support @Postack Solutions"
  },
  { 
    name: "Chipo Mukwavi", 
    role: "Marketing Manager", 
    image: "/Postack_logo.jpeg",
    bio: "Marketing Manager @Postack Solutions."
  },
];

const achievements = [
  { number: "500+", text: "Clients Served" },
  { number: "99.9%", text: "Uptime Guarantee" },
  { number: "24/7", text: "Customer Support" },
  { number: "5★", text: "Average Rating" },
];

const About = () => {
  return (
    <>
      <section className="relative w-full min-h-screen text-center bg-gray-50 py-20" id="aboutus">
      {/* About POSTACK */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-3 md:mb-4">
          About POSTACK SOLUTIONS
        </h1>
        <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <p className="text-gray-800 text-base sm:text-lg lg:text-xl text-center leading-relaxed">
            POSTACK SOLUTIONS is a leading technology company in Zambia, pioneering innovative digital solutions for businesses and individuals. Founded in 2023, we have grown from a hosting provider to a comprehensive digital services company.
          </p>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-gray-800 text-sm sm:text-base text-center">
              To empower African businesses with cutting-edge digital solutions that drive growth, efficiency, and innovation in the digital age.
            </p>
          </div>
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 text-center">
              Our Vision
            </h2>
            <p className="text-gray-800 text-sm sm:text-base text-center">
              To become Africa's leading technology solutions provider, setting the standard for digital excellence and innovation.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-3 md:mb-4">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2 text-center">Innovation</h3>
            <p className="text-gray-800 text-sm text-center">Constantly pushing boundaries to deliver cutting-edge solutions.</p>
          </div>
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2 text-center">Reliability</h3>
            <p className="text-gray-800 text-sm text-center">Delivering consistent, high-quality service you can count on.</p>
          </div>
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2 text-center">Customer Focus</h3>
            <p className="text-gray-800 text-sm text-center">Your success is our priority, every step of the way.</p>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <h3 className="text-3xl font-bold text-blue-600 mb-2">{achievement.number}</h3>
              <p className="text-sm text-gray-800">{achievement.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Meet Our Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto px-8"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-3 md:mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-950 mb-2">{member.name}</h3>
              <p className="text-gray-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    </>
  );
};

export default About;