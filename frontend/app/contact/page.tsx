import { Metadata } from "next";
import { ContactSection } from "../src/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact | Premium SaaS Portfolio",
  description: "Let's build something exceptional together.",
};

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen">
      <ContactSection />
    </main>
  );
}
