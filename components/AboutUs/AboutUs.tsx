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
      <section className="relative w-full min-h-screen text-white" id="aboutus">
        {/* Background Animation */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed animate-bg-move z-0"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        ></div>

        {/* Content Wrapper */}
        <div className="relative z-10 bg-black bg-opacity-60 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About POSTACK SOLUTIONS</h1>
            <p className="text-lg md:text-xl mb-8">
              POSTACK SOLUTIONS is a leading technology company in Zambia, pioneering innovative digital solutions for businesses and individuals. Founded in 2020, we have grown from a hosting provider to a comprehensive digital services company.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-200">
                  To empower African businesses with cutting-edge digital solutions that drive growth, efficiency, and innovation in the digital age.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-200">
                  To become Africa&apos;s leading technology solutions provider, setting the standard for digital excellence and innovation.
                </p>
        </div>
            </div>

            {/* Core Values */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Our Core Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-900 bg-opacity-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p>Constantly pushing boundaries to deliver cutting-edge solutions</p>
                </div>
                <div className="bg-blue-900 bg-opacity-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                  <p>Delivering consistent, high-quality service you can count on</p>
                </div>
                <div className="bg-blue-900 bg-opacity-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                  <p>Your success is our priority, every step of the way</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white bg-opacity-10 p-6 rounded-lg"
                >
                  <h3 className="text-3xl font-bold text-blue-400">{achievement.number}</h3>
                  <p className="text-sm">{achievement.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Meet Our Team */}
        <div className="relative z-10 py-20 text-center bg-gradient-to-r from-gray-200 to-gray-500">
          <h2 className="text-3xl font-semibold text-blue-950 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white text-black shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;