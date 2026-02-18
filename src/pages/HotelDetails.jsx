import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { HOTELS } from "../data/hotels";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotelId = Number(id);
  const hotel = HOTELS.find((h) => h.id === hotelId) ?? HOTELS[0];
  const otherHotels = HOTELS.filter((h) => h.id !== hotel.id);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [roomType, setRoomType] = useState("Double");
  const [people, setPeople] = useState(2);
  const [flightIncluded, setFlightIncluded] = useState("Not included");
  const [extras, setExtras] = useState("Insurance 300€");

  const totalDisplay = hotel.price;
  const handleBookNow = () => {
    navigate(`/book-hotel/${hotel.id}/inquiry`, {
      state: {
        dateFrom,
        dateTo,
        roomType,
        people,
        flightIncluded,
        extras,
        totalPrice: totalDisplay,
      },
    });
  };

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
                src={hotel.mainImage}
                alt={hotel.name}
                className="w-full h-[340px] sm:h-[420px] lg:h-[460px] object-cover"
              />

              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg p-5 max-w-xs">
                <h1
                  className="text-lg sm:text-xl font-normal text-[#181818] mb-1"
                  style={{ fontFamily: "Sentient, serif" }}
                >
                  {hotel.name}
                </h1>
                <p
                  className="text-sm text-[#181818] mb-3"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Authentic Ayurvedic therapies in a peaceful tropical setting.
                </p>
                <p
                  className="text-sm text-[#5E17EB] mb-1"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.price}
                </p>
                <p
                  className="text-xs text-[#555555] mb-3"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {hotel.location}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#181818] mb-3">
                  <span>⭐ {hotel.rating}</span>
                  <span>·</span>
                  <span>{hotel.reviewsCount} reviews</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <button className="px-3 py-1 rounded-full border border-[#181818]/20 text-[#181818]">
                    Website
                  </button>
                  <button className="px-3 py-1 rounded-full border border-[#181818]/20 text-[#181818]">
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
              An authentic healing sanctuary
            </h3>
            <p
              className="text-sm text-[#181818] leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Nestled in the heart of lush tropical nature, this retreat combines
              classical Ayurvedic medicine with gentle daily rituals, nourishing
              cuisine, and guided relaxation. Your stay begins with a detailed
              consultation with an experienced Ayurvedic doctor, who designs a
              personalised treatment plan tailored to your dosha type, health
              history, and long-term wellbeing goals.
            </p>
            <p
              className="text-sm text-[#181818] leading-relaxed mt-4"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Each day includes curated treatments, yoga or gentle movement,
              meditation, and time for rest by the pool or sea. This is a place
              to reset, restore, and reconnect with yourself.
            </p>
          </div>

          {/* Included / Not included */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4
              className="text-sm tracking-[0.16em] text-[#5E17EB] mb-4 uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              What&apos;s included
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Professional guides",
                "Doctor consultation",
                "Daily Ayurvedic treatments",
                "Guided wellness workshops",
                "Meals and snacks",
                "Airport transfer",
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-[#F3F0FF] text-xs text-[#5E17EB]"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {item}
                </span>
              ))}
            </div>

            <h4
              className="text-sm tracking-[0.16em] text-[#999999] mb-3 uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Not included
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Additional services", "Insurance", "Tips", "Drinks"].map(
                (item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-[#F5F5F5] text-xs text-[#555555]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* Stories of healing */}
        <section className="bg-[#ECE9E3] rounded-2xl px-6 sm:px-10 py-14">
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
        </section>

        {/* Other retreats (same design as provided section) */}
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
              Retreats
            </h2>
          </div>

          <div className="relative mb-24 sm:mb-24">
            {/* Vertical separator line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-10 w-px bg-gray-900 transform -translate-x-1/2"></div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Card 1 */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <img
                    src="/meds.png"
                    alt="Ayurvedic Healing Retreat"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3
                  className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                >
                  Ayurvedic Healing Retreat (Signature)
                </h3>
                <p
                  className="text-sm text-[#181818] mb-4 leading-relaxed"
                  style={{ fontFamily: "poppins" }}
                >
                  A comprehensive therapeutic program for regeneration,
                  detoxification, and restoring balance in both body and mind.
                </p>
                <Link
                  to="/book-hotel/1"
                  className="text-[#5E17EB] hover:underline inline-block uppercase"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  VIEW RETREAT →
                </Link>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col">
                <div className="mb-4 lg:mt-[60px]">
                  <img
                    src="/panchakarma.jpg"
                    alt="Panchakarma Cleanse"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3
                  className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                >
                  Panchakarma Cleanse
                </h3>
                <p
                  className="text-sm text-[#181818] mb-4 leading-relaxed"
                  style={{ fontFamily: "poppins" }}
                >
                  A deep medical detox supervised by a doctor to reset the
                  nervous system, hormonal balance, and overall health.
                </p>
                <Link
                  to="/book-hotel/2"
                  className="text-[#5E17EB] hover:underline inline-block uppercase"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  VIEW RETREAT →
                </Link>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col">
                <div className="mb-4 lg:mt-[100px]">
                  <img
                    src="/stress.png"
                    alt="Stress & Burnout Recovery"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3
                  className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                >
                  Stress &amp; Burnout Recovery
                </h3>
                <p
                  className="text-sm text-[#181818] mb-4 leading-relaxed"
                  style={{ fontFamily: "poppins" }}
                >
                  A program focused on exhaustion, insomnia, anxiety, and
                  long-term mental strain.
                </p>
                <Link
                  to="/book-hotel/3"
                  className="text-[#5E17EB] hover:underline inline-block uppercase"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  VIEW RETREAT →
                </Link>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <img
                    src="/digestive.png"
                    alt="Digestive & Gut Health Programme"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3
                  className="text-xl sm:text-2xl md:text-2xl text-[#181818] mb-3"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                >
                  Digestive &amp; Gut Health Programme
                </h3>
                <p
                  className="text-sm text-[#181818] mb-4 leading-relaxed"
                  style={{ fontFamily: "poppins" }}
                >
                  Therapy targeting digestive issues, intolerances, inflammation,
                  and metabolic problems.
                </p>
                <Link
                  to="/book-hotel/4"
                  className="text-[#5E17EB] hover:underline inline-block uppercase"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  VIEW RETREAT →
                </Link>
              </div>
            </div>

            {/* Discover All Retreats Button */}
            <div className="text-center mt-24 sm:mt-32">
              <Link
                to="/individual-stays"
                className="text-[#5E17EB]  text-lg hover:underline inline-block"
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

