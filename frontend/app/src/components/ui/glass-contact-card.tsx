"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export const GlassContactCard = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    emailjs
      .sendForm(
        "service_tg2a2lg",
        "template_aih0y7x",
        formRef.current,
        "9EjP7QUopLaFF3zvc"
      )
      .then(
        () => {
          setStatus("success");
          formRef.current?.reset();
          setTimeout(() => setStatus("idle"), 5000);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 5000);
        }
      );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full max-w-[720px] mx-auto p-8 md:p-12 rounded-[32px] bg-white/[0.05] backdrop-blur-[30px] border border-white/[0.12] shadow-[0_25px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group"
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span 
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6"
        >
          Contact
        </motion.span>
        
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight"
        >
          Let&apos;s Build Something <br className="hidden md:block" /> Exceptional
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-white/60 text-lg max-w-[500px] mb-12 leading-relaxed"
        >
          Have an idea, product, startup, or SaaS platform in mind? 
          Let&apos;s discuss how we can create something remarkable.
        </motion.p>

        <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-2 text-left">
              <label htmlFor="user_name" className="text-sm text-white/40 ml-4 uppercase tracking-wider font-medium">Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                placeholder="Your Name"
                className="w-full h-14 px-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-2 text-left">
              <label htmlFor="user_email" className="text-sm text-white/40 ml-4 uppercase tracking-wider font-medium">Email</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                placeholder="your@email.com"
                className="w-full h-14 px-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300"
              />
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="space-y-2 text-left">
            <label htmlFor="company" className="text-sm text-white/40 ml-4 uppercase tracking-wider font-medium">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your Company (Optional)"
              className="w-full h-14 px-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2 text-left">
            <label htmlFor="message" className="text-sm text-white/40 ml-4 uppercase tracking-wider font-medium">Project Details</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300 resize-none"
            />
          </motion.div>
          
          <motion.button
            variants={itemVariants}
            disabled={status === "loading"}
            whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
            whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
            className={`w-full h-14 font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer group/btn ${
              status === "success" 
                ? "bg-green-500 text-white" 
                : status === "error" 
                ? "bg-red-500 text-white" 
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {status === "idle" && (
              <>
                Start a Conversation
                <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </>
            )}
            {status === "loading" && <span className="animate-pulse">Sending...</span>}
            {status === "success" && (
              <>
                Message Sent
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
            {status === "error" && (
              <>
                Failed to Send
                <AlertCircle className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
