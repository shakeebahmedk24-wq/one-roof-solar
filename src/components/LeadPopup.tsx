import { useState, useEffect } from "react";
import { X, Zap, ShieldCheck, Banknote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup
    // const hasSeenPopup = localStorage.getItem("hasSeenLeadPopup");
    
    // Always show for now during testing
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    // Inject the GHL form script if it's not already in the document
    if (isOpen) {
      const scriptId = "ghl-form-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://link.oneroofsolar.com.au/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    // localStorage.setItem("hasSeenLeadPopup", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md transition-opacity"
          />

          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden my-8 isolate"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Left Side - Visual Focus */}
              <div className="relative w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center overflow-hidden bg-neutral-950 text-white min-h-[400px]">
                {/* Background Image / Texture */}
                <div 
                  className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/30 pointer-events-none" />
                
                {/* Glowing Orbs */}
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-yellow-500 rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-green-500 rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" />

                <div className="relative z-10 flex flex-col h-full justify-center">
                  {/* Logo */}
                  <div className="mb-10 relative">
                    <div className="absolute inset-0 bg-white/10 blur-xl rounded-full" />
                    <img 
                      src="https://i.postimg.cc/brNtCpzP/RMM02-removebg-preview-(1).png" 
                      alt="Oneroof Solar Logo" 
                      className="h-12 lg:h-16 w-auto opacity-100 drop-shadow-lg relative z-10"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 text-sm font-semibold mb-8 shadow-[0_0_20px_rgba(234,179,8,0.15)] ring-1 ring-yellow-500/30">
                      <Zap size={16} className="text-yellow-400 animate-pulse" />
                      <span className="text-yellow-50">Limited Time Offer</span>
                    </div>
                    
                    <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] drop-shadow-2xl">
                      <span className="text-white">Claim Your</span> <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 drop-shadow-sm">
                        $2,000 Rebate
                      </span>
                    </h2>
                    
                    <p className="text-lg lg:text-xl text-neutral-200 mb-10 leading-relaxed max-w-md font-medium">
                      Switch to premium solar and battery storage. Lock in lower energy bills and secure your government rebate today.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 flex items-center justify-center border border-yellow-500/30 shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:scale-105 transition-transform duration-300">
                          <Banknote className="w-7 h-7 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg tracking-wide">Free Savings Estimate</h4>
                          <p className="text-sm text-neutral-300 font-medium">See exactly how much you can save</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 flex items-center justify-center border border-yellow-500/30 shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:scale-105 transition-transform duration-300">
                          <ShieldCheck className="w-7 h-7 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg tracking-wide">Premium Tier-1 Tech</h4>
                          <p className="text-sm text-neutral-300 font-medium">Industry-leading panels & batteries</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-1/2 bg-neutral-950 flex flex-col justify-center px-6 py-10 lg:p-12 relative overflow-hidden text-white">
                <div 
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-neutral-950/70 pointer-events-none backdrop-blur-md" />
                <div className="absolute top-0 right-0 w-full h-[300px] bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />
                
                <div className="text-center mb-6 lg:mb-8 relative z-10">
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">Check Eligibility</h3>
                  <p className="text-neutral-300 mt-2 font-medium">Takes less than 60 seconds</p>
                </div>
                
                <div className="w-full relative bg-transparent rounded-xl overflow-hidden" style={{ minHeight: "432px" }}>
                  <iframe
                    src="https://link.oneroofsolar.com.au/widget/form/XVgkuW5m65fGTA1nDLGD"
                    style={{ width: "100%", height: "100%", border: "none", borderRadius: "12px", minHeight: "432px" }}
                    id="inline-XVgkuW5m65fGTA1nDLGD"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="PoP Up "
                    data-height="432"
                    data-layout-iframe-id="inline-XVgkuW5m65fGTA1nDLGD"
                    data-form-id="XVgkuW5m65fGTA1nDLGD"
                    title="PoP Up "
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
