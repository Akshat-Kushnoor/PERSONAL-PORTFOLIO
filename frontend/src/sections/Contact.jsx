import { useState, useRef } from "react";
import ParticlesBG from "../components/ParticlesBG";
import cimg from "../assets/contact.avif";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [status, setStatus] = useState("");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tg2a2lg", 
        "template_aih0y7x", 
        form.current,
        "9EjP7QUopLaFF3zvc" 
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent successfully!");
          e.target.reset(); 
        },
        (error) => {
          console.log(error.text);
          setStatus("Failed to send message.");
        }
      );
  };

  return (
    <div className="relative">
      {/* Background Particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticlesBG />
      </div>

      <div className="min-h-screen bg-gray/10 flex items-center justify-center p-6">
        <div className="bg-white/10 shadow-lg rounded-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2">
          {/* Left Image */}
          <div className="hidden lg:block">
            <img
              src={cimg}
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white">
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>

            <form ref={form} className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name:"
                required
                className="w-full px-4 py-2 rounded-lg border text-black"
              />

              <input
                type="email"
                name="user_email"
                placeholder="Enter your email address:"
                required
                className="w-full px-4 py-2 rounded-lg border text-black"
              />

              <textarea
                name="message"
                rows="5"
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
