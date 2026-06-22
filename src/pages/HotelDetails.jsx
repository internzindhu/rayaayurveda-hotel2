import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import { fetchHotelById, fetchRelatedHotels, submitInquiry } from "../lib/wellnessApi";

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function na(value) {
  if (value == null || value === "") return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return value;
}

function extractItems(arr, key) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  return arr
    .map((row) => ({
      name: row[key]?.name ?? null,
      description: row[key]?.description ?? null,
    }))
    .filter((item) => item.name);
}

function extractNames(arr, key) {
  return extractItems(arr, key).map((i) => i.name);
}

function parseRaw(str) {
  if (!str || typeof str !== "string") return [];
  return str.split(",").map((s) => s.trim()).filter(Boolean).map((name) => ({ name, description: null }));
}

function getItems(arr, key, rawStr) {
  const structured = extractItems(arr, key);
  return structured.length > 0 ? structured : parseRaw(rawStr);
}

function getNames(arr, key, rawStr) {
  const structured = extractNames(arr, key);
  return structured.length > 0 ? structured : parseRaw(rawStr).map((i) => i.name);
}

/* ─── Small UI pieces ──────────────────────────────────────────────────────── */

function SectionHeading({ children }) {
  return (
    <h3
      className="text-[10px] tracking-[0.22em] text-[#5E17EB] mb-5 uppercase"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      {children}
    </h3>
  );
}

const MOCK_SLIDES = ["/hotel.png", "/hotel.png", "/hotel.png", "/hotel.png"];

function StarRating({ rating }) {
  if (!rating) return null;
  const num = parseFloat(rating);
  if (isNaN(num)) return null;
  const full  = Math.floor(num);
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-1">
      {[...Array(full)].map((_, i) => (
        <span key={`f${i}`} className="text-[#5E17EB] text-base leading-none">★</span>
      ))}
      {[...Array(empty)].map((_, i) => (
        <span key={`e${i}`} className="text-[#D5CFC9] text-base leading-none">★</span>
      ))}
      <span
        className="ml-1.5 text-xs text-[#555]"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {num.toFixed(1)}
      </span>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span
      className="px-3 py-1.5 rounded-full bg-[#F3F0FF] text-xs text-[#5E17EB] whitespace-nowrap"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      {children}
    </span>
  );
}

function Caption({ children }) {
  return (
    <p
      className="text-[10px] text-[#8C8C8C] uppercase tracking-[0.18em] mb-3"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      {children}
    </p>
  );
}

function InfoChip({ label, value }) {
  return (
    <div>
      <Caption>{label}</Caption>
      {value ? (
        <div
          className="inline-block bg-[#F3F0FF] text-[#5E17EB] text-xs px-4 py-2 rounded"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {value}
        </div>
      ) : (
        <Placeholder text="To be added" />
      )}
    </div>
  );
}

function Placeholder({ text }) {
  return (
    <div
      className="inline-block border border-dashed border-[#D5CFC9] text-[#8C8C8C] text-xs italic px-3 py-2 rounded"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      — {text} —
    </div>
  );
}

function PackageBreakdown({ text }) {
  if (!text) return <Placeholder text="Packages to be added" />;
  const packages = text.split("/").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {packages.map((pkg) => (
        <div
          key={pkg}
          className="border border-[#E0DBF5] rounded-xl px-5 py-4"
        >
          <p className="text-sm  text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
            Ayurveda Programme
          </p>
          <p className="text-xs text-[#5E17EB] mt-1" style={{ fontFamily: "Lato, sans-serif" }}>
            {pkg}
          </p>
        </div>
      ))}
    </div>
  );
}

function InclusionsList({ text }) {
  if (!text) return <Placeholder text="Inclusions to be added" />;
  // Group lines: a line starting with ● begins a new item; other lines are continuations
  const items = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("●") || items.length === 0) {
      items.push(line.replace(/^●\s*/, ""));
    } else {
      items[items.length - 1] += " " + line;
    }
  }
  return (
    <div className="bg-[#F3F0FF] rounded-lg px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-[#5E17EB] text-xs mt-0.5 shrink-0 font-bold">+</span>
          <span className="text-xs text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

function GoodToKnowText({ text }) {
  if (!text) return null;
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length <= 1) {
    return (
      <p className="text-xs text-[#181818] leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "Lato, sans-serif" }}>
        {text}
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-xs text-[#181818] leading-relaxed border-l-2 border-[#F0EBE4] pl-3" style={{ fontFamily: "Lato, sans-serif" }}>
          {p}
        </p>
      ))}
    </div>
  );
}

