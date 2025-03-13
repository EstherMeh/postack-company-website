"use client"

import { useState } from "react"
import { Check, Code, Globe, Smartphone, Database, ShoppingCart, Server } from "lucide-react"
import ServiceRequestForm from "./ServiceRequestForm";

export default function Services() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

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
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4">Development Services</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our comprehensive range of development services designed to help businesses of all sizes achieve their digital
          goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-6 shadow-sm flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <service.icon className="h-6 w-6 text-[#1e3a8a]" />
              </div>
              <h2 className="text-xl font-bold text-[#1e3a8a]">{service.title}</h2>
            </div>

            <p className="text-gray-600 mb-6">{service.description}</p>

            <div className="mb-6 flex-grow">
              <h3 className="font-medium text-gray-700 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleRequestService(service.id)}
              className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition duration-200"
            >
              Request Service
            </button>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <ServiceRequestForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          selectedService={selectedService}
          services={services}
        />
      )}
    </div>
  )
}

