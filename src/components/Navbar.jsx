import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isWellnessOpen, setIsWellnessOpen] = useState(false);
  const [isRetreatsOpen, setIsRetreatsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const servicesDropdownRef = useRef(null);
  const wellnessDropdownRef = useRef(null);
  const retreatsDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);

    function handleClickOutside(event) {
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
    setIsServicesOpen(false);
    setIsWellnessOpen(false);
    setIsRetreatsOpen(false);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

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
          <div className={`hidden lg:grid lg:grid-cols-9 w-full items-center gap-6 lg:gap-12 max-w-[1600px] mx-auto transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`} style={{ fontFamily: 'Lato, sans-serif' }}>

            {/* Column 1 - ABOUT */}
            <div className="flex items-center justify-center">
              <Link
                to="/about"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight ${isActive("/about")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                ABOUT
              </Link>
            </div>

            {/* Column 2 - AYURVEDA GUIDE */}
            <div className="flex items-center justify-center">
              <Link
                to="/"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight ${isActive("/guide")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                AYURVEDA<br />GUIDE
              </Link>
            </div>

            {/* Column 3 - AYURVEDA RETREATS */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={retreatsDropdownRef}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isRetreatsActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                  onClick={() => setIsRetreatsOpen((prev) => !prev)}
                >
                  <span>AYURVEDA<br />RETREATS</span>
                  <span className="text-xs">
                    {isRetreatsOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isRetreatsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
                    <Link
                      to="/individual-stays"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsRetreatsOpen(false)}
                    >
                      INDIVIDUAL STAYS
                    </Link>
                    <Link
                      to="/group-stays"
                      className="block px-4 py-2.5 text-sm text-white hover:bg-[#411695] transition-colors duration-150 cursor-pointer"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                      onClick={() => setIsRetreatsOpen(false)}
                    >
                      GROUP STAYS
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Column 4 - WELLNESS & SPIRITUALITY */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={wellnessDropdownRef}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isWellnessActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                  onClick={() => setIsWellnessOpen((prev) => !prev)}
                >
                  <span>WELLNESS &<br />SPIRITUALITY</span>
                  <span className="text-xs">
                    {isWellnessOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isWellnessOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
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

            {/* Column 5 - Centered Logo */}
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

            {/* Column 6 - SERVICES (Dropdown) */}
            <div className="flex items-center justify-center">
              <div
                className="relative z-[60]"
                ref={servicesDropdownRef}
              >
                <button
                  type="button"
                  className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white uppercase text-sm text-center leading-tight flex items-center gap-1 cursor-pointer ${isServicesActive
                    ? "opacity-90"
                    : "hover:opacity-80"
                    }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                >
                  SERVICES
                  <span className="text-xs">
                    {isServicesOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isServicesOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-[#5E17EB] shadow-lg ring-1 ring-[#5E17EB]/20 py-2 animate-dropdown z-[60]">
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

            {/* Column 7 - BLOG & INSIGHTS */}
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
            <Link
              to="/about"
              className={`block py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation ${isActive("/about") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
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
            <Link
              to="/"
              className={`block py-3 px-1 text-white font-medium transition-colors duration-200 uppercase text-sm cursor-pointer touch-manipulation ${isActive("/guide") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AYURVEDA GUIDE
            </Link>
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
                  <Link
                    to="/individual-stays"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/individual-stays") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsRetreatsOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    INDIVIDUAL STAYS
                  </Link>
                  <Link
                    to="/group-stays"
                    className={`block py-3 px-1 text-white/90 text-sm cursor-pointer touch-manipulation ${isActive("/group-stays") ? "opacity-90" : "hover:opacity-80"
                      }`}
                    onClick={() => {
                      setIsRetreatsOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    GROUP STAYS
                  </Link>
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

