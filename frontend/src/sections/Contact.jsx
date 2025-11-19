import { useState } from "react";
import ParticlesBG from "../components/ParticlesBG";
import cimg from "../assets/contact.avif";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    const res = await fetch("https://formspree.io/f/mkgklgwl", {
      method: "POST",
      body: formData, 
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticlesBG />
      </div>

      <div className="min-h-screen bg-gray/10 flex items-center justify-center p-6">
        <div className="bg-white/10 shadow-lg rounded-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2">

          <div className="hidden lg:block">
            <img
              src={cimg}
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name:"
                required
                className="w-full px-4 py-2 rounded-lg border text-black"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address:"
                required
                className="w-full px-4 py-2 rounded-lg border text-black"
              />

              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Start typing your message here..."
                required
                className="w-full px-4 py-2 rounded-lg border text-black"
              />

              <button className="w-full bg-blue-400 text-black py-2 rounded-full hover:bg-black hover:text-white transition">
                Send
              </button>
            </form>

            {status && <p className="mt-4 text-green-600">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
