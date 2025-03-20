import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

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

  const [isClient, setIsClient] = useState(false); // State to handle client-side rendering
  const [loading, setLoading] = useState(false);  // ✅ Define setLoading
const [error, setError] = useState<string | null>(null);  // ✅ Define setError

  useEffect(() => {
    setIsClient(true); // Ensure this only runs client-side
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    console.log("📤 Sending form data:", formData);

    const response = await fetch("/api/contact", {
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

    // Send Email Notification
    const emailResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "2cb693be-60b4-46fd-b5bf-264963056c6e",
        ...formData,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error(`Email forwarding error: ${await emailResponse.text()}`);
    }

    console.log("📩 Email sent successfully!");
    
    await Swal.fire({
      title: "Success!",
      text: "Request Submitted Successfully!",
      icon: "success",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });

  } catch (error: any) {
    console.error("🚨 Error:", error.message);
    setError(error.message);

    await Swal.fire({
      title: "Error!",
      text: error.message || "Failed to submit form. Please try again.",
      icon: "error",
    });
  } finally {
    setLoading(false);
  }
};

if (!isClient) {
    return null; // Do not render the form until client-side JS has loaded
  }

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center" id="contactus">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="grid md:grid-cols-3 gap-8">
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
              <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-md">
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center w-80 mx-auto">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <p><strong>Office Location:</strong> 123 Main Street, City, Country</p>
            <p><strong>Email:</strong> contact@yourcompany.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
);
};
export default ContactForm;
