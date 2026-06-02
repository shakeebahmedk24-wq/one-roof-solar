import { Link, useLocation } from "react-router-dom";
import { Sun, Menu, X, Phone, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    {
      label: "Solar System",
      children: [
        { href: "/services/residential-solar-system", label: "Residential Solar System" },
        { href: "/services/commercial-solar-system", label: "Commercial Solar System" },
      ],
    },
    {
      label: "Products",
      children: [
        { href: "/services/ev-chargers", label: "EV Chargers" },
        { href: "/services/solar-inverters", label: "Solar Inverters" },
        { href: "/services/solar-panel", label: "Solar Panel" },
        { href: "/services/battery-storage", label: "Battery Storage" },
      ],
    },
    {
      label: "Services",
      href: "/services",
      children: [
        { href: "/services/solar-panel-installation", label: "Solar Panel Installation" },
        { href: "/services/solar-inverter-installation", label: "Solar Inverter Installation" },
        { href: "/services/solar-battery-installation", label: "Solar Battery Installation" },
        { href: "/services/repairs-and-maintenance", label: "Repairs & Maintenance" },
      ],
    },
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-4 lg:py-6"
      }`}
    >
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 xl:px-8">
        <div 
          className={`relative flex items-center justify-between transition-all duration-500 rounded-[2rem] ${
            scrolled || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services'))
              ? "bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-5 py-2.5" 
              : "bg-transparent px-2 py-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 relative z-50">
              <img 
                src={scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "https://i.postimg.cc/L5Dz2v9y/p-HEv-R-removebg-preview.png" : "https://i.postimg.cc/brNtCpzP/RMM02-removebg-preview-(1).png"}
                alt="Oneroof Solar Logo" 
                className={`${scrolled ? "h-10 md:h-12" : "h-14 md:h-16"} w-auto transition-all duration-500`} 
                fetchPriority="high"
                loading="eager"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-black/5 backdrop-blur-sm rounded-full p-1 border border-black/5">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`text-[14px] font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1 whitespace-nowrap ${
                        location.pathname === item.href 
                          ? "bg-white text-brand-600 shadow-sm" 
                          : scrolled || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "text-slate-700 hover:bg-white/50" : "text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className={`text-[14px] font-semibold px-4 py-2 rounded-full flex items-center gap-1 cursor-pointer transition-all duration-300 whitespace-nowrap ${
                      scrolled || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "text-slate-700 hover:bg-white/50" : "text-white hover:bg-white/10"
                    }`}>
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </div>
                  )}
                  
                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[120%] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:top-full w-64 z-50">
                      <div className="rounded-2xl border border-slate-100/50 bg-white/95 backdrop-blur-xl p-2.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] relative">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-[8px] border-transparent border-b-white/95"></div>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <Button asChild className={`hidden lg:flex whitespace-nowrap rounded-full h-11 px-6 font-bold shadow-[0_8px_20px_-8px_rgba(140,198,63,0.5)] transition-transform hover:-translate-y-0.5 ${!scrolled && location.pathname === "/" ? "bg-brand-500 text-slate-900 hover:bg-brand-400" : "bg-brand-500 text-slate-900 hover:bg-brand-600"}`}>
                <Link to="/contact">Get A Free Quote</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-2 rounded-full transition-colors ${(!scrolled && !isOpen && location.pathname === "/") ? "text-white bg-white/10 hover:bg-white/20" : "text-slate-800 bg-slate-100 hover:bg-slate-200"}`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-slate-100 bg-white px-4 pt-4 pb-8 shadow-2xl overflow-y-auto absolute top-full left-0 w-full"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  key={item.label}
                >
                  {item.href ? (
                     <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3.5 text-[15px] font-bold rounded-xl transition-colors ${
                        location.pathname === item.href
                          ? "bg-brand-50 text-brand-600"
                          : "text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="px-3 py-3.5 text-[15px] font-bold text-slate-900">
                      {item.label}
                      <div className="mt-3 flex flex-col space-y-1 pl-4 border-l-2 border-brand-100">
                        {item.children?.map((child) => (
                           <Link
                            key={child.label}
                            to={child.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-brand-600 rounded-lg hover:bg-brand-50/50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-slate-100 flex flex-col gap-4 px-3 mt-4"
              >
                <Button className="w-full justify-center rounded-full h-12 font-bold text-base shadow-lg bg-brand-500 text-slate-900 hover:bg-brand-600" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Get A Free Quote</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
