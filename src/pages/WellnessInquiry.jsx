import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchHotelById, submitInquiry } from "../lib/wellnessApi";

const inputClass =
  "w-full border border-[#E0D4C8] rounded-md px-3 py-2.5 text-sm text-[#181818] bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#888]";
const labelClass = "block text-sm font-medium text-[#181818] mb-1.5";

function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function getPrimaryImage(images) {
  if (!images) return null;
  if (typeof images === "string") return images;
  if (Array.isArray(images) && images.length > 0) {
    const sorted = [...images].sort((a, b) => (b?.is_primary ? 1 : 0) - (a?.is_primary ? 1 : 0));
    const first = sorted[0];
    return typeof first === "string" ? first : first?.url;
  }
  return images?.url ?? null;
}

export default function WellnessInquiry() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state || {};

  const [hotel, setHotel] = useState(null);
  const [hotelLoading, setHotelLoading] = useState(true);

  const [gender, setGender] = useState(booking.gender || "female");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [comment, setComment] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const dateFrom = booking.dateFrom || "";
  const dateTo = booking.dateTo || "";
  const roomType = booking.roomType || "Double";
  const people = booking.people ?? 2;
  const extras = booking.extras || "Insurance, Service per person";
  const totalPrice = booking.totalPrice || "";

  const nights =
    dateFrom && dateTo
      ? Math.max(0, Math.ceil((new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24)))
      : 8;
  const dateRange =
    dateFrom && dateTo
      ? `${formatDate(dateFrom)} - ${formatDate(dateTo)}`
      : "12, Sep, 2025 - 20, Sep, 2025";

  useEffect(() => {
    if (!id) { setHotelLoading(false); return; }
    fetchHotelById(id)
      .then(setHotel)
      .catch(() => setHotel(null))
      .finally(() => setHotelLoading(false));
  }, [id]);

  const handleSendInquiry = async () => {
    if (!fullName || !email || !country || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      await submitInquiry({
        booking,
        personal: { gender, fullName, email, country, mobile, comment },
        hotelName: hotel?.name ?? "",
      });
      setShowSuccessPopup(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (hotelLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF7]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 pt-[10%] text-center">
          <p className="text-[#181818] animate-pulse" style={{ fontFamily: "Lato, sans-serif" }}>Loading retreat…</p>
        </main>
      </div>
    );
  }

  const hotelImage = getPrimaryImage(hotel?.images);
  const displayPrice = totalPrice || hotel?.price || "";

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-[10%] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1px,1fr] gap-6 md:gap-8 lg:gap-12">
          {/* Left – Wellness inquiry form */}
          <div className="bg-[#FFFBF7] rounded-xl p-6 sm:p-8 shadow-sm">
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
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>Full Name*</label>
                <input type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} style={{ fontFamily: "Lato, sans-serif" }} />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>Email*</label>
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} style={{ fontFamily: "Lato, sans-serif" }} />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>Country*</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} style={{ fontFamily: "Lato, sans-serif" }}>
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
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>Mobile Number*</label>
                <input type="tel" placeholder="Enter mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} className={inputClass} style={{ fontFamily: "Lato, sans-serif" }} />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>Comment</label>
                <textarea placeholder="Enter comment..." value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className={inputClass + " resize-y"} style={{ fontFamily: "Lato, sans-serif" }} />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendInquiry}
              disabled={loading}
              className="mt-8 w-full sm:w-auto px-8 py-3 rounded-md bg-[#5E17EB] text-white text-sm font-medium tracking-wide uppercase hover:bg-[#4B12BD] transition-colors"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              {loading ? "Sending..." : "Send inquiry"}
            </button>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-[#E0D4C8]" aria-hidden="true" />

          {/* Right – Retreat summary card */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E0D4C8]/30">
              <img
                src={hotelImage || "/hotel.png"}
                alt={hotel?.name || "Retreat"}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-[#181818] mb-1" style={{ fontFamily: "Sentient, serif" }}>
                  {hotel?.name || "Ayurvedic Retreat"}
                </h2>
                <p className="text-sm text-[#555] mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
                  {hotel?.location || ""}
                </p>
                <ul className="text-sm text-[#181818] space-y-1.5 mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
                  <li>{nights} days ({dateRange})</li>
                  <li>{people} people, {roomType.toLowerCase()} room</li>
                  {extras && <li>{extras}</li>}
                </ul>
                {displayPrice && (
                  <div className="flex items-center justify-between pt-3 border-t border-[#E0D4C8]">
                    <span className="text-sm font-medium text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>Total Price</span>
                    <span className="text-lg font-semibold text-[#5E17EB]" style={{ fontFamily: "Sentient, serif" }}>{displayPrice}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setShowSuccessPopup(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-popup-title"
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-[#5E17EB] via-[#E91E63] to-[#FFB300]" />

            {/* Decorative floating dots */}
            <span className="absolute top-8 left-8 w-3 h-3 rounded-full bg-[#FFB300] opacity-70" />
            <span className="absolute top-16 right-10 w-2 h-2 rounded-full bg-[#E91E63] opacity-70" />
            <span className="absolute top-24 left-16 w-2.5 h-2.5 rounded-full bg-[#5E17EB] opacity-70" />
            <span className="absolute bottom-24 right-6 w-2 h-2 rounded-full bg-[#FFB300] opacity-60" />
            <span className="absolute bottom-12 left-10 w-3 h-3 rounded-full bg-[#5E17EB] opacity-50" />
            <span className="absolute bottom-32 right-16 w-2 h-2 rounded-full bg-[#E91E63] opacity-60" />

            {/* Close X */}
            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-[#F4F4F4] text-[#181818] flex items-center justify-center transition-colors shadow-sm z-10"
              aria-label="Close"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>

            <div className="px-8 sm:px-10 pt-10 pb-8 text-center relative">
              {/* Logo */}
              <img
                src="/Raya_logo_new.png"
                alt="RAYA Longlife"
                className="h-12 sm:h-14 w-auto mx-auto mb-6"
              />

              {/* Animated check icon */}
              <div className="relative mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#5E17EB] via-[#7B3FF2] to-[#E91E63] flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5E17EB] via-[#7B3FF2] to-[#E91E63] animate-ping opacity-25" />
                <svg className="relative w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 id="success-popup-title" className="mb-4" style={{ fontFamily: "Sentient, serif" }}>
                <span className="block text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-[#5E17EB] via-[#9333EA] to-[#E91E63] bg-clip-text text-transparent">
                  Thank you{fullName ? `, ${fullName.split(" ")[0]}` : ""}!
                </span>
                <span className="block text-lg sm:text-xl font-normal mt-2 text-[#181818]" style={{ fontStyle: "italic" }}>
                  for your inquiry
                </span>
              </h2>

              <div
                className="space-y-3 mb-7 text-sm sm:text-base text-[#3a3a3a] leading-relaxed"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                <p>
                  Congratulations, you&apos;ve taken the first step toward your Ayurvedic wellness journey.
                  Our team is already preparing a{" "}
                  <span className="font-semibold text-[#5E17EB]">personalized retreat offer</span> based on your wishes.
                </p>
                <p className="text-[#666] text-sm">
                  You will usually receive your customized offer within <strong className="text-[#181818]">2 to 6 hours</strong>.
                  {email && (
                    <>
                      <br />
                      A confirmation has been sent to{" "}
                      <span className="font-semibold text-[#181818]">{email}</span>.
                    </>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => { setShowSuccessPopup(false); navigate("/individual-stays"); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#5E17EB] to-[#E91E63] text-white text-sm font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                CONTINUE
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
