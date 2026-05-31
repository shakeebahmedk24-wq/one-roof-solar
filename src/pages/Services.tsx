import { FadeIn } from "@/src/components/ui/FadeIn";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export function Services() {
  const [services, setServices] = useState<any[]>([
    {
      title: "Residential Solar",
      slug: "residential-solar-system",
      description: "Harness the power of the sun for your home. We install premium 6.6kW to 13.2kW systems that drastically cut or eliminate your power bills. Ideal for Darwin's sunny climate.",
      features: [
        "High-performance Jinko or AIKO panels",
        "Sungrow or FoxESS inverters",
        "Full installation & grid connection",
        "25-year performance warranty"
      ],
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=60&w=1000&auto=format&fit=crop"
    },
    {
      title: "Commercial Solar",
      slug: "commercial-solar-system",
      description: "Protect your business's bottom line from rising energy costs. We design high-yield commercial PV systems tailored to your energy consumption profile.",
      features: [
        "Massive ROI & fast payback periods",
        "Tax benefits & government incentives",
        "Custom engineered for your roof space",
        "Ongoing maintenance & support"
      ],
      image: "https://a-us.storyblok.com/f/1006159/810x471/62865d0b80/des-1116-csm.jpg/m/1000x0/filters:quality(60):format(webp)"
    },
    {
      title: "Solar Batteries & Storage",
      slug: "battery-storage",
      description: "Store your excess solar energy for nighttime use. Add a battery to a new or existing system and take advantage of the 30% federal rebate.",
      features: [
        "Blackout protection",
        "Maximize self-consumption",
        "Reduce peak demand charges",
        "Seamless hybrid inverter integration"
      ],
      image: "https://i.postimg.cc/VN7B2NkJ/DSC00505-Enhanced-NR-(1)-jpg-(2)-(1).webp"
    },
    {
      title: "EV Chargers",
      slug: "ev-chargers",
      description: "Get ready for the future with smart EV chargers. We provide installation and integration with your existing solar system.",
      features: [
        "Smart EV charger installation",
        "Integration with solar systems",
        "Fast charging capabilities",
        "Residential & commercial options"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYjFUKNKyOMySm6lkKfTkODY4oKkYzGvdgw&s"
    },
    {
      title: "Repairs & Maintenance",
      slug: "repairs-and-maintenance",
      description: "Keep your system running at peak performance with professional panel cleaning, system health checks, and repairs.",
      features: [
        "Professional panel cleaning",
        "System health checks",
        "Performance optimization",
        "Fault diagnosis & repairs"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExfMGgoZJ0SC5uObr6P1AIzCA5Qme1j8pLA&s"
    },
    {
      title: "Solar Inverters",
      slug: "solar-inverters",
      description: "Upgrade or replace your solar inverter for maximum efficiency. We offer top-tier brands like Sungrow, Fronius, and FoxESS.",
      features: [
        "Premium inverter brands",
        "High efficiency conversion",
        "Smart monitoring capabilities",
        "Extended warranties"
      ],
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=60&w=1000&auto=format&fit=crop"
    }
  ]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const snap = await getDocs(collection(db, 'services'));
        if (!snap.empty) {
          setServices(snap.docs.map(doc => ({
            id: doc.id,
            slug: doc.id,
            ...doc.data()
          })));
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-[160px] pb-32 lg:pt-[240px] lg:pb-40 overflow-hidden bg-[#101522]">
        <div className="absolute inset-0">
          <img loading="lazy" src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=60&w=1000&auto=format&fit=crop" alt="Solar Panels" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101522] via-[#101522]/80 to-transparent"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn isHero>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 shadow-sm mb-6 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="text-sm font-bold text-brand-400 uppercase tracking-widest">Our Expertise</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">Solar Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-10">
              Designed to save you money and power your life naturally. Discover our range of premium clean energy services tailored for the NT.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up">
              <Button size="lg" className="rounded-full font-bold text-base px-8 h-14 bg-brand-500 hover:bg-brand-600 text-[#0f172a] shadow-[0_8px_30px_rgba(140,198,63,0.3)] hover:-translate-y-1 transition-all group" asChild>
                <Link to="/contact">Get Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold text-base px-8 h-14 border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105" asChild>
                <a href="tel:0419587429">Call Us 0419587429</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-200/40 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {services.map((service, index) => {
              // Determine card size and layout based on index to create a bento-style grid
              const isLarge = index === 0 || index === 3;
              const colSpan = isLarge ? "lg:col-span-4" : "lg:col-span-2";
              
              return (
                <FadeIn key={service.title} delay={index * 0.1} className={`${colSpan} group`}>
                  <div className="relative h-full rounded-[2.5rem] bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:border-brand-200 transition-all duration-500 flex flex-col cursor-pointer max-h-[600px]">
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10"></div>
                      <img loading="lazy" src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                    
                    <div className="relative z-20 flex flex-col h-full p-8 md:p-12 justify-end">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-semibold text-xs uppercase tracking-widest mb-6 w-fit transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="w-2 h-2 rounded-full bg-brand-400"></span>
                        Premium Service
                      </div>
                      
                      <h2 className={`font-black text-white mb-4 ${isLarge ? 'text-4xl lg:text-5xl' : 'text-3xl'}`}>
                        {service.title}
                      </h2>
                      
                      <p className={`text-slate-300 font-medium mb-8 line-clamp-3 ${isLarge ? 'text-lg max-w-xl' : 'text-base'}`}>
                        {service.description}
                      </p>
                      
                      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8 w-full">
                        {(service.features || []).slice(0, isLarge ? 4 : 2).map((feature: string) => (
                           <div key={feature} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-brand-400 flex-shrink-0" />
                            <span className="font-semibold text-slate-200 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 flex gap-4">
                        <Button className="rounded-full shadow-lg hover:-translate-y-1 transition-all bg-brand-500 text-slate-900 hover:bg-brand-400 font-bold" asChild>
                          <Link to={`/services/${service.slug}`}>Discover More</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Bottom Section */}
      <section className="py-24 bg-brand-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Start Your Solar Journey Today
            </h2>
            <p className="text-lg text-slate-800 mb-10 max-w-2xl mx-auto font-medium">
              Join thousands of happy customers in Darwin, Alice Springs, and Palmerston saving on their energy bills.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl transition-transform hover:-translate-y-1" asChild>
                <Link to="/contact">Book Your Free Consultation <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-slate-900 text-slate-900 hover:bg-slate-900/10 transition-transform hover:-translate-y-1" asChild>
                <a href="tel:0419587429">Call Us 0419587429</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

