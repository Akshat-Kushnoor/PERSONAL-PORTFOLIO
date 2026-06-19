"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import Link from "next/link"

interface Action {
  label: string;
  href: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  gradient?: boolean;
  blur?: boolean;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: Action[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
  children?: React.ReactNode;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative z-0 flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent",
          className,
        )}
        {...props}
      >
        {gradient && (
          <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center">
            {blur && (
              <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Main glow */}
            <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-white/20 opacity-80 blur-3xl" />

            {/* Lamp effect */}
            <motion.div
              initial={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "16rem" }}
              className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-white/20 blur-2xl"
            />

            {/* Top line */}
            <motion.div
              initial={{ width: "15rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "30rem" }}
              className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-white/20"
            />

            {/* Left gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(from 70deg at center top, white, transparent, transparent)`,
              }}
              className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic opacity-20"
            >
              <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>

            {/* Right gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, white)`,
              }}
              className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic opacity-20"
            >
              <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative z-50 container flex justify-center flex-1 flex-col px-5 md:px-10 gap-4"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <h1
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white",
                titleClassName,
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "text-xl text-white/40",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div className={cn("flex gap-4", actionsClassName)}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    asChild
                  >
                    <Link href={action.href}>{action.label}</Link>
                  </Button>
                ))}
              </div>
            )}
            {children}
          </div>
        </motion.div>
      </section>
    )
  },
)
Hero.displayName = "Hero"

export { Hero }
