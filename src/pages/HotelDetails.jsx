import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "@/lib/supabase";

function na(value) {
  if (value == null || value === "") return "Not available";
  if (Array.isArray(value) && value.length === 0) return "Not available";
  return value;
}

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotelId = Number(id);

  const [hotel, setHotel] = useState(null);
  const [otherHotels, setOtherHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [roomType, setRoomType] = useState("Double");
  const [people, setPeople] = useState(2);
  const [flightIncluded, setFlightIncluded] = useState("Not included");
  const [extras, setExtras] = useState("Insurance 300€");
  const [activeTab, setActiveTab] = useState("reviews"); // "reviews" | "gallery"

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data: single, error: errSingle } = await supabase
          .from("hotels")
          .select("*")
          .eq("id", hotelId)
          .eq("is_active", true)
          .single();
        if (errSingle) throw errSingle;
        setHotel(single ?? null);

        const { data: others, error: errOthers } = await supabase
          .from("hotels")
          .select("id, hotel_name, hotel_location, description, images")
          .eq("is_active", true)
          .neq("id", hotelId)
          .order("id", { ascending: true })
          .limit(4);
        if (!errOthers) setOtherHotels(others ?? []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [hotelId]);

  const totalDisplay = "Not available"; // API has no price
  const handleBookNow = () => {
    if (!hotel) return;
    navigate(`/book-hotel/${hotel.id}/inquiry`, {
      state: {
        dateFrom,
        dateTo,
        roomType,
        people,
        flightIncluded,
        extras,
        totalPrice: totalDisplay,
        hotelId: hotel.id,
        hotelName: hotel.hotel_name,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBF7]">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 pt-32 pb-20">
          <p className="text-center text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>Loading retreat…</p>
        </main>
      </div>
    );
  }
  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-[#FFFBF7]">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 pt-32 pb-20">
          <p className="text-center text-red-600 mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
            {error || "Retreat not found."}
          </p>
          <p className="text-center">
            <Link to="/individual-stays" className="text-[#5E17EB] hover:underline" style={{ fontFamily: "Lato, sans-serif" }}>
              ← Back to retreats
            </Link>
          </p>
        </main>
      </div>
    );
  }

  const mainImage = hotel.images && (Array.isArray(hotel.images) ? hotel.images[0] : hotel.images);
  const displayImage = mainImage || "/hotel.png";

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pt-32 pb-20">
        {/* Hero / booking section */}
        <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr]">
            {/* Image + overlay card */}
            <div className="relative">
              <img
                src={displayImage}
                alt={na(hotel.hotel_name)}
                className="w-full h-[340px] sm:h-[420px] lg:h-[460px] object-cover"
              />

              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg p-5 max-w-xs">
                <h1
                  className="text-lg sm:text-xl font-normal text-[#181818] mb-1"
                  style={{ fontFamily: "Sentient, serif" }}
                >
                  {na(hotel.hotel_name)}
                </h1>
                <p
                  className="text-sm text-[#181818] mb-3"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {na(hotel.slogan_line)}
                </p>
                <p
                  className="text-sm text-[#5E17EB] mb-1"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {na(hotel.price)}
                </p>
                <p
                  className="text-xs text-[#555555] mb-3"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {na(hotel.hotel_location)}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#181818] mb-3">
                  <span>Rating: {na(hotel.rating)}</span>
                  <span>·</span>
                  <span>Reviews: {na(hotel.reviews_count)}</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <button type="button" className="px-3 py-1 rounded-full border border-[#181818]/20 text-[#181818]">
                    Website
                  </button>
                  <button type="button" className="px-3 py-1 rounded-full border border-[#181818]/20 text-[#181818]">
                    View map
                  </button>
                </div>
              </div>
            </div>

            {/* Booking panel */}
            <aside className="bg-[#FBF7F3] px-6 py-6 sm:px-8 sm:py-8 flex flex-col justify-between">
              <div>
                <h2
                  className="text-lg font-semibold text-[#181818] mb-4"
                  style={{ fontFamily: "Sentient, serif" }}
                >
                  Book your ayurvedic plan
                </h2>

                <div className="space-y-4 text-sm">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#555] mb-1">
                        Date from
                      </label>
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full border border-[#E0D4C8] rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#555] mb-1">
                        Date to
                      </label>
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full border border-[#E0D4C8] rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                      />
                    </div>
                  </div>

                  {/* Room type */}
                  <div>
                    <label className="block text-xs text-[#555] mb-1">
                      Room type
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full border border-[#E0D4C8] rounded-md px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                    >
                      <option>Select</option>
                      <option>Single</option>
                      <option>Double</option>
                      <option>Suite</option>
                    </select>
                  </div>

                  {/* Flight ticket */}
                  <div>
                    <label className="block text-xs text-[#555] mb-1">
                      Flight ticket
                    </label>
                    <select
                      value={flightIncluded}
                      onChange={(e) => setFlightIncluded(e.target.value)}
                      className="w-full border border-[#E0D4C8] rounded-md px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                    >
                      <option>Select</option>
                      <option>Included</option>
                      <option>Not included</option>
                    </select>
                  </div>

                  {/* People */}
                  <div>
                    <label className="block text-xs text-[#555] mb-1">
                      People
                    </label>
                    <div className="inline-flex items-center border border-[#E0D4C8] rounded-md">
                      <button
                        type="button"
                        onClick={() => setPeople((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 text-sm hover:bg-[#E0D4C8]/30 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-sm border-l border-r border-[#E0D4C8]">
                        {people}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPeople((p) => p + 1)}
                        className="px-3 py-1 text-sm hover:bg-[#E0D4C8]/30 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Extra */}
                  <div>
                    <label className="block text-xs text-[#555] mb-1">
                      Add extra
                    </label>
                    <input
                      type="text"
                      value={extras}
                      onChange={(e) => setExtras(e.target.value)}
                      className="w-full border border-[#E0D4C8] rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                    />
                  </div>
                </div>
              </div>

              {/* Total & CTA */}
              <div className="mt-6 pt-4 border-t border-[#E0D4C8] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#555] mb-1">Total</p>
                  <p
                    className="text-lg text-[#5E17EB]"
                    style={{ fontFamily: "Sentient, serif" }}
                  >
                    {totalDisplay}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="px-6 py-2 rounded-md bg-[#5E17EB] text-white text-xs tracking-[0.16em] uppercase hover:bg-[#4B12BD] transition-colors"
                >
                  Book now
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* Description + included */}
        <section className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-10 mb-16">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3
              className="text-sm tracking-[0.16em] text-[#5E17EB] mb-4 uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              About this retreat
            </h3>
            <p
              className="text-sm text-[#181818] leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              {na(hotel.description)}
            </p>
          </div>

          {/* Facilities / What's included */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4
              className="text-sm tracking-[0.16em] text-[#5E17EB] mb-4 uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Facilities
            </h4>
            <div className="flex flex-wrap gap-2">
              {hotel.facilities && Array.isArray(hotel.facilities) && hotel.facilities.length > 0 ? (
                hotel.facilities.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#F3F0FF] text-xs text-[#5E17EB]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-[#8C8C8C]" style={{ fontFamily: "Lato, sans-serif" }}>
                  {na(hotel.facilities)}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Reviews & Gallery – tabbed section */}
        <section className="bg-[#ECE9E3] rounded-2xl px-6 sm:px-10 py-14">
          {/* Tab bar */}
          <div className="flex border-b border-[#181818]/15 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                activeTab === "reviews"
                  ? "text-[#5E17EB] border-b-2 border-[#5E17EB] -mb-px"
                  : "text-[#8C8C8C] hover:text-[#181818]"
              }`}
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Reviews
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                activeTab === "gallery"
                  ? "text-[#5E17EB] border-b-2 border-[#5E17EB] -mb-px"
                  : "text-[#8C8C8C] hover:text-[#181818]"
              }`}
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Gallery
            </button>
          </div>

          {/* Reviews content */}
          {activeTab === "reviews" && (
            <div>
              <div className="text-center mb-10">
                <p
                  className="text-xs tracking-[0.16em] text-[#5E17EB] mb-2 uppercase"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Customer reviews
                </p>
                <h3
                  className="text-3xl sm:text-4xl text-[#181818]"
                  style={{ fontFamily: "Sentient, serif" }}
                >
                  Stories of healing
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  text:
                    "After years of stress and exhaustion, this retreat gave me back my energy. The care, the food, and the treatments were beyond anything I expected.",
                  name: "M., Katarina R.",
                },
                {
                  text:
                    "My chronic back pain has significantly improved. I finally understand how to care for my body and mind in a sustainable way.",
                  name: "Mindy, Katarina R.",
                },
                {
                  text:
                    "The most restorative 10 days of my life. I left feeling lighter, calmer, and deeply supported by the entire team.",
                  name: "Branislav R.",
                },
              ].map((review, index) => (
                <article
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-full"
                >
                  <div className="text-[#5E17EB] mb-2">★★★★★</div>
                  <p
                    className="text-sm text-[#181818] leading-relaxed mb-4 flex-1"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {review.text}
                  </p>
                  <p
                    className="text-xs text-[#555555]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {review.name}
                  </p>
                </article>
              ))}
              </div>
            </div>
          )}

          {/* Gallery content */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                const images = hotel.images
                  ? Array.isArray(hotel.images)
                    ? hotel.images
                    : [hotel.images]
                  : [];
                if (images.length === 0) {
                  return (
                    <div className="col-span-full bg-white/60 rounded-xl p-8 text-center">
                      <p className="text-[#555555]" style={{ fontFamily: "Lato, sans-serif" }}>
                        No gallery images available for this retreat.
                      </p>
                    </div>
                  );
                }
                return images.map((img, index) => (
                  <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-white">
                    <img
                      src={img}
                      alt={`${na(hotel.hotel_name)} – image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ));
              })()}
            </div>
          )}
        </section>

        {/* Other retreats from API */}
        <section className="mt-16">
          <div className="text-center mb-12 sm:mb-16">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] uppercase mb-2"
              style={{ fontFamily: "Sentient, serif" }}
            >
              RAYA WELLBEING
            </h1>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB] font-normal"
              style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
            >
              Other retreats
            </h2>
          </div>

          <div className="relative mb-24 sm:mb-24">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-10 w-px bg-gray-900 transform -translate-x-1/2"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 items-start">
              {otherHotels.map((h, index) => {
                const img = h.images && (Array.isArray(h.images) ? h.images[0] : h.images);
                return (
                  <div key={h.id} className="flex flex-col">
                    <div className={`mb-4 ${index === 1 ? "lg:mt-[60px]" : index === 2 ? "lg:mt-[100px]" : ""}`}>
                      <img
                        src={img || "/hotel.png"}
                        alt={na(h.hotel_name)}
                        className="w-full aspect-[4/3] object-cover rounded-lg"
                      />
                    </div>
                    <h3
                      className="text-xl sm:text-2xl md:text-2xl text-[#181818] mb-3"
                      style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                    >
                      {na(h.hotel_name)}
                    </h3>
                    <p
                      className="text-sm text-[#181818] mb-4 leading-relaxed line-clamp-3"
                      style={{ fontFamily: "poppins" }}
                    >
                      {na(h.description)}
                    </p>
                    <Link
                      to={`/book-hotel/${h.id}`}
                      className="text-[#5E17EB] hover:underline inline-block uppercase mt-auto"
                      style={{
                        fontFamily: "Lato",
                        fontWeight: "500",
                        fontSize: "14px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      VIEW RETREAT →
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-24 sm:mt-32">
              <Link
                to="/individual-stays"
                className="text-[#5E17EB] text-lg hover:underline inline-block"
                style={{ fontFamily: "poppins" }}
              >
                DISCOVER ALL RETREATS →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

