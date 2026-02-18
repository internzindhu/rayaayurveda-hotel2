import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This is a demo - no backend connected)");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main content - white background */}
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero headline - centered */}
          <div className="text-center mb-14 sm:mb-16">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-normal tracking-tight mb-2"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              LET&apos;S BEGIN YOUR JOURNEY
            </h1>
            <p
              className="text-2xl sm:text-3xl md:text-4xl text-[#5E17EB] italic"
              style={{ fontFamily: "Sentient, serif" }}
            >
              to wellness together.
            </p>
          </div>

          {/* Two columns: contact info (left) + form (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column - Contact information */}
            <div className="space-y-8">
              {/* Working Hours */}
              <div>
                <h3
                  className="text-[#181818] font-bold text-base sm:text-lg mb-2"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Working Hours
                </h3>
                <p
                  className="text-[#181818] text-sm sm:text-base mb-3 leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  We&apos;re here to welcome you and assist with all your inquiries during the
                  following hours:
                </p>
                <p
                  className="text-[#181818] text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Monday – Friday: 8:30 AM – 5:00 PM
                  <br />
                  Saturday – Sunday: 9:00 AM – 12:00 PM
                </p>
              </div>

              {/* General Enquiries */}
              <div>
                <h3
                  className="text-[#181818] font-bold text-base sm:text-lg mb-2"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  General Enquiries
                </h3>
                <p
                  className="text-[#181818] text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  rayalonglife@gmail.com
                  <br />
                  +94 71 366 7946
                </p>
              </div>

              {/* Customer support */}
              <div>
                <h3
                  className="text-[#181818] font-bold text-base sm:text-lg mb-2"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Customer support
                </h3>
                <p
                  className="text-[#181818] text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  rayalonglife@gmail.com
                  <br />
                  +94 71 366 7946
                </p>
              </div>

              {/* Address */}
              <div>
                <h3
                  className="text-[#181818] font-bold text-base sm:text-lg mb-2"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Address
                </h3>
                <p
                  className="text-[#181818] text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Raya Longlife, Suite 5, Enterprise House, Moorgate Point, Moorgate Rd, Sri Lanka.
                </p>
              </div>

              {/* Follow Us - icons with purple outline */}
              <div>
                <h3
                  className="text-[#181818] font-bold text-base sm:text-lg mb-4"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  FOLLOW US
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg border-2 border-[#5E17EB] bg-white flex items-center justify-center text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm0 5.108a3.375 3.375 0 100 6.75 3.375 3.375 0 000-6.75zM12.315 14a5.625 5.625 0 11.000-11.25 5.625 5.625 0 010 11.25z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg border-2 border-[#5E17EB] bg-white flex items-center justify-center text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column - Contact form */}
            <div className="bg-white">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#181818] font-bold text-sm mb-1.5"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Full Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-[#181818] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    style={{ fontFamily: "Lato, sans-serif" }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#181818] font-bold text-sm mb-1.5"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-[#181818] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    style={{ fontFamily: "Lato, sans-serif" }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[#181818] font-bold text-sm mb-1.5"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Contact Number*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+ 94 XX XXX XXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-[#181818] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    style={{ fontFamily: "Lato, sans-serif" }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[#181818] font-bold text-sm mb-1.5"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Subject*
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter Subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-[#181818] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    style={{ fontFamily: "Lato, sans-serif" }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#181818] font-bold text-sm mb-1.5"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    placeholder="Enter message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-[#181818] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent resize-y"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="px-10 py-3 rounded-md border-2 border-[#5E17EB] bg-white text-[#5E17EB] font-bold text-sm uppercase tracking-wider hover:bg-[#5E17EB] hover:text-white transition-colors"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
