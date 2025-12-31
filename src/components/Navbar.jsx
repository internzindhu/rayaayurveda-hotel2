import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isRetreatsOpen, setIsRetreatsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const companyDropdownRef = useRef(null);
  const retreatsDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);

    function handleClickOutside(event) {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setIsCompanyOpen(false);
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
        // Scrolling down - hide navbar
        setIsVisible(false);
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
    setIsCompanyOpen(false);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`w-full bg-[#5E17EB] fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${!isAtTop ? 'backdrop-blur-sm' : ''}`}>
      <div className="relative">
        <div className="relative z-10 h-16 sm:h-20 md:h-[93px] px-4 sm:px-6  pt-8 flex items-center">

          {/* Desktop Navigation - Nine Column Grid */}
          <div className={`hidden lg:grid lg:grid-cols-7 w-full items-center gap-4 lg:gap-8 max-w-[1600px] mx-auto transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`} style={{ fontFamily: 'Lato, sans-serif' }}>

            {/* Column 1 - ABOUT */}
            <div className="flex items-center justify-center">
              <Link
                to="/about"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white whitespace-nowrap uppercase text-sm ${isActive("/about")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                ABOUT
              </Link>
            </div>

            {/* Column 2 - RETREATS */}
            <div className="flex items-center justify-center">
              <Link
                to="/treatments"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white whitespace-nowrap uppercase text-sm ${isActive("/treatments")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                RETREATS
              </Link>
            </div>
            {/* <div></div> */}

            {/* Column 3 - DOCTORS & THERAPISTS */}
            <div className="flex items-center justify-center">
              <Link
                to="/consultation"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white whitespace-nowrap uppercase text-sm ${isActive("/consultation")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                DOCTORS & THERAPISTS
              </Link>
            </div>

            {/* Column 4 - Spacing */}
            {/* <div></div> */}

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

            {/* Column 6 - Spacing */}
            <div> 
              <Link
                to="/"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white whitespace-nowrap uppercase text-sm ${isActive("/")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Vouchers
              </Link>
            </div>

            {/* Column 7 - BOOKING & CONTACT */}
            <div className="flex items-center justify-center">
              <Link
                to="/contact"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white whitespace-nowrap uppercase text-sm ${isActive("/contact")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                BOOKING & CONTACT
              </Link>
            </div>

            {/* Column 8 - BLOG */}
            <div className="flex items-center justify-center">
              <Link
                to="/blogs"
                className={`font-medium tracking-wide transition-all duration-300 ease-in-out text-white whitespace-nowrap uppercase text-sm ${isActive("/blogs")
                  ? "opacity-90"
                  : "hover:opacity-80"
                  }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                BLOG
              </Link>
            </div>

            {/* Column 9 - Spacing */}
            <div></div>
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
        <div className="lg:hidden bg-[#181818] border-t border-white/10" style={{ fontFamily: 'Lato, sans-serif' }}>
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/about"
              className={`block py-2 text-white font-medium transition-colors duration-200 uppercase text-sm ${isActive("/about") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              to="/treatments"
              className={`block py-2 text-white font-medium transition-colors duration-200 uppercase text-sm ${isActive("/treatments") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              RETREATS
            </Link>
            <Link
              to="/consultation"
              className={`block py-2 text-white font-medium transition-colors duration-200 uppercase text-sm ${isActive("/consultation") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              DOCTORS & THERAPISTS
            </Link>
            <Link
              to="/contact"
              className={`block py-2 text-white font-medium transition-colors duration-200 uppercase text-sm ${isActive("/contact") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BOOKING & CONTACT
            </Link>
            <Link
              to="/blogs"
              className={`block py-2 text-white font-medium transition-colors duration-200 uppercase text-sm ${isActive("/blogs") ? "opacity-90" : "hover:opacity-80"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BLOG
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}

