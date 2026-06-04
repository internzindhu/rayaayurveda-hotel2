import { useState } from "react";
import { Link } from "react-router-dom";

const navSections = [
  {
    heading: "About",
    headingTo: "/about",
    links: [
      { label: "Our Story", to: "/about#our-story" },
      { label: "Why Travel With Us", to: "/about#why-travel-with-us" },
      { label: "How It Works", to: "/about#how-it-works" },
    ],
  },
  {
    heading: "Ayurveda Retreats",
    links: [
      { label: "Individual Stays", to: "/individual-stays" },
      { label: "Group Stays", to: "/group-stays" },
    ],
  },
  {
    heading: "Wellness & Spirituality",
    links: [
      { label: "Sri Lanka", to: "/individual-stays/sri-lanka" },
    ],
  },
  {
    heading: "Ayurveda Guide",
    headingTo: "/ayurveda-guide",
    links: [
      { label: "What Is Ayurveda", to: "/ayurveda-guide#what-is-ayurveda" },
      { label: "Vata, Pitta & Kapha", to: "/ayurveda-guide#doshas" },
      { label: "Preventive & Curative", to: "/ayurveda-guide#preventive-curative" },
      { label: "Panchakarma", to: "/ayurveda-guide#panchakarma" },
      { label: "Conditions & Cures", to: "/ayurveda-guide#conditions" },
      { label: "Myths About Ayurveda", to: "/ayurveda-guide#myths" },
    ],
  },
  {
    heading: "Blog & Insights",
    links: [
      { label: "Blog", to: "/blogs" },
      { label: "FAQ", to: "/faq" },
      { label: "Newsletter", to: "/newsletter" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Vouchers", to: "/vouchers" },
      { label: "Booking & Contact", to: "/consultation" },
      { label: "Policy", to: "/policy" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ backgroundColor: "#5E17EB" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">

        {/* Nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-7 mb-7">
          {navSections.map(({ heading, headingTo, links }) => (
            <div key={heading}>
              {headingTo ? (
                <Link
                  to={headingTo}
                  className="text-white hover:text-white/70 transition-colors duration-200 text-[10px] uppercase tracking-[0.15em] mb-2 block font-semibold"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {heading}
                </Link>
              ) : (
                <p
                  className="text-white/60 text-[10px] uppercase tracking-[0.15em] mb-2 font-semibold"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {heading}
                </p>
              )}
              <nav className="flex flex-col space-y-1.5">
                {links.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-white/80 hover:text-white transition-colors duration-200 text-xs font-light"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Contact + social */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <a href="tel:+94744135359" className="hover:text-white/70 transition-colors text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                +94 74 413 5359
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:hello@rayalonglife.com" className="hover:text-white/70 transition-colors text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                hello@rayalonglife.com
              </a>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className="text-xs leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                No. 37, 33 Bullers Ln, Colombo 00700
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-white hover:text-white/70 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="text-white hover:text-white/70 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <span className="text-white/60 text-[10px] uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif" }}>
                Follow Us
              </span>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-start">
            <Link to="/">
              <img
                src="/Raya_logo_new.png"
                alt="Raya Longlife Logo"
                className="h-auto w-28 sm:w-32 hover:opacity-80 transition-opacity duration-300"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
          </div>

          {/* Newsletter */}
          <div className="space-y-2">
            <p className="text-sm text-right" style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}>
              Receive Raya news and exclusive updates
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Add e-mail"
                className="flex-1 bg-transparent border border-white/50 text-white placeholder-white/60 text-xs px-3 py-2 rounded focus:outline-none focus:border-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              <button
                className="bg-transparent border border-white text-white text-xs px-4 py-2 rounded hover:bg-white hover:text-[#5E17EB] transition-colors duration-200 font-semibold tracking-wider"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                JOIN
              </button>
            </div>
            <p className="text-white/50 text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
              By continuing, you agree to our{" "}
              <Link to="/policy" className="underline hover:text-white/70">terms and conditions</Link>
              {" "}and{" "}
              <Link to="/policy" className="underline hover:text-white/70">privacy policy</Link>.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
