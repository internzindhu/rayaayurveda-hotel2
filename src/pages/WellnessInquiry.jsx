import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { HOTELS } from "../data/hotels";

const inputClass =
  "w-full border border-[#E0D4C8] rounded-md px-3 py-2.5 text-sm text-[#181818] bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#888]";
const labelClass = "block text-sm font-medium text-[#181818] mb-1.5";

function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function WellnessInquiry() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state || {};
  const hotelId = Number(id) || 1;
  const hotel = HOTELS.find((h) => h.id === hotelId) ?? HOTELS[0];

  const [gender, setGender] = useState(booking.gender || "female");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [comment, setComment] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const dateFrom = booking.dateFrom || "";
  const dateTo = booking.dateTo || "";
  const roomType = booking.roomType || "Double";
  const people = booking.people ?? 2;
  const extras = booking.extras || "Insurance, Service per person";
  const totalPrice = booking.totalPrice || hotel.price || "470€";

  const nights =
    dateFrom && dateTo
      ? Math.max(0, Math.ceil((new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24)))
      : 8;
  const dateRange =
    dateFrom && dateTo
      ? `${formatDate(dateFrom)} - ${formatDate(dateTo)}`
      : "12, Sep, 2025 - 20, Sep, 2025";

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-[10%] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1px,1fr] gap-10 lg:gap-12">
          {/* Left – Wellness inquiry form */}
          <div className="bg-[#FFFBF7] rounded-xl p-6 sm:p-8 shadow-sm">
            {/* Intro box (matches reference) */}
            <div className="bg-[#F4F4F4] rounded-md p-6 sm:p-7 mb-10">
              <h1
                className="text-2xl sm:text-3xl font-normal text-[#181818] mb-2"
                style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
              >
                Send us your wellness inquiry.
              </h1>
              <p
                className="text-sm text-[#555] leading-relaxed"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Please share your wishes with us, and our team will design a personalized Ayurvedic
                retreat just for you. Your inquiry is completely non-binding, and we will be delighted
                to assist you in creating the perfect healing experience.
              </p>
            </div>

            <h2
              className="text-sm font-semibold text-[#181818] mb-4 uppercase tracking-wide"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Personal Data
            </h2>
            <div className="flex flex-wrap gap-6 mb-6">
              {[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "prefer-not", label: "Prefer not to say" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={opt.value}
                    checked={gender === opt.value}
                    onChange={() => setGender(opt.value)}
                    className="w-4 h-4 text-[#5E17EB] border-[#E0D4C8] focus:ring-[#5E17EB]"
                  />
                  <span className="text-sm text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                  Full Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                  style={{ fontFamily: "Lato, sans-serif" }}
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  style={{ fontFamily: "Lato, sans-serif" }}
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                  Country*
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={inputClass}
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  <option value="">Select</option>
                  <option value="AT">Austria</option>
                  <option value="DE">Germany</option>
                  <option value="CH">Switzerland</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="IN">India</option>
                  <option value="LK">Sri Lanka</option>
                </select>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={inputClass}
                  style={{ fontFamily: "Lato, sans-serif" }}
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                  Comment
                </label>
                <textarea
                  placeholder="Enter comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className={inputClass + " resize-y"}
                  style={{ fontFamily: "Lato, sans-serif" }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccessPopup(true)}
              className="mt-8 w-full sm:w-auto px-8 py-3 rounded-md bg-[#5E17EB] text-white text-sm font-medium tracking-wide uppercase hover:bg-[#4B12BD] transition-colors"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Send inquiry
            </button>
          </div>

          {/* Divider (only on large screens) */}
          <div className="hidden lg:block w-px bg-[#E0D4C8]" aria-hidden="true" />

          {/* Right – Retreat summary card */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E0D4C8]/30">
              <img
                src={hotel.mainImage}
                alt={hotel.name}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-5 sm:p-6">
                <h2
                  className="text-lg font-semibold text-[#181818] mb-1"
                  style={{ fontFamily: "Sentient, serif" }}
                >
                  {hotel.name}
                </h2>
                <p
                  className="text-sm text-[#555] mb-4"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.location}
                </p>
                <ul
                  className="text-sm text-[#181818] space-y-1.5 mb-4"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  <li>{nights} days ({dateRange})</li>
                  <li>
                    {people} people, {roomType.toLowerCase()} room, business
                  </li>
                  <li>{extras}</li>
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-[#E0D4C8]">
                  <span
                    className="text-sm font-medium text-[#181818]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Total Price
                  </span>
                  <span
                    className="text-lg font-semibold text-[#5E17EB]"
                    style={{ fontFamily: "Sentient, serif" }}
                  >
                    {totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success popup */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSuccessPopup(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-popup-title"
        >
          <div
            className="bg-[#F4F4F4] rounded-2xl shadow-xl max-w-lg w-full p-8 sm:p-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="success-popup-title"
              className="mb-6"
              style={{ fontFamily: "Sentient, serif" }}
            >
              <span className="block text-2xl sm:text-3xl font-semibold text-[#181818]">
                Thank you
              </span>
              <span
                className="block text-xl sm:text-2xl font-normal mt-1"
                style={{ fontFamily: "Sentient, serif", fontStyle: "italic", color: "#5E17EB" }}
              >
                for your inquiry!
              </span>
            </h2>
            <div className="space-y-4 mb-8 text-sm text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
              <p>
                Congratulations, you&apos;ve taken the first step toward your Ayurvedic wellness journey. Your satisfaction and well-being are very important to us, and our team is already preparing a personalized retreat offer based on your wishes.
              </p>
              <p>
                Simply sit back and relax while our experts design the perfect package for your individual needs. You will usually receive your customized offer within 2 to 6 hours. In rare cases, it may take a little longer.
              </p>
              <p>
                Would you like to explore a different date or another resort? No problem — simply submit another request, and we&apos;ll be happy to assist.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSuccessPopup(false);
                navigate("/individual-stays");
              }}
              className="text-[#5E17EB] font-medium tracking-wide uppercase text-sm hover:underline inline-flex items-center gap-1"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              CONTINUE →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