function RoomCategoryRows({ text }) {
  if (!text) return <Placeholder text="Room types to be added" />;
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {lines.map((line) => (
        <div key={line} className="border border-[#E0DBF5] rounded-xl px-5 py-4">
          <p className="text-sm font-bold text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
            {line}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [hotel, setHotel] = useState(null);
  const [otherHotels, setOtherHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Booking form — pre-populate from URL params if coming from listing page
  const [dateFrom, setDateFrom] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("from") ?? "";
  });
  const [dateTo, setDateTo] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("to") ?? "";
  });
  const [roomType, setRoomType] = useState("Double");
  const [people, setPeople] = useState(2);
  const [bookingStatus, setBookingStatus] = useState("");
  const [roomCategory, setRoomCategory] = useState("base");
  const [transportMode, setTransportMode] = useState("");
  const [flightIncluded, setFlightIncluded] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Personal data
  const [gender, setGender] = useState("female");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const single = await fetchHotelById(id);
        setHotel(single ?? null);
        const related = await fetchRelatedHotels(id).catch(() => []);
        setOtherHotels(Array.isArray(related) ? related : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleInquire = async () => {
    if (!hotel) return;
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!dateFrom) errors.dateFrom = "Please select your arrival date.";
    else {
      const arrival = new Date(dateFrom);
      arrival.setHours(0, 0, 0, 0);
      if (arrival < today) errors.dateFrom = "Arrival date cannot be in the past.";
    }
    if (!dateTo) errors.dateTo = "Please select your departure date.";
    else if (dateFrom && dateTo) {
      const nights = Math.round((new Date(dateTo) - new Date(dateFrom)) / 86400000);
      if (nights < 1) errors.dateTo = "Departure must be after arrival.";
      else if (hotel.min_nights && nights < hotel.min_nights) {
        errors.dateTo = `This retreat requires a minimum stay of ${hotel.min_nights} nights.`;
      }
    }
    if (!fullName) errors.fullName = "Full name is required.";
    if (!email) errors.email = "Email is required.";
    if (!country) errors.country = "Country is required.";
    if (!mobile) errors.mobile = "Mobile number is required.";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    try {
      setSubmitting(true);
      await submitInquiry({
        booking: { dateFrom, dateTo, roomType, people, roomCategory, transportMode, flightIncluded, bookingStatus },
        personal: { gender, fullName, email, country, mobile, comment },
        hotelName: hotel.name,
        recipientEmail: "hod@rayalonglife.com",
      });
      setShowSuccessPopup(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Loading / error states ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBF7]">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 pt-32 pb-20 text-center">
          <p className="text-[#181818] animate-pulse" style={{ fontFamily: "Lato, sans-serif" }}>
            Loading retreat…
          </p>
        </main>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-[#FFFBF7]">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 pt-32 pb-20 text-center">
          <p className="text-red-600 mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
            {error || "Retreat not found."}
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[#5E17EB] hover:underline text-sm"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            ← Go back
          </button>
        </main>
      </div>
    );
  }

  /* ── Derived data ── */
  const images = Array.isArray(hotel.images)
    ? [...hotel.images]
        .sort((a, b) => (b?.is_primary ? 1 : 0) - (a?.is_primary ? 1 : 0))
        .map((img) => (typeof img === "string" ? img : img?.url))
        .filter(Boolean)
    : hotel.images
    ? [typeof hotel.images === "string" ? hotel.images : hotel.images?.url]
    : [];

  const facilities     = getNames(hotel.facilities,          "facility",          hotel.facilities_raw);
  const activities     = getItems(hotel.activities,          "activity",          hotel.activities_raw);
  const mealPlans      = getItems(hotel.meal_plans,          "meal_plan",         hotel.meal_plan_raw);
  const wellnessItems  = getItems(hotel.wellness_offerings,  "wellness_offering", null);
  const cuisineTypes   = getItems(hotel.cuisine_types,       "cuisine_type",      hotel.cuisine_raw);
  const diningFeatures = getItems(hotel.dining_features,     "dining_feature",    hotel.dining_features_raw);
  const roomFeatures   = getNames(hotel.room_features,       "room_feature",      null);
  const restrictions   = getNames(hotel.restrictions,        "restriction",       hotel.restrictions_raw);

  // Compute the earliest valid departure date based on min_nights
  const earliestDeparture = (() => {
    if (!dateFrom) return new Date().toISOString().slice(0, 10);
    const earliest = new Date(dateFrom);
    earliest.setDate(earliest.getDate() + (hotel.min_nights || 1));
    return earliest.toISOString().slice(0, 10);
  })();

  // Best price for the selected arrival date, with priority logic.
  // Falls back to lowest base price when no date selected.
  const pricingForMonth = (() => {
    if (!hotel.monthly_prices?.length) return [];
    if (!dateFrom) {
      const sorted = [...hotel.monthly_prices].sort((a, b) => Number(a.price) - Number(b.price));
      return [sorted[0]];
    }
    const arrival = new Date(dateFrom);
    const candidates = hotel.monthly_prices.filter(
      (mp) => new Date(mp.valid_from) <= arrival && arrival <= new Date(mp.valid_to)
    );
    if (!candidates.length) return [];
    const best = candidates.sort((a, b) => {
      const pd = (b.priority ?? 0) - (a.priority ?? 0);
      if (pd !== 0) return pd;
      return (new Date(a.valid_to) - new Date(a.valid_from)) - (new Date(b.valid_to) - new Date(b.valid_from));
    })[0];
    return [best];
  })();

  const propertyType =
    hotel.property_types?.length > 0
      ? hotel.property_types
          .map((pt) => pt?.property_type?.name ?? pt?.name ?? null)
          .filter(Boolean)
          .join(", ") || null
      : na(hotel.property_type_raw) ?? na(hotel.property_type);

  const uniqueFeatures = na(hotel.unique_features);

  const medicalValue =
    hotel.medical_report_support === "yes" || hotel.medical_report_support === true ? "Yes"
    : hotel.medical_report_support === "no" || hotel.medical_report_support === false ? "No"
    : null;

  const kidFriendlyValue =
    hotel.kid_friendly === true ? "Yes" : hotel.kid_friendly === false ? "No" : null;

  /* ── Render ── */
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      {/* ── Hero Slider ── */}
      {(() => {
        const slides = images.length > 0 ? images : MOCK_SLIDES;
        const n = slides.length;
        const prev = () => setCurrentSlide((i) => (i - 1 + n) % n);
        const next = () => setCurrentSlide((i) => (i + 1) % n);
        const idx1 = (currentSlide + 1) % n;
        const idx2 = (currentSlide + 2) % n;

        return (
          <div className="bg-[#F5F1EC] pt-28 pb-0 px-4 sm:px-8">
            <SEO
              title={hotel.name}
              description={
                hotel.description
                  ? hotel.description.slice(0, 155)
                  : `Book an authentic Ayurveda and wellness retreat at ${hotel.name}. Discover healing programmes, treatments, and packages with Raya LongLife.`
              }
              url={`/book-hotel/${id}`}
            />
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 cursor-pointer text-[10px] tracking-[0.22em] uppercase text-[#8C8C8C] hover:text-[#181818] transition-colors inline-flex items-center gap-2"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              <span>←</span>
              <span>Back to retreats</span>
            </button>

            <div className="relative mx-auto flex flex-col md:block w-full md:w-[70%] md:h-[420px]">

              {/* ── Left info card ── */}
              <div
                className="order-2 bg-white flex flex-col justify-center px-6 py-8 z-10 w-full md:absolute md:w-[300px] md:left-0 md:top-1/2 md:-translate-y-1/2 md:px-8 md:py-10"
                style={{ boxShadow: "4px 0 32px 0 rgba(0,0,0,0.10)" }}
              >
                <h1
                  className="text-2xl sm:text-3xl text-[#181818] leading-snug mb-4"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 300 }}
                >
                  {hotel.name}
                </h1>

                {na(hotel.price) && (
                  <p className="text-xl text-[#5E17EB] mb-3" style={{ fontFamily: "Sentient, serif" }}>
                    {hotel.price}
                  </p>
                )}

                <div className="mb-3">
                  <StarRating rating={hotel.rating} />
                </div>

                {na(hotel.location) && (
                  <p className="text-sm text-[#181818] mb-1" style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}>
                    {hotel.location}
                  </p>
                )}

                {hotel.min_nights && (
                  <p className="text-xs text-[#5E17EB] mb-1" style={{ fontFamily: "Lato, sans-serif" }}>
                    Minimum stay: {hotel.min_nights} nights
                  </p>
                )}

                {na(hotel.slogan_line) && (
                  <p className="text-xs text-[#555] leading-relaxed mb-6" style={{ fontFamily: "Lato, sans-serif" }}>
                    {hotel.slogan_line}
                  </p>
                )}

                {pricingForMonth.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="text-[10px] tracking-[0.18em] uppercase text-[#5E17EB] mb-2"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {dateFrom
                        ? new Date(dateFrom).toLocaleDateString("default", { day: "numeric", month: "long", year: "numeric" })
                        : "Starting from"}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {pricingForMonth.map((mp) => (
                        <div
                          key={mp.id}
                          className="flex justify-between items-center text-xs text-[#333]"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          <span className="capitalize text-[#8C8C8C]">
                            {mp.occupancy || "per night"}
                          </span>
                          <span className="font-medium text-[#181818] ml-3 whitespace-nowrap">
                            {mp.currency} {Number(mp.price).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-5 mt-auto">
                  {na(hotel.google_maps_url) ? (
                    <a
                      href={hotel.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#181818] hover:text-[#5E17EB] transition-colors"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                      </svg>
                      View map
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-xs text-[#181818] hover:text-[#5E17EB] transition-colors"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                      </svg>
                      View map
                    </button>
                  )}
                </div>
              </div>

              {/* ── Center main image ── */}
              <div className="order-1 w-full h-[260px] overflow-hidden md:absolute md:top-0 md:bottom-0 md:h-auto md:left-[200px] md:right-[230px] md:w-auto">
                <img
                  src={slides[currentSlide]}
                  alt={`${hotel.name} – slide ${currentSlide + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>

              {/* ── Right thumbnail strip ── */}
              <div className="hidden md:flex flex-col gap-1 absolute top-0 bottom-0 right-0 overflow-hidden w-[230px]">
                <div className="flex-1 overflow-hidden">
                  <img
                    src={slides[idx1]}
                    alt={`${hotel.name} – preview ${idx1 + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setCurrentSlide(idx1)}
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <img
                    src={slides[idx2]}
                    alt={`${hotel.name} – preview ${idx2 + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setCurrentSlide(idx2)}
                  />
                </div>
              </div>
            </div>

            {/* ── Navigation arrows ── */}
            <div className="flex justify-center md:justify-end gap-3 pt-4 pb-6">
              <button
                type="button"
                onClick={prev}
                className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center border border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors rounded-none text-base"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center border border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors rounded-none text-base"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ════ LEFT — all hotel details ════ */}
          <div className="flex-1 space-y-8 min-w-0">

            {/* 1 ─ About this retreat */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>About this retreat</SectionHeading>
              {na(hotel.description) ? (
                <p
                  className="text-xs text-[#181818] leading-relaxed whitespace-pre-wrap mb-6"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.description}
                </p>
              ) : (
                <div className="mb-6"><Placeholder text="Description to be added" /></div>
              )}
              {uniqueFeatures && (
                <p
                  className="text-xs text-[#181818] leading-relaxed mb-6"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {uniqueFeatures}
                </p>
              )}
              <div className="border-t border-[#F0EBE4] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <InfoChip label="Type of hotel"      value={propertyType} />
                <InfoChip label="Minimum night stay" value={hotel.min_nights ? `${hotel.min_nights} nights` : null} />
                <InfoChip label="Number of rooms"    value={hotel.rooms_count ? `${hotel.rooms_count} rooms` : null} />
                <InfoChip label="Kid friendly"       value={kidFriendlyValue} />
              </div>
              <div className="border-t border-[#F0EBE4] mt-6 pt-6">
                <Caption>Restrictions</Caption>
                {restrictions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {restrictions.map((name) => <Chip key={name}>{name}</Chip>)}
                  </div>
                ) : (
                  <Placeholder text="To be added" />
                )}
              </div>
            </section>

            {/* 2 ─ Ayurveda & Wellness */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Ayurveda &amp; Wellness</SectionHeading>
              {na(hotel.ayurveda_description) ? (
                <p
                  className="text-xs text-[#181818] leading-relaxed whitespace-pre-wrap mb-6"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.ayurveda_description}
                </p>
              ) : (
                <div className="mb-6"><Placeholder text="Ayurveda & wellness description to be added" /></div>
              )}
              <div className="border-t border-[#F0EBE4] pt-6 space-y-6">
                <div>
                  <Caption>Ayurveda / Wellness offering</Caption>
                  {wellnessItems.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {wellnessItems.map((item) => <Chip key={item.name}>{item.name}</Chip>)}
                    </div>
                  ) : (
                    <Placeholder text="To be added" />
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <InfoChip
                    label="Doctor's availability"
                    value={hotel.doctors_available != null ? (hotel.doctors_available ? "Yes" : "No") : null}
                  />
                  <InfoChip label="Assistance with medical reports" value={medicalValue} />
                </div>
                <div>
                  <Caption>Activities &amp; experiences</Caption>
                  {activities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {activities.map((item) => <Chip key={item.name}>{item.name}</Chip>)}
                    </div>
                  ) : (
                    <Placeholder text="To be added" />
                  )}
                </div>
              </div>
            </section>

            {/* 3 ─ Package breakdown */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Package breakdown</SectionHeading>
              <PackageBreakdown text={hotel.package_breakdown} />
            </section>

            {/* 4 ─ What is included */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>What is included in your stay</SectionHeading>
              <InclusionsList text={hotel.inclusions} />
            </section>

            {/* 5 ─ Charged separately */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Charged separately</SectionHeading>
              <Placeholder text="Exclusions to be added" />
            </section>

            {/* 6 ─ Dining */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Dining</SectionHeading>
              {na(hotel.dining_description) ? (
                <p
                  className="text-xs text-[#181818] leading-relaxed whitespace-pre-wrap mb-6"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.dining_description}
                </p>
              ) : (
                <div className="mb-6"><Placeholder text="Dining description to be added" /></div>
              )}
              <div className="border-t border-[#F0EBE4] pt-6 space-y-6">
                <div>
                  <Caption>Ayurveda / Wellness dining features</Caption>
                  {diningFeatures.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {diningFeatures.map((item) => <Chip key={item.name}>{item.name}</Chip>)}
                    </div>
                  ) : (
                    <Placeholder text="To be added" />
                  )}
                </div>
                <div>
                  <Caption>Meal plan</Caption>
                  {mealPlans.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {mealPlans.map((item) => <Chip key={item.name}>{item.name}</Chip>)}
                    </div>
                  ) : (
                    <Placeholder text="To be added" />
                  )}
                </div>
                <div>
                  <Caption>Type of cuisine</Caption>
                  {cuisineTypes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {cuisineTypes.map((item) => <Chip key={item.name}>{item.name}</Chip>)}
                    </div>
                  ) : (
                    <Placeholder text="To be added" />
                  )}
                </div>
              </div>
            </section>

            {/* 7 ─ Accommodation */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Accommodation</SectionHeading>
              {na(hotel.accommodation_description) ? (
                <p
                  className="text-xs text-[#181818] leading-relaxed whitespace-pre-wrap mb-6"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.accommodation_description}
                </p>
              ) : (
                <div className="mb-6"><Placeholder text="Accommodation description to be added" /></div>
              )}
              <div className="border-t border-[#F0EBE4] pt-6 space-y-6">
                <div>
                  <Caption>Room types</Caption>
                  <RoomCategoryRows text={hotel.room_categories} />
                </div>
                <div>
                  <Caption>Room features</Caption>
                  {roomFeatures.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {roomFeatures.map((name) => <Chip key={name}>{name}</Chip>)}
                    </div>
                  ) : (
                    <Placeholder text="To be added" />
                  )}
                </div>
                <InfoChip
                  label="Maximum occupancy per room"
                  value={hotel.max_occupancy ? `${hotel.max_occupancy} guests per room` : null}
                />
              </div>
            </section>

            {/* 8 ─ Facilities */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Facilities</SectionHeading>
              {facilities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {facilities.map((name) => <Chip key={name}>{name}</Chip>)}
                </div>
              ) : (
                <Placeholder text="To be added" />
              )}
            </section>

            {/* 9 ─ Location & Getting There */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Location &amp; getting there</SectionHeading>
              {na(hotel.location) && (
                <p
                  className="text-xs text-[#181818] leading-relaxed mb-4"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.location}
                </p>
              )}
              {na(hotel.location_description) ? (
                <p
                  className="text-xs text-[#181818] leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.location_description}
                </p>
              ) : (
                <>
                  <div className="mb-4"><Placeholder text="Nearest airport, distance & transfer cost to be added" /></div>
                  <Placeholder text="Beach access & sister resort info to be added" />
                </>
              )}
            </section>

            {/* 10 ─ Good to know */}
            <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <SectionHeading>Good to know</SectionHeading>
              {na(hotel.good_to_know) ? (
                <GoodToKnowText text={hotel.good_to_know} />
              ) : (
                <ul
                  className="space-y-3 text-xs text-[#181818]"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.min_nights ? (
                    <li className="flex gap-3">
                      <span className="text-[#5E17EB] mt-0.5">•</span>
                      <span>Minimum stay is {hotel.min_nights} nights.</span>
                    </li>
                  ) : (
                    <li><Placeholder text="Minimum stay note to be added" /></li>
                  )}
                  <li><Placeholder text="Initial consultation note to be added" /></li>
                  <li><Placeholder text="Cancellation policy to be added" /></li>
                  <li><Placeholder text="Check-in / check-out times to be added" /></li>
                </ul>
              )}
            </section>

            {/* Gallery */}
            {images.length > 0 && (
              <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <SectionHeading>Gallery</SectionHeading>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxImg(img)}
                      className="aspect-[4/3] rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                    >
                      <img
                        src={img}
                        alt={`${hotel.name} – photo ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ════ RIGHT — sticky booking form ════ */}
          <div className="w-full lg:w-[540px] lg:sticky lg:top-8 lg:self-start shrink-0">
            <aside className="bg-white border border-[#F0EBE4] rounded-xl p-7 shadow-sm">
              <h2
                className="text-xl text-[#181818] mb-3"
                style={{ fontFamily: "Sentient, serif" }}
              >
                Book Your Stay
              </h2>
              <p
                className="text-xs text-[#8C8C8C] mb-6 leading-relaxed"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Share your travel details below and our Wellness Advisors will assist you in planning your personalised Ayurveda and wellness retreat. Your enquiry is free and non-binding.
              </p>

              {/* Min stay banner */}
              {hotel.min_nights && (
                <div className="bg-[#F3F0FF] rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5E17EB] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-[#5E17EB]" style={{ fontFamily: "Lato, sans-serif" }}>
                    Minimum stay: <span className="font-semibold">{hotel.min_nights} nights</span>
                  </p>
                </div>
              )}

              {/* Booking Status */}
              <div className="mb-5">
                <p className="text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "Lato, sans-serif" }}>Booking Status</p>
                <div className="flex flex-col gap-2">
                  {[
                    { value: "ready", label: "I'm ready to book" },
                    { value: "explore", label: "I'd like to explore my options" },
                    { value: "help", label: "I need help choosing the right retreat" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="bookingStatus"
                        value={opt.value}
                        checked={bookingStatus === opt.value}
                        onChange={() => setBookingStatus(opt.value)}
                        className="w-4 h-4 text-[#5E17EB] border-[#E0D4C8] focus:ring-[#5E17EB]"
                      />
                      <span className="text-xs text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">

                {/* Arrival + Departure dates — side by side */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>
                      Arrival
                    </label>
                    <input
                      type="date"
                      value={dateFrom}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => {
                        setDateFrom(e.target.value);
                        setFormErrors((prev) => ({ ...prev, dateFrom: undefined, dateTo: undefined }));
                        if (dateTo && hotel.min_nights) {
                          const newNights = Math.round((new Date(dateTo) - new Date(e.target.value)) / 86400000);
                          if (newNights < hotel.min_nights) setDateTo("");
                        } else if (dateTo && e.target.value > dateTo) {
                          setDateTo("");
                        }
                      }}
                      className={`w-full border rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] ${formErrors.dateFrom ? "border-red-400" : "border-[#E0D4C8]"}`}
                    />
                    {formErrors.dateFrom && <p className="text-red-500 text-xs mt-1">{formErrors.dateFrom}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>
                      Departure
                    </label>
                    <input
                      type="date"
                      value={dateTo}
                      min={earliestDeparture}
                      onChange={(e) => {
                        setDateTo(e.target.value);
                        setFormErrors((prev) => ({ ...prev, dateTo: undefined }));
                      }}
                      className={`w-full border rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] ${formErrors.dateTo ? "border-red-400" : "border-[#E0D4C8]"}`}
                    />
                    {formErrors.dateTo && <p className="text-red-500 text-xs mt-1">{formErrors.dateTo}</p>}
                  </div>
                </div>

                {/* Room type + Guests — side by side */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Room type</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]" style={{ fontFamily: "Lato, sans-serif" }}>
                      <option>Single</option>
                      <option>Double</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Guests</label>
                    <div className="flex items-center border border-[#E0D4C8] rounded-lg w-full">
                      <button type="button" onClick={() => setPeople((p) => Math.max(1, p - 1))} className="px-3 py-2.5 text-base hover:bg-[#F0EBE4]/50 rounded-l-lg transition-colors leading-none flex-shrink-0">−</button>
                      <span className="flex-1 py-2.5 text-xs border-l border-r border-[#E0D4C8] text-center" style={{ fontFamily: "Lato, sans-serif" }}>{people}</span>
                      <button type="button" onClick={() => setPeople((p) => p + 1)} className="px-3 py-2.5 text-base hover:bg-[#F0EBE4]/50 rounded-r-lg transition-colors leading-none flex-shrink-0">+</button>
                    </div>
                  </div>
                </div>

                {/* Room category + Transport — side by side */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Room Category</label>
                    <select value={roomCategory} onChange={(e) => setRoomCategory(e.target.value)} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]" style={{ fontFamily: "Lato, sans-serif" }}>
                      <option value="base">Base category</option>
                      <option value="higher">Open to look for higher options</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Transport</label>
                    <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]" style={{ fontFamily: "Lato, sans-serif" }}>
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                  </div>
                </div>

                {/* Price display */}
                {pricingForMonth.length > 0 && (
                  <div className="bg-[#F3F0FF] rounded-lg px-4 py-3">
                    <p className="text-xs text-[#5E17EB] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: "Lato, sans-serif" }}>
                      {dateFrom ? "Estimated price" : "Starting from"}
                    </p>
                    {pricingForMonth.map((mp) => (
                      <div key={mp.id} className="flex justify-between items-center text-xs" style={{ fontFamily: "Lato, sans-serif" }}>
                        <span className="text-[#555] capitalize">{mp.occupancy || "per night"}</span>
                        <span className="font-medium text-[#181818]">{mp.currency} {Number(mp.price).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Personal details */}
                <div className="border-t border-[#F0EBE4] pt-4">
                  <p className="text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-4" style={{ fontFamily: "Lato, sans-serif" }}>Personal Details</p>

                  {/* Gender */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {[{ value: "female", label: "Female" }, { value: "male", label: "Male" }, { value: "prefer-not", label: "Other" }].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="gender" value={opt.value} checked={gender === opt.value} onChange={() => setGender(opt.value)} className="w-4 h-4 text-[#5E17EB] border-[#E0D4C8] focus:ring-[#5E17EB]" />
                        <span className="text-xs text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Full Name*</label>
                    <input type="text" placeholder="Enter full name" value={fullName} onChange={(e) => { setFullName(e.target.value); setFormErrors((p) => ({ ...p, fullName: undefined })); }} className={`w-full border rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] ${formErrors.fullName ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }} />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Email*</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value); setFormErrors((p) => ({ ...p, email: undefined })); }} className={`w-full border rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] ${formErrors.email ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }} />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Country */}
                  <div className="mb-3">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Country*</label>
                    <select value={country} onChange={(e) => { setCountry(e.target.value); setFormErrors((p) => ({ ...p, country: undefined })); }} className={`w-full border rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB] ${formErrors.country ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                      <option value="">Select country</option>
                      <option value="AT">Austria</option>
                      <option value="DE">Germany</option>
                      <option value="CH">Switzerland</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="LK">Sri Lanka</option>
                    </select>
                    {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                  </div>

                  {/* Mobile */}
                  <div className="mb-3">
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Mobile*</label>
                    <input type="tel" placeholder="Enter mobile number" value={mobile} onChange={(e) => { setMobile(e.target.value); setFormErrors((p) => ({ ...p, mobile: undefined })); }} className={`w-full border rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] ${formErrors.mobile ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }} />
                    {formErrors.mobile && <p className="text-red-500 text-xs mt-1">{formErrors.mobile}</p>}
                  </div>

                  {/* Remark */}
                  <div>
                    <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Remark</label>
                    <textarea placeholder="Any additional wishes..." value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] resize-y" style={{ fontFamily: "Lato, sans-serif" }} />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleInquire}
                disabled={submitting}
                className="mt-6 w-full py-3.5 bg-[#5E17EB] text-white text-xs tracking-[0.22em] uppercase rounded-lg hover:bg-[#4B12BD] transition-colors disabled:opacity-60"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                {submitting ? "Sending…" : "Send Inquiry →"}
              </button>
            </aside>
          </div>
        </div>

        {/* ── Other retreats ── */}
        {otherHotels.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.22em] text-[#5E17EB] uppercase mb-3" style={{ fontFamily: "Lato, sans-serif" }}>
                Raya Wellbeing
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl text-[#181818]"
                style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 300 }}
              >
                Other retreats
              </h2>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-10 w-px bg-gray-200 -translate-x-1/2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 items-start">
                {otherHotels.map((h, index) => {
                  const imgRaw = h.images;
                  const img = !imgRaw ? null
                    : typeof imgRaw === "string" ? imgRaw
                    : Array.isArray(imgRaw) && imgRaw.length > 0
                      ? (() => { const s = [...imgRaw].sort((a, b) => (b?.is_primary ? 1 : 0) - (a?.is_primary ? 1 : 0))[0]; return typeof s === "string" ? s : s?.url; })()
                    : imgRaw?.url ?? null;
                  return (
                    <div
                      key={h.id}
                      className={`flex flex-col ${index === 1 ? "lg:mt-[60px]" : index === 2 ? "lg:mt-[100px]" : ""}`}
                    >
                      <img
                        src={img || "/hotel.png"}
                        alt={h.name}
                        className="w-full aspect-[4/3] object-cover rounded-lg mb-4"
                      />
                      <h3
                        className="text-xl sm:text-2xl text-[#181818] mb-2"
                        style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                      >
                        {h.name}
                      </h3>
                      {h.slogan_line && (
                        <p className="text-sm text-[#5E17EB] mb-1" style={{ fontFamily: "Lato, sans-serif" }}>
                          {h.slogan_line}
                        </p>
                      )}
                      <p className="text-xs text-[#8C8C8C] mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
                        {h.location}
                      </p>
                      <Link
                        to={`/book-hotel/${h.id}`}
                        className="text-[#5E17EB] hover:underline text-xs tracking-[0.1em] uppercase mt-auto"
                        style={{ fontFamily: "Lato, sans-serif", fontWeight: 500 }}
                      >
                        View Retreat →
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-16">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="cursor-pointer text-[#5E17EB] text-sm tracking-[0.1em] uppercase hover:underline inline-flex items-center gap-2"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  <span>←</span>
                  <span>Back to all retreats</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── Success popup ── */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSuccessPopup(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#F4F4F4] rounded-2xl shadow-xl max-w-lg w-full p-8 sm:p-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6" style={{ fontFamily: "Sentient, serif" }}>
              <span className="block text-2xl sm:text-3xl text-[#181818]">Thank you</span>
              <span className="block text-xl sm:text-2xl mt-1" style={{ fontStyle: "italic", color: "#5E17EB" }}>for your inquiry!</span>
            </h2>
            <div className="space-y-4 mb-8 text-sm text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
              <p>Congratulations, you've taken the first step toward your Ayurvedic wellness journey. Our team is already preparing a personalized retreat offer based on your wishes.</p>
              <p>You will usually receive your customized offer within 2 to 6 hours.</p>
            </div>
            <button
              type="button"
              onClick={() => { setShowSuccessPopup(false); navigate("/individual-stays"); }}
              className="text-[#5E17EB] tracking-wide uppercase text-sm hover:underline inline-flex items-center gap-1"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              CONTINUE →
            </button>
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImg(null)}
            className="absolute top-4 right-5 text-white/70 hover:text-white text-3xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}