import React, { useState } from "react";

interface HostingServiceRequestFormProps {
  selectedPackage: string;
  onClose: () => void;
}

const HostingServiceRequestForm = ({ selectedPackage, onClose }: HostingServiceRequestFormProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hostingRequirement, setHostingRequirement] = useState("");
  const [technicalSpecs, setTechnicalSpecs] = useState("");

  const hostingRequirements = ["Bandwidth", "Storage", "Databases", "Security", "Backup Services"];
  const technicalSpecifications = ["Linux OS", "Windows OS", "Shared Hosting", "VPS Hosting", "Dedicated Server"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
    hostingRequirement: "",
    technicalSpecs: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    setFormErrors({
      email: "",
      phone: "",
      hostingRequirement: "",
      technicalSpecs: "",
    });

    if (!email || !phone || !hostingRequirement || !technicalSpecs) {
      setLoading(false);
      return;
    }

    const formData = {
      selectedPackage,
      email,
      phone,
      hostingRequirement,
      technicalSpecs,
    };

    console.log("Sending formData:", formData);

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200 mb-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Request Hosting Service</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 pb-12">
          <div>
            <label className="block font-semibold">Selected Package</label>
            <input type="text" value={selectedPackage} readOnly className="w-full border px-3 py-2 rounded-md bg-gray-100" />
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
          </div>

          <div>
            <label className="block font-semibold">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
          </div>

          {/* Dropdown for Hosting Requirements */}
          <div>
            <label className="block font-semibold">Hosting Requirement</label>
            <select
              value={hostingRequirement}
              onChange={(e) => setHostingRequirement(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select Requirement</option>
              {hostingRequirements.map((req) => (
                <option key={req} value={req}>
                  {req}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for Technical Specifications */}
          <div>
            <label className="block font-semibold">Technical Specifications</label>
            <select
              value={technicalSpecs}
              onChange={(e) => setTechnicalSpecs(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select Specification</option>
              {technicalSpecifications.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-900 text-white rounded-md">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostingServiceRequestForm;
