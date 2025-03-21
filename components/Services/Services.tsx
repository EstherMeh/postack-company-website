"use client"

import { useState } from "react"
import { Check, Code, Globe, Smartphone, Database, ShoppingCart, Server } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ServiceRequestForm from "./ServiceRequestForm"

export default function Services() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const services = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Custom websites, web applications, and portals designed to meet your specific business needs.",
      icon: Globe,
      features: [
        "Responsive design for all devices",
        "SEO optimization",
        "Content management systems",
        "Web application development",
        "API integration",
      ],
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      icon: Smartphone,
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "UI/UX design",
        "App store submission",
        "Maintenance and updates",
        "Responsive design for all devices",
        "SEO optimization",
        "Content management systems",
        "Web application development",
        "API integration",
      ],
    },
    {
      id: "custom-software",
      title: "Custom Software Development",
      description: "Tailored software solutions to automate processes and improve business efficiency.",
      icon: Code,
      features: [
        "Business process automation",
        "Desktop applications",
        "Legacy system modernization",
        "Software integration",
        "Maintenance and support",
        "iOS and Android development",
        "Cross-platform solutions",
        "UI/UX design",
        "App store submission",
        "Maintenance and updates",
      ],
    },
    {
      id: "database-solutions",
      title: "Database Solutions",
      description: "Database design, development, and management services for optimal data handling.",
      icon: Database,
      features: [
        "Database architecture design",
        "Data migration and integration",
        "Performance optimization",
        "Database administration",
        "Data security implementation",
        "Business process automation",
        "Desktop applications",
        "Legacy system modernization",
        "Software integration",
        "Maintenance and support",
      ],
    },
    {
      id: "ecommerce-solutions",
      title: "E-commerce Solutions",
      description: "End-to-end e-commerce platforms to help you sell products and services online.",
      icon: ShoppingCart,
      features: [
        "Online store development",
        "Payment gateway integration",
        "Inventory management",
        "Order processing systems",
        "Customer relationship management",
        "Database architecture design",
        "Data migration and integration",
        "Performance optimization",
        "Database administration",
        "Data security implementation",
      ],
    },
    {
      id: "cloud-services",
      title: "Cloud Services & DevOps",
      description: "Cloud infrastructure setup, migration, and DevOps implementation for scalable operations.",
      icon: Server,
      features: [
        "Cloud migration strategies",
        "Infrastructure as code",
        "CI/CD pipeline setup",
        "Containerization",
        "Monitoring and logging solutions",
      ],
    },
  ]

  const handleRequestService = (serviceId: string) => {
    setSelectedService(serviceId)
    setIsFormOpen(true)
  }

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8" 
      id="services"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-12"
        variants={headerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4"
          variants={headerVariants}
        >
          Development Services
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          variants={headerVariants}
        >
          Our comprehensive range of development services designed to help businesses of all sizes achieve their digital
          goals.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="border rounded-lg p-6 shadow-sm flex flex-col h-full"
            variants={cardVariants}
            whileHover="hover"
            layout
          >
            <motion.div className="flex items-center mb-4">
              <motion.div 
                className="bg-blue-100 p-3 rounded-full mr-4"
                variants={iconVariants}
                whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
              >
                <service.icon className="h-6 w-6 text-[#1e3a8a]" />
              </motion.div>
              <h2 className="text-xl font-bold text-[#1e3a8a]">{service.title}</h2>
            </motion.div>

            <p className="text-gray-600 mb-6">{service.description}</p>

            <div className="mb-6 flex-grow">
              <h3 className="font-medium text-gray-700 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    variants={featureVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="flex-shrink-0"
                    >
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    </motion.div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.button
              onClick={() => handleRequestService(service.id)}
              className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Service
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full m-4"
            >
              <ServiceRequestForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                selectedService={selectedService}
                services={services}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
