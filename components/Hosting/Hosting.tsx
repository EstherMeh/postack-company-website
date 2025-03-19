"use client";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import HostingServiceRequestForm from '@/components/Hosting/HostingServiceRequestForm';

const Hosting: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const openModal = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const plans = [
    {
      name: "Mulingo",
      price: "K1,950/Y",
      features: [
        { text: "10 Email Accounts" },
        { text: "15 GB Web Space" },
        { text: "Unlimited Bandwidth" },
        { text: "MySQL Databases" },
        { text: "99.9% Uptime Guarantee" },
        { text: "24/7/365 Support" },
      ],
    },
    {
      name: "Ubwino",
      price: "K2,850/Y",
      features: [
        { text: "30 Email Accounts" },
        { text: "Unlimited Web Space" },
        { text: "Unlimited Bandwidth" },
        { text: "MySQL Databases" },
        { text: "99.9% Uptime Guarantee" },
        { text: "24/7/365 Support" },
      ],
      popular: true,
    },
    {
      name: "Mpando",
      price: "K4,750/Y",
      features: [
        { text: "500 Email Accounts" },
        { text: "Unlimited Web Space" },
        { text: "Unlimited Bandwidth" },
        { text: "MySQL Databases" },
        { text: "99.9% Uptime Guarantee" },
        { text: "24/7/365 Support" },
      ],
    },
  ];

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16" id="hosting">
      <h1 className="text-4xl font-bold text-blue-900 text-center mb-4">
        Hosting Solutions
      </h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Reliable and scalable hosting packages for your digital presence
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-xl bg-white p-8 shadow-lg ${
              plan.popular ? "border-2 border-blue-900 scale-105" : ""
            }`}
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-4">{plan.name}</h2>
            <div className="text-3xl font-bold mb-8 relative">
              {plan.price}
              {plan.popular && (
                <span className="absolute -top-6 right-0 bg-blue-900 text-white text-sm px-3 py-1 rounded">
                  Most Popular
                </span>
              )}
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg font-bold hover:bg-blue-800 transition-colors"
              onClick={() => openModal(plan.name)}
            >
              Request Service
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full pb-16"> 
            <HostingServiceRequestForm
              isOpen={isModalOpen}
              selectedPackage={selectedPackage}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hosting;
