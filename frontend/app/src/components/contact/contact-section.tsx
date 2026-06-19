"use client";

import React from "react";
import { EtherealShadows } from "../ui/ethereal-shadows";
import { ContainerScroll } from "../ui/container-scroll";
import { GlassContactCard } from "../ui/glass-contact-card";

export const ContactSection = () => {
  return (
    <section className="relative min-height-[100vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Fixed Background */}
      <EtherealShadows />
      
      {/* Scrollable Content */}
      <div className="relative z-10 w-full">
        <ContainerScroll>
          <GlassContactCard />
        </ContainerScroll>
      </div>
      
      {/* Bottom Spacer to allow for scroll reveal */}
      <div className="h-[20vh]" />
    </section>
  );
};
