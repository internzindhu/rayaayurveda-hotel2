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
  const location = useLocation();

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);

    function handleClickOutside(event) {
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

      // Check if at top of page
      setIsAtTop(currentScrollY < 10);

      if (currentScrollY < 10) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar and close dropdowns
        setIsVisible(false);
        setIsAboutOpen(false);
        setIsGuideOpen(false);
        setIsServicesOpen(false);
        setIsWellnessOpen(false);
        setIsRetreatsOpen(false);
      } else {
        // Scrolling up - show navbar
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

  return (
    <nav className={`w-full bg-[#5E17EB] fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${!isAtTop ? 'backdrop-blur-sm' : ''} ${isMobileMenuOpen ? 'z-[100]' : 'z-50'}`}>
      <div className="relative">
        <div className="relative z-10 h-16 sm:h-20 md:h-[93px] px-4 sm:px-6  pt-8 flex items-center">

          {/* Desktop Navigation */}
          <div className={`hidden lg:grid lg:grid-cols-7 w-full items-center gap-6 lg:gap-12 max-w-[1600px] mx-auto transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`} style={{ fontFamily: 'Lato, sans-serif' }}>

            {/* Column 1 - ABOUT (dropdown) */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={aboutDropdownRef}
                onMouseEnter={() => openDesktopDropdown("about")}
                onMouseLeave={closeDesktopDropdowns}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isAboutActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  ABOUT
                  <span className="text-xs">{isAboutOpen ? "▲" : "▼"}</span>
                </button>
                {isAboutOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link
                      to="/about"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      ABOUT US
                    </Link>
                    <Link
                      to="/about/mission"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      <span className="font-semibold block">MISSION</span>
                      <span className="block text-xs text-white/75 font-normal mt-0.5 leading-snug normal-case">
                        Guided healing, wherever you are in the world.
                      </span>
                    </Link>
                    <Link
                      to="/about/why-travel-with-us"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      WHY TRAVEL WITH US
                    </Link>
                    <Link
                      to="/about/how-it-works"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      HOW IT WORKS
                    </Link>
                    <div className="px-4 pt-3 pb-2 text-sm text-white font-semibold border-t border-white/10 mt-1">
                      YOUR STAY
                    </div>
                    <Link
                      to="/about/before-your-stay"
                      className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      BEFORE
                    </Link>
                    <Link
                      to="/about/during-your-stay"
                      className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      DURING
                    </Link>
                    <Link
                      to="/about/after-your-stay"
                      className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      AFTER YOUR STAY
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Column 2 - AYURVEDA RETREATS */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={retreatsDropdownRef}
                onMouseEnter={() => openDesktopDropdown("retreats")}
                onMouseLeave={closeDesktopDropdowns}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isRetreatsActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  <span>AYURVEDA<br />RETREATS</span>
                  <span className="text-xs">
                    {isRetreatsOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isRetreatsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <div className="px-4 py-2.5 text-sm text-white font-semibold">
                      INDIVIDUAL STAYS
                    </div>
                    {stayCountries.map((country) => (
                      <Link
                        key={`desktop-individual-${country.slug}`}
                        to={`/individual-stays/${country.slug}`}
                        className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                        onClick={() => setIsRetreatsOpen(false)}
                      >
                        {country.label}
                      </Link>
                    ))}
                    <div className="px-4 pt-3 pb-2 text-sm text-white font-semibold border-t border-white/10 mt-1">
                      GROUP STAYS
                    </div>
                    {stayCountries.map((country) => (
                      <Link
                        key={`desktop-group-${country.slug}`}
                        to={`/group-stays/${country.slug}`}
                        className="block pl-8 pr-4 py-2 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                        onClick={() => setIsRetreatsOpen(false)}
                      >
                        {country.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Column 3 - WELLNESS & SPIRITUALITY */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={wellnessDropdownRef}
                onMouseEnter={() => openDesktopDropdown("wellness")}
                onMouseLeave={closeDesktopDropdowns}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isWellnessActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  <span>WELLNESS &<br />SPIRITUALITY</span>
                  <span className="text-xs">
                    {isWellnessOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isWellnessOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link
                      to="/sri-lanka"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsWellnessOpen(false)}
                    >
                      SRI LANKA
                    </Link>
                    <Link
                      to="/india"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsWellnessOpen(false)}
                    >
                      INDIA
                    </Link>
                    <Link
                      to="/thailand"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsWellnessOpen(false)}
                    >
                      THAILAND
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Column 4 - Centered Logo */}
            <div className={`flex items-center justify-center transition-all duration-700 ease-out ${isLoaded ? 'scale-100' : 'scale-95'
              }`}>
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="RAYA Logo"
                  className="w-40 md:w-[140px] lg:w-[150px] h-auto hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </Link>
            </div>

            {/* Column 5 - SERVICES (Dropdown) */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={servicesDropdownRef}
                onMouseEnter={() => openDesktopDropdown("services")}
                onMouseLeave={closeDesktopDropdowns}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isServicesActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  SERVICES
                  <span className="text-xs">
                    {isServicesOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isServicesOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link
                      to="/vouchers"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      VOUCHERS
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      BOOKING AND CONTACT
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Column 6 - BLOG & INSIGHTS */}
            <div className="flex items-center justify-center">
              <Link
                to="/"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight ${isActive("/insights")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                BLOG &<br />INSIGHTS
              </Link>
            </div>

            {/* Column 7 - AYURVEDA GUIDE (dropdown) */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={guideDropdownRef}
                onMouseEnter={() => openDesktopDropdown("guide")}
                onMouseLeave={closeDesktopDropdowns}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isGuideActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  <span>
                    AYURVEDA
                    <br />
                    GUIDE
                  </span>
                  <span className="text-xs">{isGuideOpen ? "▲" : "▼"}</span>
                </button>
                {isGuideOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link
                      to="/ayurveda-guide/what-is-ayurveda"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsGuideOpen(false)}
                    >
                      WHAT IS AYURVEDA
                    </Link>
                    <Link
                      to="/ayurveda-guide/principles-vata-pitta-kapha"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsGuideOpen(false)}
                    >
                      PRINCIPLES (VATA, PITTA, KAPHA)
                    </Link>
                    <Link
                      to="/ayurveda-guide/preventive-vs-curative"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsGuideOpen(false)}
                    >
                      PREVENTIVE VS CURATIVE APPROACH
                    </Link>
                    <Link
                      to="/ayurveda-guide/what-is-panchakarma"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsGuideOpen(false)}
                    >
                      WHAT IS PANCHAKARMA
                    </Link>
                    <Link
                      to="/ayurveda-guide/what-ayurveda-can-and-cannot-cure"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer leading-snug"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsGuideOpen(false)}
                    >
                      WHAT AYURVEDA CAN CURE AND CANNOT CURE
                    </Link>
                    <Link
                      to="/ayurveda-guide/myths-about-ayurveda"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsGuideOpen(false)}
                    >
                      MYTHS ABOUT AYURVEDA
                    </Link>
                    <Link
                      to="/ayurveda-guide/ayurveda-vs-wellness"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsGuideOpen(false)}
                    >
                      AYURVEDA VS WELLNESS
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <div></div>
            <Link to="/">
              <img
                src="/Raya_logo_new.png"
                alt="RAYA Logo"
                className="w-32 sm:w-40 h-auto"
              />
            </Link>

            {/* Mobile Menu Button */}
            <div>
              <button
                onClick={toggleMobileMenu}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Curved Shape Under Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-64 md:w-80 lg:w-56 pointer-events-none">
          <svg
            viewBox="0 0 400 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-auto"
          >
            <path
              d="M0,0 Q200,80 400,0 L400,0 L0,0 Z"
              fill="#5E17EB"
            />
          </svg>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden relative z-10 bg-[#181818] border-t border-white/10" style={{ fontFamily: 'Lato, sans-serif' }}>
          <div className="px-4 py-6 space-y-1">
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation"
                onClick={() => setIsAboutOpen((prev) => !prev)}
              >
                <span>ABOUT</span>
                <span className="text-xs">{isAboutOpen ? "▲" : "▼"}</span>
              </button>
              {isAboutOpen && (
                <div className="ml-4 mt-1 space-y-0">
                  <Link
                    to="/about"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/about") && location.pathname === "/about" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsAboutOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    ABOUT US
                  </Link>
                  <Link
                    to="/about/mission"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/about/mission") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsAboutOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    MISSION
                  </Link>
                  <p className="py-1 px-1 text-white/60 text-xs normal-case leading-snug" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Guided healing, wherever you are in the world.
                  </p>
                  <Link
                    to="/about/why-travel-with-us"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/about/why-travel-with-us") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsAboutOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    WHY TRAVEL WITH US
                  </Link>
                  <Link
                    to="/about/how-it-works"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/about/how-it-works") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsAboutOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    HOW IT WORKS
                  </Link>
                  <div className="py-2 px-1 text-white/90 text-sm font-semibold border-t border-white/10 mt-2">YOUR STAY</div>
                  <Link
                    to="/about/before-your-stay"
                    className={`block py-2 px-5 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/about/before-your-stay") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsAboutOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    BEFORE
                  </Link>
                  <Link
                    to="/about/during-your-stay"
                    className={`block py-2 px-5 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/about/during-your-stay") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsAboutOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    DURING
                  </Link>
                  <Link
                    to="/about/after-your-stay"
                    className={`block py-2 px-5 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/about/after-your-stay") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsAboutOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    AFTER YOUR STAY
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation"
                onClick={() => setIsGuideOpen((prev) => !prev)}
              >
                <span>AYURVEDA GUIDE</span>
                <span className="text-xs">{isGuideOpen ? "▲" : "▼"}</span>
              </button>
              {isGuideOpen && (
                <div className="ml-4 mt-1 space-y-0">
                  <Link
                    to="/ayurveda-guide/what-is-ayurveda"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${location.pathname === "/ayurveda-guide/what-is-ayurveda" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsGuideOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    WHAT IS AYURVEDA
                  </Link>
                  <Link
                    to="/ayurveda-guide/principles-vata-pitta-kapha"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${location.pathname === "/ayurveda-guide/principles-vata-pitta-kapha" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsGuideOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    PRINCIPLES (VATA, PITTA, KAPHA)
                  </Link>
                  <Link
                    to="/ayurveda-guide/preventive-vs-curative"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${location.pathname === "/ayurveda-guide/preventive-vs-curative" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsGuideOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    PREVENTIVE VS CURATIVE APPROACH
                  </Link>
                  <Link
                    to="/ayurveda-guide/what-is-panchakarma"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${location.pathname === "/ayurveda-guide/what-is-panchakarma" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsGuideOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    WHAT IS PANCHAKARMA
                  </Link>
                  <Link
                    to="/ayurveda-guide/what-ayurveda-can-and-cannot-cure"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${location.pathname === "/ayurveda-guide/what-ayurveda-can-and-cannot-cure" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsGuideOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    WHAT AYURVEDA CAN CURE AND CANNOT CURE
                  </Link>
                  <Link
                    to="/ayurveda-guide/myths-about-ayurveda"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${location.pathname === "/ayurveda-guide/myths-about-ayurveda" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsGuideOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    MYTHS ABOUT AYURVEDA
                  </Link>
                  <Link
                    to="/ayurveda-guide/ayurveda-vs-wellness"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${location.pathname === "/ayurveda-guide/ayurveda-vs-wellness" ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsGuideOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    AYURVEDA VS WELLNESS
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation"
                onClick={() => setIsServicesOpen((prev) => !prev)}
              >
                <span>SERVICES</span>
                <span className="text-xs">
                  {isServicesOpen ? "▲" : "▼"}
                </span>
              </button>
              {isServicesOpen && (
                <div className="ml-4 mt-1 space-y-0">
                  <Link
                    to="/vouchers"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/vouchers") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsServicesOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    VOUCHERS
                  </Link>
                  <Link
                    to="/contact"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/contact") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsServicesOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    BOOKING AND CONTACT
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation"
                onClick={() => setIsRetreatsOpen((prev) => !prev)}
              >
                <span>AYURVEDA RETREATS</span>
                <span className="text-xs">
                  {isRetreatsOpen ? "▲" : "▼"}
                </span>
              </button>
              {isRetreatsOpen && (
                <div className="ml-4 mt-1 space-y-0">
                  <div className="py-2 px-1 text-white/90 text-sm font-semibold">INDIVIDUAL STAYS</div>
                  {stayCountries.map((country) => (
                    <Link
                      key={`mobile-individual-${country.slug}`}
                      to={`/individual-stays/${country.slug}`}
                      className={`block py-2 px-5 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive(`/individual-stays/${country.slug}`) ? "opacity-90" : "hover:opacity-80"
                        }`}
                      onClick={() => {
                        setIsRetreatsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {country.label}
                    </Link>
                  ))}
                  <div className="py-2 px-1 text-white/90 text-sm font-semibold border-t border-white/10 mt-2">GROUP STAYS</div>
                  {stayCountries.map((country) => (
                    <Link
                      key={`mobile-group-${country.slug}`}
                      to={`/group-stays/${country.slug}`}
                      className={`block py-2 px-5 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive(`/group-stays/${country.slug}`) ? "opacity-90" : "hover:opacity-80"
                        }`}
                      onClick={() => {
                        setIsRetreatsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {country.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation"
                onClick={() => setIsWellnessOpen((prev) => !prev)}
              >
                <span>WELLNESS & SPIRITUALITY</span>
                <span className="text-xs">
                  {isWellnessOpen ? "▲" : "▼"}
                </span>
              </button>
              {isWellnessOpen && (
                <div className="ml-4 mt-1 space-y-0">
                  <Link
                    to="/sri-lanka"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/sri-lanka") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsWellnessOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    SRI LANKA
                  </Link>
                  <Link
                    to="/india"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/india") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsWellnessOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    INDIA
                  </Link>
                  <Link
                    to="/thailand"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/thailand") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsWellnessOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    THAILAND
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/"
              className={`block py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation ${isActive("/insights") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BLOG & INSIGHTS
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translate(-50%, -6px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
          transform: translateX(-50%);
        }
      `}</style>
    </nav>
  );
}

