import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchHotelById, fetchRelatedHotels } from "../lib/wellnessApi";

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function na(value) {
  if (value == null || value === "") return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return value;
}

// Extract [{name, description}] from a hotel relation array
// e.g. hotel.activities → [{activity_id, activity: {name, description}}]
function extractItems(arr, key) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  return arr
    .map((row) => ({
      name: row[key]?.name ?? null,
      description: row[key]?.description ?? null,
    }))
    .filter((item) => item.name);
}

// Extract just the names
function extractNames(arr, key) {
  return extractItems(arr, key).map((i) => i.name);
}

// Parse a comma-separated raw string into an array of name-only items
function parseRaw(str) {
  if (!str || typeof str !== "string") return [];
  return str.split(",").map((s) => s.trim()).filter(Boolean).map((name) => ({ name, description: null }));
}

// Use structured array if populated, otherwise parse the _raw fallback string
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

// Mock images used when the hotel has no images yet
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

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4 py-3 border-b border-[#F0EBE4] last:border-0">
      <span
        className="text-xs text-[#8C8C8C] min-w-[180px] shrink-0"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {label}
      </span>
      <span className="text-xs text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
        {value}
      </span>
    </div>
  );
}

function ItemList({ items }) {
  if (!items.length) return null;
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border-b border-[#F0EBE4] pb-3 last:border-0 last:pb-0">
          <p className="text-sm text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
            {item.name}
          </p>
          {item.description && (
            <p
              className="text-xs text-[#8C8C8C] mt-0.5 leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function ActivityGrid({ items }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <div key={i} className="border border-[#F0EBE4] rounded-lg p-3">
          <p className="text-sm text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
            {item.name}
          </p>
          {item.description && (
            <p
              className="text-xs text-[#8C8C8C] mt-1 leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function AccordionSection({ id, title, openAccordion, onToggle, children }) {
  const isOpen = openAccordion === id;
  return (
    <div className="border-b border-[#181818]/10 last:border-0">
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
        onClick={() => onToggle(id)}
      >
        <span className="text-sm text-[#181818] pr-6 leading-snug" style={{ fontFamily: "Lato, sans-serif" }}>
          {title}
        </span>
        <span className="flex-shrink-0 text-[#5E17EB]">
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 bg-[#F9F7FF] border-t border-[#EDE8FF]">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [otherHotels, setOtherHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (id) => setOpenAccordion((prev) => (prev === id ? null : id));

  // Booking form
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo] = useState("");
  const [roomType, setRoomType] = useState("Double");
  const [people, setPeople] = useState(2);
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
    const currentMonth = new Date().toISOString().slice(0, 7);
    if (!dateFrom) errors.dateFrom = "Please select a travel month.";
    else if (dateFrom < currentMonth) errors.dateFrom = "Travel month cannot be in the past.";
    if (!fullName) errors.fullName = "Full name is required.";
    if (!email) errors.email = "Email is required.";
    if (!country) errors.country = "Country is required.";
    if (!mobile) errors.mobile = "Mobile number is required.";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    try {
      setSubmitting(true);
      const res = await fetch(
        "https://akeroaymrygpdkasjzov.functions.supabase.co/send-wellness-inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            booking: { dateFrom, dateTo, roomType, people, transportMode, flightIncluded },
            personal: { gender, fullName, email, country, mobile, comment },
            hotelName: hotel.name,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to send inquiry");
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
          <p
            className="text-[#181818] animate-pulse"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
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
          <p
            className="text-red-600 mb-4"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
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

  // Property type: try structured array first, fall back to raw string
  const propertyType =
    hotel.property_types?.length > 0
      ? hotel.property_types.map((pt) => pt?.name ?? pt).join(", ")
      : na(hotel.property_type_raw) ?? na(hotel.property_type);

  // Unique features / highlights (plain text string)
  const uniqueFeatures = na(hotel.unique_features);

  const doctorsValue =
    hotel.doctors_available === "yes" || hotel.doctors_available === true
      ? "Yes"
      : hotel.doctors_available === "no" || hotel.doctors_available === false
      ? "No"
      : null;

  const medicalValue =
    hotel.medical_report_support === "yes" || hotel.medical_report_support === true
      ? "Yes"
      : hotel.medical_report_support === "no" || hotel.medical_report_support === false
      ? "No"
      : null;

  const poolValue =
    hotel.swimming_pool === true ? "Yes" : hotel.swimming_pool === false ? "No" : null;

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
            {/* Back link */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 text-[10px] tracking-[0.22em] uppercase text-[#8C8C8C] hover:text-[#181818] transition-colors inline-flex items-center gap-1.5"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              ← Back to retreats
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
                  <p
                    className="text-xl text-[#5E17EB] mb-3"
                    style={{ fontFamily: "Sentient, serif" }}
                  >
                    {hotel.price}
                  </p>
                )}

                <div className="mb-3">
                  <StarRating rating={hotel.rating} />
                </div>

                {na(hotel.location) && (
                  <p
                    className="text-sm text-[#181818] mb-1"
                    style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                  >
                    {hotel.location}
                  </p>
                )}

                {na(hotel.slogan_line) && (
                  <p
                    className="text-xs text-[#555] leading-relaxed mb-6"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {hotel.slogan_line}
                  </p>
                )}

                <div className="flex items-center gap-5 mt-auto">
                  {/* <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-[#181818] hover:text-[#5E17EB] transition-colors"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    Wishlist
                  </button> */}

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
                className="w-9 h-9 flex items-center justify-center border border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors rounded-none text-base"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="w-9 h-9 flex items-center justify-center border border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors rounded-none text-base"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ════ LEFT — all hotel details ════ */}
          <div className="flex-1 space-y-8 min-w-0">

            {/* About */}
            {(na(hotel.description) || uniqueFeatures) && (
              <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <SectionHeading>About this retreat</SectionHeading>
                {na(hotel.description) && (
                  <p
                    className="text-sm text-[#181818] leading-relaxed whitespace-pre-wrap mb-4"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {hotel.description}
                  </p>
                )}
                {uniqueFeatures && (
                  <p
                    className="text-sm text-[#181818] leading-relaxed"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {uniqueFeatures}
                  </p>
                )}
              </section>
            )}

            
            

            {/* Wellness Offerings */}
            {wellnessItems.length > 0 && (
              <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <SectionHeading>Wellness Offerings</SectionHeading>
                <ItemList items={wellnessItems} />
              </section>
            )}

            {/* Facilities */}
            {facilities.length > 0 && (
              <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <SectionHeading>Facilities</SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {facilities.map((name) => (
                    <Chip key={name}>{name}</Chip>
                  ))}
                </div>
              </section>
            )}

            {/* Activities */}
            {activities.length > 0 && (
              <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <SectionHeading>Activities &amp; Experiences</SectionHeading>
                <ActivityGrid items={activities} />
              </section>
            )}

           
            

            {/* Dining */}
            {(cuisineTypes.length > 0 || diningFeatures.length > 0) && (
              <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <SectionHeading>Dining</SectionHeading>
                {cuisineTypes.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="text-[10px] text-[#8C8C8C] uppercase tracking-[0.18em] mb-3"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      Cuisine Types
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cuisineTypes.map((item) => (
                        <Chip key={item.name}>{item.name}</Chip>
                      ))}
                    </div>
                  </div>
                )}
                {diningFeatures.length > 0 && (
                  <div>
                    <p
                      className="text-[10px] text-[#8C8C8C] uppercase tracking-[0.18em] mb-3"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      Dining Features
                    </p>
                    <ItemList items={diningFeatures} />
                  </div>
                )}
              </section>
            )}

            {/* ── Accordion sections ── */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {(propertyType || na(hotel.min_nights) || na(hotel.max_occupancy) || poolValue || doctorsValue || medicalValue) && (
                <AccordionSection id="key-details" title="Key Details" openAccordion={openAccordion} onToggle={toggleAccordion}>
                  <InfoRow label="Property Type"             value={propertyType} />
                  <InfoRow label="Minimum Stay"              value={hotel.min_nights ? `${hotel.min_nights} nights` : null} />
                  <InfoRow label="Max Occupancy Per Room"    value={hotel.max_occupancy ? `${hotel.max_occupancy} person(s)` : null} />
                  <InfoRow label="Swimming Pool"             value={poolValue} />
                  <InfoRow label="Doctors On-Site"           value={doctorsValue} />
                  <InfoRow label="Medical Report Assistance" value={medicalValue} />
                </AccordionSection>
              )}
              {/* {mealPlans.length > 0 && (
                <AccordionSection id="meal-plans" title="Meal Plans" openAccordion={openAccordion} onToggle={toggleAccordion}>
                  <ItemList className="ml-12" items={mealPlans} />
                </AccordionSection>
              )} */}
              {roomFeatures.length > 0 && (
                <AccordionSection id="room-features" title="Room Features" openAccordion={openAccordion} onToggle={toggleAccordion}>
                  <div className="flex flex-wrap gap-2">
                    {roomFeatures.map((name) => <Chip key={name}>{name}</Chip>)}
                  </div>
                </AccordionSection>
              )}
              {restrictions.length > 0 && (
                <AccordionSection id="restrictions" title="Restrictions & Policies" openAccordion={openAccordion} onToggle={toggleAccordion}>
                  <div className="flex flex-wrap gap-2">
                    {restrictions.map((name) => <Chip key={name}>{name}</Chip>)}
                  </div>
                </AccordionSection>
              )}
              {images.length > 0 && (
                <AccordionSection id="gallery" title="Gallery" openAccordion={openAccordion} onToggle={toggleAccordion}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img, i) => (
                      <button key={i} type="button" onClick={() => setLightboxImg(img)} className="aspect-[4/3] rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#5E17EB]">
                        <img src={img} alt={`${hotel.name} – photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </button>
                    ))}
                  </div>
                </AccordionSection>
              )}
            </div>
          </div>

          {/* ════ RIGHT — sticky booking form ════ */}
          <div className="w-full lg:w-[340px] lg:sticky lg:top-8 lg:self-start shrink-0">
            <aside className="bg-white border border-[#F0EBE4] rounded-xl p-6 shadow-sm">
              <h2
                className="text-lg text-[#181818] mb-1"
                style={{ fontFamily: "Sentient, serif" }}
              >
                Inquire about this retreat
              </h2>
              <p
                className="text-xs text-[#8C8C8C] mb-6"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Fill in your preferences and we'll get back to you.
              </p>

              <div className="space-y-4 text-sm">
                {/* Month to travel */}
                <div>
                  <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>The month you plan to travel</label>
                  <input
                    type="month"
                    value={dateFrom}
                    min={new Date().toISOString().slice(0, 7)}
                    onChange={(e) => { setDateFrom(e.target.value); setFormErrors((prev) => ({ ...prev, dateFrom: undefined })); }}
                    className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] ${formErrors.dateFrom ? "border-red-400" : "border-[#E0D4C8]"}`}
                  />
                  {formErrors.dateFrom && <p className="text-red-500 text-[10px] mt-1">{formErrors.dateFrom}</p>}
                </div>

                {/* Room type */}
                <div>
                  <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Room type</label>
                  <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]">
                    <option>Single</option>
                    <option>Double</option>
                  </select>
                </div>

                {/* People */}
                <div>
                  <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Guests</label>
                  <div className="inline-flex items-center border border-[#E0D4C8] rounded-lg">
                    <button type="button" onClick={() => setPeople((p) => Math.max(1, p - 1))} className="px-3 py-2 text-base hover:bg-[#F0EBE4]/50 rounded-l-lg transition-colors leading-none">−</button>
                    <span className="px-4 py-2 text-xs border-l border-r border-[#E0D4C8] min-w-[40px] text-center" style={{ fontFamily: "Lato, sans-serif" }}>{people}</span>
                    <button type="button" onClick={() => setPeople((p) => p + 1)} className="px-3 py-2 text-base hover:bg-[#F0EBE4]/50 rounded-r-lg transition-colors leading-none">+</button>
                  </div>
                </div>

                {/* Flight */}
                {/* <div>
                  <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Flight</label>
                  <select value={flightIncluded} onChange={(e) => setFlightIncluded(e.target.value)} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]">
                    <option value="">Not included</option>
                    <option value="included">Included</option>
                  </select>
                </div> */}

                {/* Transport */}
                <div>
                  <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Transport</label>
                  <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]">
                    <option value="">Select</option>
                    <option>Car</option>
                    <option>Van</option>
                  </select>
                </div>

                {/* Divider */}
                <div className="border-t border-[#F0EBE4] pt-4">
                  <p className="text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-4" style={{ fontFamily: "Lato, sans-serif" }}>Personal Details</p>

                  {/* Gender */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {[{ value: "female", label: "Female" }, { value: "male", label: "Male" }, { value: "prefer-not", label: "Other" }].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="gender" value={opt.value} checked={gender === opt.value} onChange={() => setGender(opt.value)} className="w-3.5 h-3.5 text-[#5E17EB] border-[#E0D4C8] focus:ring-[#5E17EB]" />
                        <span className="text-xs text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Full Name*</label>
                    <input type="text" placeholder="Enter full name" value={fullName} onChange={(e) => { setFullName(e.target.value); setFormErrors((p) => ({ ...p, fullName: undefined })); }} className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] ${formErrors.fullName ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }} />
                    {formErrors.fullName && <p className="text-red-500 text-[10px] mt-1">{formErrors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Email*</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value); setFormErrors((p) => ({ ...p, email: undefined })); }} className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] ${formErrors.email ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }} />
                    {formErrors.email && <p className="text-red-500 text-[10px] mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Country */}
                  <div className="mb-3">
                    <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Country*</label>
                    <select value={country} onChange={(e) => { setCountry(e.target.value); setFormErrors((p) => ({ ...p, country: undefined })); }} className={`w-full border rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB] ${formErrors.country ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }}>
                      <option value="">Select country</option>
                      <option value="AT">Austria</option>
                      <option value="DE">Germany</option>
                      <option value="CH">Switzerland</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="LK">Sri Lanka</option>
                    </select>
                    {formErrors.country && <p className="text-red-500 text-[10px] mt-1">{formErrors.country}</p>}
                  </div>

                  {/* Mobile */}
                  <div className="mb-3">
                    <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Mobile*</label>
                    <input type="tel" placeholder="Enter mobile number" value={mobile} onChange={(e) => { setMobile(e.target.value); setFormErrors((p) => ({ ...p, mobile: undefined })); }} className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] ${formErrors.mobile ? "border-red-400" : "border-[#E0D4C8]"}`} style={{ fontFamily: "Lato, sans-serif" }} />
                    {formErrors.mobile && <p className="text-red-500 text-[10px] mt-1">{formErrors.mobile}</p>}
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-[10px] text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: "Lato, sans-serif" }}>Comment</label>
                    <textarea placeholder="Any additional wishes..." value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full border border-[#E0D4C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA] resize-y" style={{ fontFamily: "Lato, sans-serif" }} />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleInquire}
                disabled={submitting}
                className="mt-6 w-full py-3 bg-[#5E17EB] text-white text-[10px] tracking-[0.22em] uppercase rounded-lg hover:bg-[#4B12BD] transition-colors disabled:opacity-60"
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
              <p
                className="text-[10px] tracking-[0.22em] text-[#5E17EB] uppercase mb-3"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
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
                  const img =
                    h.images && (Array.isArray(h.images) ? h.images[0] : h.images);
                  return (
                    <div
                      key={h.id}
                      className={`flex flex-col ${
                        index === 1
                          ? "lg:mt-[60px]"
                          : index === 2
                          ? "lg:mt-[100px]"
                          : ""
                      }`}
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
                        <p
                          className="text-sm text-[#5E17EB] mb-1"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          {h.slogan_line}
                        </p>
                      )}
                      <p
                        className="text-xs text-[#8C8C8C] mb-4"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
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
                  className="text-[#5E17EB] text-sm tracking-[0.1em] uppercase hover:underline"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  ← Back to all retreats
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
