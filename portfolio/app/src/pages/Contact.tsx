"use client";

import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ParticlesBG from "../components/bg/ParticlesBG";
import contactImg from "../data/assets/contact.avif";
import { PairButton } from "../components/buttons";

const Contact = () => {
  const [status, setStatus] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left side: Slide in from the very edge of the screen
      gsap.fromTo(
        ".contact-col-left",
        { xPercent: -100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Right side: Slide in from the very edge of the screen
      gsap.fromTo(
        ".contact-col-right",
        { xPercent: 100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Form elements stagger
      gsap.fromTo(
        ".contact-input",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_tg2a2lg",
        "template_aih0y7x",
        formRef.current,
        "9EjP7QUopLaFF3zvc"
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          formRef.current?.reset();
        },
        (error) => {
          setStatus("Failed to send message.");
        }
      );
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden flex items-stretch"
    >
      {/* Background Particles */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <ParticlesBG />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column - Image Section (Attached to edge) */}
        <div className="contact-col-left hidden lg:block relative min-w-0 overflow-hidden">
          <img
            src={contactImg.src}
            alt="Contact"
            className="absolute inset-0 w-full h-full object-cover block"
          />
          
          {/* Decorative corner brackets - Aligned to the column corners */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-white/40 z-20" />
          <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-white/40 z-20" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-white/40 z-20" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-white/40 z-20" />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Right Column - Contact Form Section (Attached to edge) */}
        <div className="contact-col-right relative flex flex-col justify-center px-8 md:px-20 lg:px-32 py-24 bg-black/40 backdrop-blur-sm border-l border-white/5">
          
          <div className="contact-input mb-16">
            <div className="flex items-center gap-6 mb-6">
              <div className="h-px w-16 bg-white/40" />
              <span className="text-sm tracking-[0.4em] uppercase text-white/50">
                Contact
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              Get In <br />
              <span className="text-white/30 italic">Touch</span>
            </h2>
          </div>

          <form ref={formRef} className="space-y-10" onSubmit={handleSubmit}>
            <div className="contact-input space-y-4">
              <label className="text-xs uppercase tracking-[0.3em] text-white/40 ml-1">Identity</label>
              <input
                type="text"
                name="user_name"
                placeholder="Name or Organization"
                required
                className="w-full bg-transparent border-b border-white/10 px-0 py-6 focus:outline-none focus:border-white transition-all text-xl md:text-2xl text-white placeholder:text-white/5"
              />
            </div>

            <div className="contact-input space-y-4">
              <label className="text-xs uppercase tracking-[0.3em] text-white/40 ml-1">Coordinates</label>
              <input
                type="email"
                name="user_email"
                placeholder="Email Address"
                required
                className="w-full bg-transparent border-b border-white/10 px-0 py-6 focus:outline-none focus:border-white transition-all text-xl md:text-2xl text-white placeholder:text-white/5"
              />
            </div>

            <div className="contact-input space-y-4">
              <label className="text-xs uppercase tracking-[0.3em] text-white/40 ml-1">Objective</label>
              <textarea
                name="message"
                rows={3}
                placeholder="What are we building?"
                required
                className="w-full bg-transparent border-b border-white/10 px-0 py-6 focus:outline-none focus:border-white transition-all text-xl md:text-2xl text-white placeholder:text-white/5 resize-none"
              />
            </div>

            <div className="contact-input pt-12">
              <PairButton 
                variant="white" 
                size="lg" 
                className="w-full py-8 text-xl font-bold rounded-none"
                type="submit"
              >
                Launch Inquiry
              </PairButton>
            </div>
          </form>

          {status && (
            <div className="contact-input mt-12 p-6 border border-white/10 text-center bg-white/[0.02]">
              <p className={`text-lg font-medium ${status.includes("success") ? "text-white" : "text-red-400"}`}>
                {status}
              </p>
            </div>
          )}
          
          {/* Minimalist Footer */}
          <div className="contact-input mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-10">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Direct</p>
              <p className="text-white/60 text-lg hover:text-white transition-colors cursor-pointer">hello@yourdomain.com</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Based In</p>
              <p className="text-white/60 text-lg">Worldwide / Remote</p>
            </div>
          </div>

          {/* Decorative side brackets for the form side */}
          <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-white/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-white/40 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
