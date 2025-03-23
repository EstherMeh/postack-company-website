"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  }

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  }

  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(to right, #f3f4f6, #9ca3af)",
        "linear-gradient(to right, #e5e7eb, #6b7280)",
        "linear-gradient(to right, #f3f4f6, #9ca3af)"
      ],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="hero min-h-screen bg-gradient-to-r from-gray-50 to-gray-400"
        animate="animate"
        variants={gradientVariants}
      >
        <div className="hero-overlay bg-opacity-0"></div>
          <div className="hero-content text-neutral-content text-left flex items-start justify-start w-full">
          <motion.div 
            className="max-w-3xl pl-8"
            variants={containerVariants}
          >
            <motion.h1 
              className="mb-5 text-6xl font-bold text-blue-950"
              variants={textVariants}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Powering
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Convenience,
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Innovation,
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                and Growth
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="mb-5 text-xl text-blue-900"
              variants={textVariants}
            >
              Postack Solutions delivers innovative digital services, 
              including seamless grocery delivery through the Postack Delivery mobile app and 
              website, cutting-edge web and application development, and reliable server hosting 
              and management. We empower businesses and individuals with technology-driven solutions 
              designed for efficiency and growth.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              variants={containerVariants}
            >
              <motion.button 
                className="px-4 py-2 btn btn-primary text-white hover:bg-blue-700 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Get started
              </motion.button>
              <motion.button 
                className="px-4 py-2 btn btn-neutral text-white hover:bg-blue-700 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Learn more
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="ml-auto pr-8"
            variants={videoVariants}
            whileHover="hover"
          >
            <motion.video
              src="/video/anim.mp4"
              autoPlay
              loop
              muted
              className="w-96 h-96 rounded-full object-cover shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Hero