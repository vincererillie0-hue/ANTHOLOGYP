import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import WeeklyVolumes from "@/components/weekly-volumes";
import OfferingBowl from "@/components/offering-bowl";
import TheMirror from "@/components/the-mirror";
import TheCircle from "@/components/the-circle";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WeeklyVolumes />
      <OfferingBowl />
      <TheMirror />
      <TheCircle />
      <Footer />
    </div>
  );
}
