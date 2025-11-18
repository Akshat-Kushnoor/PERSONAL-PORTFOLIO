import { useState } from "react";
import ParticlesBG from "../components/ParticlesBG";
import cimg from "../assets/contact.avif";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      e.target.reset();
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div >
      
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
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>

         <form
                action="https://formspree.io/f/mkgklgwl"
                method="POST"
                className="space-y-5"
                >
                <input type="text" name="name" placeholder="Enter your name: " required className="w-full px-4 py-2 rounded-lg border" />
                <input type="email" name="email" required placeholder="Enter your email address: " className="w-full rounded-lg px-4 py-2 border" />
                <textarea name="message" rows="5" required placeholder="Start typing your Message here..." className="w-full px-4 py-2 rounded-lg border"></textarea>

                <button className="w-full bg-blue-400 text-black-400 py-2 rounded-full hover:bg-black transition duration-150">Send</button>
         </form>

          {status && <p className="mt-4 text-green-600">{status}</p>}
        </div>
      </div>
    </div>
    </div>
  );
}
