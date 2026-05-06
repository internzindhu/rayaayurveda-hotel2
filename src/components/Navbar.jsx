import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const stayCountries = [
    { label: "SRI LANKA", slug: "sri-lanka" },
    { label: "INDIA", slug: "india" },
    { label: "THAILAND", slug: "thailand" },
  ];
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isWellnessOpen, setIsWellnessOpen] = useState(false);
  const [isRetreatsOpen, setIsRetreatsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const aboutDropdownRef = useRef(null);
  const guideDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const wellnessDropdownRef = useRef(null);
  const retreatsDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsLoaded(true);

    function handleClickOutside(event) {
      // Don't interfere with mobile menu interactions
      if (mobileMenuRef.current && mobileMenuRef.current.contains(event.target)) {
        return;
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutOpen(false);
      }
      if (guideDropdownRef.current && !guideDropdownRef.current.contains(event.target)) {
        setIsGuideOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      if (wellnessDropdownRef.current && !wellnessDropdownRef.current.contains(event.target)) {
        setIsWellnessOpen(false);
      }
      if (retreatsDropdownRef.current && !retreatsDropdownRef.current.contains(event.target)) {
        setIsRetreatsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 10);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsAboutOpen(false);
        setIsGuideOpen(false);
        setIsServicesOpen(false);
        setIsWellnessOpen(false);
        setIsRetreatsOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsAboutOpen(false);
    setIsGuideOpen(false);
    setIsServicesOpen(false);
    setIsWellnessOpen(false);
    setIsRetreatsOpen(false);
  };

  const openDesktopDropdown = (dropdown) => {
    setIsAboutOpen(dropdown === "about");
    setIsGuideOpen(dropdown === "guide");
    setIsServicesOpen(dropdown === "services");
    setIsWellnessOpen(dropdown === "wellness");
    setIsRetreatsOpen(dropdown === "retreats");
  };

  const closeDesktopDropdowns = () => {
    setIsAboutOpen(false);
    setIsGuideOpen(false);
    setIsServicesOpen(false);
    setIsWellnessOpen(false);
    setIsRetreatsOpen(false);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isAboutActive = isActive("/about");
  const isGuideActive = location.pathname.startsWith("/ayurveda-guide");
  const isServicesActive = isActive("/vouchers") || isActive("/contact");
  const isRetreatsActive =
    isActive("/retreats") ||
    isActive("/individual-stays") ||
    isActive("/group-stays");
  const isWellnessActive =
    isActive("/wellness") ||
    isActive("/sri-lanka") ||
    isActive("/india") ||
    isActive("/thailand");

  // Reusable chevron SVG for mobile
  const Chevron = ({ open }) => (
    <svg
      className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${open ? "rotate-180 text-[#fdbb3a]" : "text-white/50"}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  );

  // Reusable mobile sub-item link
  const MobileLink = ({ to, children, onClose, indent = false }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 py-3 text-white/70 text-[13px] hover:text-white transition-colors duration-150 cursor-pointer touch-manipulation group ${indent ? "pl-4" : ""}`}
      style={{ fontFamily: "Lato, sans-serif", letterSpacing: "0.07em" }}
      onClick={onClose}
    >
      {indent ? (
        <span className="w-0.5 h-4 rounded-full bg-[#fdbb3a] opacity-30 group-hover:opacity-70 flex-shrink-0 transition-opacity" />
      ) : (
        <span className="w-1 h-1 rounded-full bg-[#fdbb3a] opacity-40 group-hover:opacity-90 flex-shrink-0 transition-opacity" />
      )}
      {children}
    </Link>
  );

  // Gold category label
  const CategoryLabel = ({ children }) => (
    <div
      className="pt-4 pb-1 text-[#fdbb3a] text-[10px] uppercase font-semibold"
      style={{ fontFamily: "Lato, sans-serif", letterSpacing: "0.2em" }}
    >
      {children}
    </div>
  );

  return (
    <nav className={`w-full bg-[#5E17EB] fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"} ${!isAtTop ? "backdrop-blur-sm" : ""} ${isMobileMenuOpen ? "z-[100]" : "z-50"}`}>
      <div className="relative">
        <div className="relative z-10 h-16 sm:h-20 md:h-[93px] px-4 sm:px-6 pt-8 flex items-center">

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:grid lg:grid-cols-7 w-full items-center gap-6 lg:gap-12 max-w-[1600px] mx-auto transition-all duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "Lato, sans-serif" }}
          >

            {/* Column 1 - ABOUT */}
            <div className="flex items-center justify-center">
              <div className="relative z-[60]" ref={aboutDropdownRef} onMouseEnter={() => openDesktopDropdown("about")} onMouseLeave={closeDesktopDropdowns}>
                <button type="button" className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isAboutActive ? "opacity-90" : "hover:opacity-80"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                  ABOUT
                  <span className="text-xs">{isAboutOpen ? "▲" : "▼"}</span>
                </button>
                {isAboutOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link to="/about" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsAboutOpen(false)}>ABOUT US</Link>
                    <Link to="/about/mission" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsAboutOpen(false)}>
                      <span className="font-semibold block">MISSION</span>
                      <span className="block text-xs text-white/75 font-normal mt-0.5 leading-snug normal-case">Guided healing, wherever you are in the world.</span>
                    </Link>
                    <Link to="/about/why-travel-with-us" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsAboutOpen(false)}>WHY TRAVEL WITH US</Link>
                    <Link to="/about/how-it-works" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsAboutOpen(false)}>HOW IT WORKS</Link>
                    <div className="px-4 pt-3 pb-2 text-sm text-white font-semibold border-t border-white/10 mt-1">YOUR STAY</div>
                    <Link to="/about/before-your-stay" className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsAboutOpen(false)}>BEFORE</Link>
                    <Link to="/about/during-your-stay" className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsAboutOpen(false)}>DURING</Link>
                    <Link to="/about/after-your-stay" className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsAboutOpen(false)}>AFTER YOUR STAY</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Column 2 - AYURVEDA RETREATS */}
            <div className="flex items-center justify-center">
              <div className="relative z-[60]" ref={retreatsDropdownRef} onMouseEnter={() => openDesktopDropdown("retreats")} onMouseLeave={closeDesktopDropdowns}>
                <button type="button" className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isRetreatsActive ? "opacity-90" : "hover:opacity-80"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                  <span>AYURVEDA<br />RETREATS</span>
                  <span className="text-xs">{isRetreatsOpen ? "▲" : "▼"}</span>
                </button>
                {isRetreatsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <div className="px-4 py-2.5 text-sm text-white font-semibold">INDIVIDUAL STAYS</div>
                    {stayCountries.map((country) => (
                      <Link key={`desktop-individual-${country.slug}`} to={`/individual-stays/${country.slug}`} className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsRetreatsOpen(false)}>{country.label}</Link>
                    ))}
                    <div className="px-4 pt-3 pb-2 text-sm text-white font-semibold border-t border-white/10 mt-1">GROUP STAYS</div>
                    {stayCountries.map((country) => (
                      <Link key={`desktop-group-${country.slug}`} to={`/group-stays/${country.slug}`} className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsRetreatsOpen(false)}>{country.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Column 3 - WELLNESS & SPIRITUALITY */}
            <div className="flex items-center justify-center">
              <div className="relative z-[60]" ref={wellnessDropdownRef} onMouseEnter={() => openDesktopDropdown("wellness")} onMouseLeave={closeDesktopDropdowns}>
                <button type="button" className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isWellnessActive ? "opacity-90" : "hover:opacity-80"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                  <span>WELLNESS &<br />SPIRITUALITY</span>
                  <span className="text-xs">{isWellnessOpen ? "▲" : "▼"}</span>
                </button>
                {isWellnessOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link to="/sri-lanka" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsWellnessOpen(false)}>SRI LANKA</Link>
                    <Link to="/india" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsWellnessOpen(false)}>INDIA</Link>
                    <Link to="/thailand" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsWellnessOpen(false)}>THAILAND</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Column 4 - Logo */}
            <div className={`flex items-center justify-center transition-all duration-700 ease-out ${isLoaded ? "scale-100" : "scale-95"}`}>
              <Link to="/">
                <img src="/logo.png" alt="RAYA Logo" className="w-40 md:w-[140px] lg:w-[150px] h-auto hover:scale-110 transition-transform duration-300 ease-in-out" />
              </Link>
            </div>

            {/* Column 5 - SERVICES */}
            <div className="flex items-center justify-center">
              <div className="relative z-[60]" ref={servicesDropdownRef} onMouseEnter={() => openDesktopDropdown("services")} onMouseLeave={closeDesktopDropdowns}>
                <button type="button" className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isServicesActive ? "opacity-90" : "hover:opacity-80"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                  SERVICES
                  <span className="text-xs">{isServicesOpen ? "▲" : "▼"}</span>
                </button>
                {isServicesOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link to="/vouchers" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsServicesOpen(false)}>VOUCHERS</Link>
                    <Link to="/contact" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsServicesOpen(false)}>BOOKING AND CONTACT</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Column 6 - BLOG & INSIGHTS */}
            <div className="flex items-center justify-center">
              <Link to="/" className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight ${isActive("/insights") ? "opacity-90" : "hover:opacity-80"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                BLOG &<br />INSIGHTS
              </Link>
            </div>

            {/* Column 7 - AYURVEDA GUIDE */}
            <div className="flex items-center justify-center">
              <div className="relative z-[60]" ref={guideDropdownRef} onMouseEnter={() => openDesktopDropdown("guide")} onMouseLeave={closeDesktopDropdowns}>
                <button type="button" className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isGuideActive ? "opacity-90" : "hover:opacity-80"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                  <span>AYURVEDA<br />GUIDE</span>
                  <span className="text-xs">{isGuideOpen ? "▲" : "▼"}</span>
                </button>
                {isGuideOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link to="/ayurveda-guide/what-is-ayurveda" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsGuideOpen(false)}>WHAT IS AYURVEDA</Link>
                    <Link to="/ayurveda-guide/principles-vata-pitta-kapha" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsGuideOpen(false)}>PRINCIPLES (VATA, PITTA, KAPHA)</Link>
                    <Link to="/ayurveda-guide/preventive-vs-curative" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsGuideOpen(false)}>PREVENTIVE VS CURATIVE APPROACH</Link>
                    <Link to="/ayurveda-guide/what-is-panchakarma" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsGuideOpen(false)}>WHAT IS PANCHAKARMA</Link>
                    <Link to="/ayurveda-guide/what-ayurveda-can-and-cannot-cure" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer leading-snug" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsGuideOpen(false)}>WHAT AYURVEDA CAN CURE AND CANNOT CURE</Link>
                    <Link to="/ayurveda-guide/myths-about-ayurveda" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsGuideOpen(false)}>MYTHS ABOUT AYURVEDA</Link>
                    <Link to="/ayurveda-guide/ayurveda-vs-wellness" className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }} onClick={() => setIsGuideOpen(false)}>AYURVEDA VS WELLNESS</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <div className="w-10" />
            <Link to="/">
              <img src="/Raya_logo_new.png" alt="RAYA Logo" className="w-32 sm:w-40 h-auto" />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className={`w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-200 ${isMobileMenuOpen ? "bg-white/15" : "hover:bg-white/10"}`}
              aria-label="Toggle mobile menu"
            >
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-0 opacity-0" : "w-4"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`} />
            </button>
          </div>

        </div>

        {/* Curved Shape Under Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-64 md:w-80 lg:w-56 pointer-events-none">
          <svg viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-auto">
            <path d="M0,0 Q200,80 400,0 L400,0 L0,0 Z" fill="#5E17EB" />
          </svg>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden relative z-[110] bg-[#5E17EB] overflow-y-auto max-h-[82vh] animate-mobile-menu"
        >
          {/* thin gold rule at the top */}
          <div className="h-px bg-[#fdbb3a]/30 mx-6" />

          <div className="px-6 divide-y divide-white/10">

            {/* ABOUT */}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 cursor-pointer touch-manipulation"
                onClick={() => setIsAboutOpen((prev) => !prev)}
              >
                <span
                  className={`transition-colors duration-200 ${isAboutOpen ? "text-[#fdbb3a]" : "text-white"}`}
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400, fontSize: "22px" }}
                >
                  About
                </span>
                <Chevron open={isAboutOpen} />
              </button>
              {isAboutOpen && (
                <div className="pb-4 animate-mobile-dropdown">
                  <MobileLink to="/about" onClose={() => { setIsAboutOpen(false); setIsMobileMenuOpen(false); }}>ABOUT US</MobileLink>
                  <MobileLink to="/about/mission" onClose={() => { setIsAboutOpen(false); setIsMobileMenuOpen(false); }}>MISSION</MobileLink>
                  <p className="pl-7 pb-2 text-white/35 text-xs italic leading-snug" style={{ fontFamily: "Sentient, serif" }}>
                    Guided healing, wherever you are in the world.
                  </p>
                  <MobileLink to="/about/why-travel-with-us" onClose={() => { setIsAboutOpen(false); setIsMobileMenuOpen(false); }}>WHY TRAVEL WITH US</MobileLink>
                  <MobileLink to="/about/how-it-works" onClose={() => { setIsAboutOpen(false); setIsMobileMenuOpen(false); }}>HOW IT WORKS</MobileLink>
                  <CategoryLabel>Your Stay</CategoryLabel>
                  <MobileLink to="/about/before-your-stay" indent onClose={() => { setIsAboutOpen(false); setIsMobileMenuOpen(false); }}>BEFORE</MobileLink>
                  <MobileLink to="/about/during-your-stay" indent onClose={() => { setIsAboutOpen(false); setIsMobileMenuOpen(false); }}>DURING</MobileLink>
                  <MobileLink to="/about/after-your-stay" indent onClose={() => { setIsAboutOpen(false); setIsMobileMenuOpen(false); }}>AFTER YOUR STAY</MobileLink>
                </div>
              )}
            </div>

            {/* AYURVEDA RETREATS */}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 cursor-pointer touch-manipulation"
                onClick={() => setIsRetreatsOpen((prev) => !prev)}
              >
                <span
                  className={`transition-colors duration-200 ${isRetreatsOpen ? "text-[#fdbb3a]" : "text-white"}`}
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400, fontSize: "22px" }}
                >
                  Ayurveda Retreats
                </span>
                <Chevron open={isRetreatsOpen} />
              </button>
              {isRetreatsOpen && (
                <div className="pb-4 animate-mobile-dropdown">
                  <CategoryLabel>Individual Stays</CategoryLabel>
                  {stayCountries.map((country) => (
                    <MobileLink key={`mobile-individual-${country.slug}`} to={`/individual-stays/${country.slug}`} indent onClose={() => { setIsRetreatsOpen(false); setIsMobileMenuOpen(false); }}>
                      {country.label}
                    </MobileLink>
                  ))}
                  <CategoryLabel>Group Stays</CategoryLabel>
                  {stayCountries.map((country) => (
                    <MobileLink key={`mobile-group-${country.slug}`} to={`/group-stays/${country.slug}`} indent onClose={() => { setIsRetreatsOpen(false); setIsMobileMenuOpen(false); }}>
                      {country.label}
                    </MobileLink>
                  ))}
                </div>
              )}
            </div>

            {/* WELLNESS & SPIRITUALITY */}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 cursor-pointer touch-manipulation"
                onClick={() => setIsWellnessOpen((prev) => !prev)}
              >
                <span
                  className={`transition-colors duration-200 ${isWellnessOpen ? "text-[#fdbb3a]" : "text-white"}`}
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400, fontSize: "22px" }}
                >
                  Wellness &amp; Spirituality
                </span>
                <Chevron open={isWellnessOpen} />
              </button>
              {isWellnessOpen && (
                <div className="pb-4 animate-mobile-dropdown">
                  <MobileLink to="/sri-lanka" onClose={() => { setIsWellnessOpen(false); setIsMobileMenuOpen(false); }}>SRI LANKA</MobileLink>
                  <MobileLink to="/india" onClose={() => { setIsWellnessOpen(false); setIsMobileMenuOpen(false); }}>INDIA</MobileLink>
                  <MobileLink to="/thailand" onClose={() => { setIsWellnessOpen(false); setIsMobileMenuOpen(false); }}>THAILAND</MobileLink>
                </div>
              )}
            </div>

            {/* SERVICES */}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 cursor-pointer touch-manipulation"
                onClick={() => setIsServicesOpen((prev) => !prev)}
              >
                <span
                  className={`transition-colors duration-200 ${isServicesOpen ? "text-[#fdbb3a]" : "text-white"}`}
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400, fontSize: "22px" }}
                >
                  Services
                </span>
                <Chevron open={isServicesOpen} />
              </button>
              {isServicesOpen && (
                <div className="pb-4 animate-mobile-dropdown">
                  <MobileLink to="/vouchers" onClose={() => { setIsServicesOpen(false); setIsMobileMenuOpen(false); }}>VOUCHERS</MobileLink>
                  <MobileLink to="/contact" onClose={() => { setIsServicesOpen(false); setIsMobileMenuOpen(false); }}>BOOKING AND CONTACT</MobileLink>
                </div>
              )}
            </div>

            {/* AYURVEDA GUIDE */}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 cursor-pointer touch-manipulation"
                onClick={() => setIsGuideOpen((prev) => !prev)}
              >
                <span
                  className={`transition-colors duration-200 ${isGuideOpen ? "text-[#fdbb3a]" : "text-white"}`}
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400, fontSize: "22px" }}
                >
                  Ayurveda Guide
                </span>
                <Chevron open={isGuideOpen} />
              </button>
              {isGuideOpen && (
                <div className="pb-4 animate-mobile-dropdown">
                  {[
                    { to: "/ayurveda-guide/what-is-ayurveda", label: "WHAT IS AYURVEDA" },
                    { to: "/ayurveda-guide/principles-vata-pitta-kapha", label: "PRINCIPLES (VATA, PITTA, KAPHA)" },
                    { to: "/ayurveda-guide/preventive-vs-curative", label: "PREVENTIVE VS CURATIVE APPROACH" },
                    { to: "/ayurveda-guide/what-is-panchakarma", label: "WHAT IS PANCHAKARMA" },
                    { to: "/ayurveda-guide/what-ayurveda-can-and-cannot-cure", label: "WHAT AYURVEDA CAN AND CANNOT CURE" },
                    { to: "/ayurveda-guide/myths-about-ayurveda", label: "MYTHS ABOUT AYURVEDA" },
                    { to: "/ayurveda-guide/ayurveda-vs-wellness", label: "AYURVEDA VS WELLNESS" },
                  ].map(({ to, label }) => (
                    <MobileLink key={to} to={to} onClose={() => { setIsGuideOpen(false); setIsMobileMenuOpen(false); }}>{label}</MobileLink>
                  ))}
                </div>
              )}
            </div>

            {/* BLOG & INSIGHTS — no dropdown */}
            <div>
              <Link
                to="/"
                className="flex w-full items-center justify-between py-5 cursor-pointer touch-manipulation group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className="text-white group-hover:text-white/80 transition-colors duration-200"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400, fontSize: "22px" }}
                >
                  Blog &amp; Insights
                </span>
                <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="px-6 py-5">
            <Link
              to="/consultation"
              className="block w-full py-4 bg-[#fdbb3a] text-[#181818] text-sm font-bold text-center rounded-xl uppercase hover:bg-yellow-300 transition-colors duration-200"
              style={{ fontFamily: "Lato, sans-serif", letterSpacing: "0.15em" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translate(-50%, -6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
          transform: translateX(-50%);
        }
        @keyframes mobileMenuSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-mobile-menu {
          animation: mobileMenuSlide 0.22s ease-out forwards;
        }
        @keyframes mobileDropdownFade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-mobile-dropdown {
          animation: mobileDropdownFade 0.18s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}
