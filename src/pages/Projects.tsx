import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Sun, Battery } from "lucide-react";
import { FadeIn } from "../components/ui/FadeIn";
import { Button } from "../components/ui/Button";

const projects = [
  {
    id: 1,
    title: "Bayview - 0820",
    location: "Bayview, NT 0820",
    date: "2026",
    systemSize: "13.2kW",
    battery: "None",
    description: "Premium solar installation for maximizing renewable energy usage in Bayview.",
    image: "https://lh3.google.com/u/0/d/1WN3jA-2iUJ1PBErSfp0Akn7KjQvBNeCa=w800-h600-iv2?auditContext=prefetch",
    tags: ["Residential", "Premium"]
  },
  {
    id: 2,
    title: "Berrimah - 0828",
    location: "Berrimah, NT 0828",
    date: "2026",
    systemSize: "39.6kW",
    battery: "None",
    description: "Large scale commercial installation tailored for high daytime energy usage.",
    image: "https://lh3.google.com/u/0/d/1s7cUvc6rPMvj97yp7lz0fWX0CbU-Ovol=w800-h600-iv2?auditContext=prefetch",
    tags: ["Commercial", "3-Phase"]
  },
  {
    id: 3,
    title: "Bellamack - 0832",
    location: "Bellamack, NT 0832",
    date: "2026",
    systemSize: "6.6kW",
    battery: "None",
    description: "Efficient solar energy system reducing household electricity bills.",
    image: "https://lh3.google.com/u/0/d/198JHiOPCgAA32KxhaVssiGT-851lA82M=w800-h600-iv2?auditContext=prefetch",
    tags: ["Residential"]
  },
  {
    id: 4,
    title: "Desert Springs - 0870",
    location: "Desert Springs, NT 0870",
    date: "2026",
    systemSize: "13.2kW",
    battery: "12.8kWh FoxESS",
    description: "Complete home energy independence with blackout protection.",
    image: "https://lh3.google.com/u/0/d/14fDYtKqm9af0bZaeCXBWz3zsorZG7XLu=w800-h600-iv4?auditContext=prefetch",
    tags: ["Residential", "Battery", "Off-grid capable"]
  },
  {
    id: 5,
    title: "Herbert - 0836",
    location: "Herbert, NT 0836",
    date: "2025",
    systemSize: "9.9kW",
    battery: "None",
    description: "Robust solar panel installation designed for maximum energy yield.",
    image: "https://lh3.google.com/u/0/d/1NxbAcealIhUjd8wtF5U5fiPKxo-EmfTv=w800-h600-iv2?auditContext=prefetch",
    tags: ["Residential"]
  },
  {
    id: 6,
    title: "Howard Springs - 0835",
    location: "Howard Springs, NT 0835",
    date: "2025",
    systemSize: "15kW",
    battery: "25.6kWh Battery Bank",
    description: "Off-grid setup for remote property lacking reliable grid connection.",
    image: "https://lh3.google.com/u/0/d/1ijAZw1cegVGDblfaHboOTWuL8RRqG7Q9=w800-h600-iv2?auditContext=prefetch",
    tags: ["Rural", "Off-grid", "Battery"]
  },
  {
    id: 7,
    title: "Humpty Doo - 0836",
    location: "Humpty Doo, NT 0836",
    date: "2025",
    systemSize: "13.2kW",
    battery: "None",
    description: "High-performance solar array for a rural residential property.",
    image: "https://lh3.google.com/u/0/d/1BVMYs3bv_c7rapoINFpWFUqlnyXDOF80=w800-h600-iv2?auditContext=prefetch",
    tags: ["Rural", "Residential"]
  },
  {
    id: 8,
    title: "Karama - 0812",
    location: "Karama, NT 0812",
    date: "2025",
    systemSize: "6.6kW",
    battery: "None",
    description: "Standard tier-1 solar system ensuring optimized daytime energy usage.",
    image: "https://lh3.google.com/u/0/d/1bT_j3jQL1SMxZBTJLd4qbOOH7RkcD5tB=w800-h600-iv3?auditContext=prefetch",
    tags: ["Residential"]
  },
  {
    id: 9,
    title: "Leanyer - 0812",
    location: "Leanyer, NT 0812",
    date: "2026",
    systemSize: "8.5kW",
    battery: "None",
    description: "Clean energy upgrade for suburban household to slash energy costs.",
    image: "https://lh3.google.com/u/0/d/1dDQjPrxtrGhNlt7dCxmJeeVtonlcDuRZ=w800-h600-iv2?auditContext=prefetch",
    tags: ["Residential"]
  },
  {
    id: 10,
    title: "Ludmilla - 0820",
    location: "Ludmilla, NT 0820",
    date: "2026",
    systemSize: "10.5kW",
    battery: "16kWh Sungrow",
    description: "Integrated smart home solar setup with EV charging capabilities.",
    image: "https://lh3.google.com/u/0/d/12_SQ2PBMEns0rH38bgxC0aX5lcgoNaq5=w800-h600-iv3?auditContext=prefetch",
    tags: ["Residential", "Battery", "EV Ready"]
  },
  {
    id: 11,
    title: "Ludmilla - 0820",
    location: "Ludmilla, NT 0820",
    date: "2025",
    systemSize: "13.2kW",
    battery: "None",
    description: "Modern solar installation tailored to seamlessly fit the house design.",
    image: "https://lh3.google.com/u/0/d/1UX_t-W0s13K8cucTPE2P-tuDdpFSa12r=w800-h600-iv3?auditContext=prefetch",
    tags: ["Residential", "Premium"]
  },
  {
    id: 12,
    title: "Marrara - 0812",
    location: "Marrara, NT 0812",
    date: "2026",
    systemSize: "6.6kW",
    battery: "None",
    description: "Cost-effective solar setup to minimize daytime power consumption.",
    image: "https://lh3.google.com/u/0/d/1EpI9l6BvIGjcouunPbFJJPmMIOqL0pED=w800-h600-iv2?auditContext=prefetch",
    tags: ["Residential"]
  },
  {
    id: 13,
    title: "Marrara - 0812",
    location: "Marrara, NT 0812",
    date: "2026",
    systemSize: "10kW",
    battery: "None",
    description: "Sleek and efficient grid-tied system for a modern residential property.",
    image: "https://lh3.google.com/u/0/d/1aRn-dnCQysi3wGHTKHecME2lJzhti0Hr=w800-h600-iv2?auditContext=prefetch",
    tags: ["Residential"]
  }
];

export default function Projects() {
  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      <div className="bg-[#0A1118] py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn isHero>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-6 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Our Work</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">Projects</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
              Explore our latest solar and battery installations across the Northern Territory. See how we're helping homes and businesses transition to clean energy.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-500 group flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 z-20 flex gap-4 text-white text-sm font-medium">
                    <div className="flex items-center gap-1.5 drop-shadow-md">
                      <MapPin className="w-4 h-4 text-brand-400" />
                      {project.location}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {project.title}
                  </h2>
                  <p className="text-slate-600 mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">System Size</span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Sun className="w-4 h-4 text-brand-500" /> {project.systemSize}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Battery Storage</span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Battery className="w-4 h-4 text-brand-500" /> {project.battery}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      
      <div className="bg-brand-50 py-20 mt-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Ready to start your own solar journey?</h2>
            <p className="text-lg text-slate-600 mb-10">Join hundreds of Territorians who have already made the switch to clean, reliable, and affordable energy with Oneroof Solar.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold shadow-xl hover:-translate-y-1 transition-all" asChild>
                <Link to="/contact">Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-brand-500 text-brand-600 hover:bg-brand-50 hover:-translate-y-1 transition-all" asChild>
                <a href="tel:0419587429">Call Us 0419587429</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
