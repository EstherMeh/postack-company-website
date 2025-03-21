import Swal from "sweetalert2";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
    hostingRequirement: "",
    technicalSpecs: "",
  });

  const hostingRequirements = ["Bandwidth", "Storage", "Databases", "Security", "Backup Services"];
  const technicalSpecifications = ["Linux OS", "Windows OS", "Shared Hosting", "VPS Hosting", "Dedicated Server"];
  

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

  let hasError = false;
  const errors = { email: "", phone: "", hostingRequirement: "", technicalSpecs: "" };  // Use const

  if (!email) {
    errors.email = "Email is required.";
    hasError = true;
  }
  if (!phone) {
    errors.phone = "Phone number is required.";
    hasError = true;
  }
  if (!hostingRequirement) {
    errors.hostingRequirement = "Select a hosting requirement.";
    hasError = true;
  }
  if (!technicalSpecs) {
    errors.technicalSpecs = "Select a technical specification.";
    hasError = true;
  }

  if (hasError) {
    setFormErrors(errors);
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

  try {
    // Step 1: Submit to Database
    const response = await fetch("/api/hostingservicerequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error submitting form:", errorData);
      setError(errorData.message || "Failed to submit the form. Please try again.");
      return;
    }

    console.log("Database submission successful!");

    // Step 2: Send Email Notification
    const emailResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_ACCESS_KEY || "",
        ...formData,
      }),
    });

    if (emailResponse.ok) {
      console.log("Email sent successfully!");
      Swal.fire({
        title: "Success!",
        text: "Request Submitted Successfully!",
        icon: "success",
      });

      // Reset the form fields
      setEmail("");
      setPhone("");
      setHostingRequirement("");
      setTechnicalSpecs("");
      onClose();
    } else {
      const errorData = await emailResponse.text();
      console.error("Error forwarding email:", errorData);
      alert("Something went wrong with email forwarding. Please try again.");
    }
  } catch (error) {
    console.error("Network error:", error);
    setError("Network error. Please check your connection.");
  } finally {
    setLoading(false);
  }
};


return (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200 mb-16">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Request Hosting Service</h2>

      {error && <p className="text-red-500" aria-live="assertive">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 pb-12">
        <div>
          <label className="block font-semibold">Selected Package</label>
          <input type="text" value={selectedPackage} readOnly className="w-full border px-3 py-2 rounded-md bg-gray-100" />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border px-3 py-2 rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
        </div>

        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full border px-3 py-2 rounded-md ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
        </div>

        <div>
          <label className="block font-semibold">Hosting Requirement</label>
          <select
            value={hostingRequirement}
            onChange={(e) => setHostingRequirement(e.target.value)}
            className={`w-full border px-3 py-2 rounded-md ${formErrors.hostingRequirement ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Requirement</option>
            {hostingRequirements.map((req) => (
              <option key={req} value={req}>{req}</option>
            ))}
          </select>
          {formErrors.hostingRequirement && <p className="text-red-500">{formErrors.hostingRequirement}</p>}
        </div>

        <div>
          <label className="block font-semibold">Technical Specifications</label>
          <select
            value={technicalSpecs}
            onChange={(e) => setTechnicalSpecs(e.target.value)}
            className={`w-full border px-3 py-2 rounded-md ${formErrors.technicalSpecs ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Specification</option>
            {technicalSpecifications.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          {formErrors.technicalSpecs && <p className="text-red-500">{formErrors.technicalSpecs}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
          <button 
            type="submit" 
            disabled={loading || !email || !phone || !hostingRequirement || !technicalSpecs} 
            className={`px-4 py-2 rounded-md ${loading ? "bg-gray-400" : "bg-blue-900 text-white"}`}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};
export default HostingServiceRequestForm;
