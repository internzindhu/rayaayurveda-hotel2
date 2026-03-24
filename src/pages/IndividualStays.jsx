import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { supabase } from "@/lib/supabase";

const INITIAL_DISPLAY = 4;
const DROPDOWN_MAX = 8;

function matchHotel(hotel, query) {
  if (!query || !query.trim()) return true;
  const q = query.trim().toLowerCase();
  const name = (hotel.hotel_name || "").toLowerCase();
  const location = (hotel.hotel_location || "").toLowerCase();
  const desc = (hotel.description || "").toLowerCase();
  return name.includes(q) || location.includes(q) || desc.includes(q);
}

export default function IndividualStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownCloseTimer = useRef(null);

  const textFilter = appliedSearch || searchInput;
  const filteredHotels = hotels.filter(
    (h) =>
      matchHotel(h, textFilter) &&
      matchHotel(h, priceFilter) &&
      matchHotel(h, periodFilter)
  );
  const dropdownHotels = hotels
    .filter((h) => matchHotel(h, searchInput))
    .slice(0, DROPDOWN_MAX);
  const hotelsToShow = filteredHotels.slice(0, displayCount);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectHotel = (hotel) => {
    setSearchInput(hotel.hotel_name);
    setAppliedSearch(hotel.hotel_name);
    setDisplayCount(INITIAL_DISPLAY);
    setShowDropdown(false);
  };

  const handleSearchClick = () => {
    setAppliedSearch(searchInput.trim());
    setDisplayCount(INITIAL_DISPLAY);
    setShowDropdown(false);
  };

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
    if (!value.trim()) setAppliedSearch("");
  };

  const handleInputFocus = () => setShowDropdown(true);
  const handleInputBlur = () => {
    dropdownCloseTimer.current = setTimeout(() => setShowDropdown(false), 150);
  };
  const cancelBlur = () => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
  };

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from("hotels")
          .select("*")
          .eq("is_active", true)
          .order("id", { ascending: true });
        if (err) throw err;
        setHotels(data ?? []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">
      {/* Hero Section with Background Image (same as About) */}
      <div className="relative min-h-[80svh] lg:h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/aboutUs.jpg)',
            zIndex: 1,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-5 bg-black/10"></div>

        {/* Blur/Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-black/50"></div>

        {/* Main Content Wrapper */}
        <div className="relative z-20">
          {/* Navigation */}
          <Navbar />

          {/* Hero Content */}
          <section className="relative min-h-[100svh] lg:h-[80vh] flex flex-col justify-center items-center text-center px-4">
            <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto space-y-6">
              <div className="text-white w-full space-y-2">
                <TextGenerateEffect
                  words="MORE THAN TREATMENT"
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: 'normal', fontWeight: '300' }}
                />
                <TextGenerateEffect
                  words="A return to balance."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg text-[#181818] leading-relaxed text-center" style={{ fontFamily: 'poppins' }}>
            Tucked away in the heart of nature, RAYA Longlife honors Ayurvedic wisdom & Ayurveda by pairing each guest-owned holistic retreat, authentic spiritual & wellbeing through transformative healing experiences.
          </p>
        </div>
      </section>

      <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
        fontFamily: 'Lato, sans-serif',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '100%',
        letterSpacing: '0.1em',
        textAlign: 'center',
        textTransform: 'uppercase'
      }}>What to expect</h2>
      {/* Top Section: Heading with vertical separator and description */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">

        <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>The benefits</h3>
          <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center"></div>
        </div>
        <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-6 lg:gap-8">
          <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>An Ayurvedic retreat offers deep regeneration, restoring balance, vitality, and long-term wellbeing through a uniquely holistic and medically grounded approach.</p>
        </div>
      </div>


      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Search Bar Section */}
        <div className="w-full bg-[#FFF8F2] rounded-xl shadow-sm border border-[#FFF0E0] px-6 sm:px-10 py-6 sm:py-8 mb-12 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
          {/* Destination or Hotel - search input with dropdown */}
          <div className="flex-1 flex flex-col relative" ref={searchRef}>
            <label
              htmlFor="hotel-search"
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Destination or Hotel
            </label>
            <input
              id="hotel-search"
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Country, region, hotel"
              className="w-full text-sm sm:text-base text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] placeholder:text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            />
            {showDropdown && (
              <ul
                className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-[#FFF0E0] py-2 max-h-60 overflow-y-auto z-50"
                style={{ fontFamily: "Lato, sans-serif" }}
                onMouseDown={cancelBlur}
              >
                {searchInput.trim() === "" ? (
                  <li className="px-4 py-2 text-sm text-[#8C8C8C]">Type to search hotels</li>
                ) : dropdownHotels.length === 0 ? (
                  <li className="px-4 py-2 text-sm text-[#8C8C8C]">No hotels match</li>
                ) : (
                  dropdownHotels.map((hotel) => (
                    <li key={hotel.id}>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm text-[#181818] hover:bg-[#FFF0E0] transition-colors"
                        onClick={() => handleSelectHotel(hotel)}
                      >
                        <span className="font-medium">{hotel.hotel_name}</span>
                        {hotel.hotel_location && (
                          <span className="block text-[#8C8C8C] text-xs mt-0.5 truncate">{hotel.hotel_location}</span>
                        )}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-[#E0D4C8]" />

          {/* Price Range - simple text filter */}
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="price-range"
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Price Range
            </label>
            <input
              id="price-range"
              type="text"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              placeholder="e.g. budget, luxury"
              className="w-full text-sm sm:text-base text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] placeholder:text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-[#E0D4C8]" />

          {/* Period - simple text filter */}
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="period-filter"
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Period
            </label>
            <input
              id="period-filter"
              type="text"
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              placeholder="e.g. 7 nights, weekend"
              className="w-full text-sm sm:text-base text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] placeholder:text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            />
          </div>

          {/* Search */}
          <button
            type="button"
            onClick={handleSearchClick}
            className="md:ml-auto text-[#5E17EB] text-xs sm:text-sm tracking-[0.16em] uppercase hover:underline cursor-pointer"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Search &rarr;
          </button>
        </div>




        {/* Hotels Grid from API */}
        <div className="relative mb-24 sm:mb-24">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-24 w-px bg-gray-900 transform -translate-x-1/2"></div>

          {loading && (
            <p className="text-center text-[#181818] py-12" style={{ fontFamily: 'Lato, sans-serif' }}>Loading hotels…</p>
          )}
          {error && (
            <p className="text-center text-red-600 py-12" style={{ fontFamily: 'Lato, sans-serif' }}>Failed to load hotels: {error}</p>
          )}
          {!loading && !error && hotels.length === 0 && (
            <p className="text-center text-[#181818] py-12" style={{ fontFamily: 'Lato, sans-serif' }}>No hotels available.</p>
          )}
          {!loading && !error && hotels.length > 0 && filteredHotels.length === 0 && (
            <p className="text-center text-[#181818] py-12" style={{ fontFamily: 'Lato, sans-serif' }}>
              No hotels match your search. Try a different destination or hotel name.
            </p>
          )}
          {!loading && !error && hotels.length > 0 && filteredHotels.length > 0 && (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 items-start">
              {hotelsToShow.map((hotel, index) => (
                <div key={hotel.id} className="flex flex-col">
                  <div className={`mb-4 ${index === 1 ? 'lg:mt-[60px]' : index === 2 ? 'lg:mt-[100px]' : ''}`}>
                    <img
                      src={hotel.images || "/hotel.png"}
                      alt={hotel.hotel_name}
                      className="w-full aspect-[4/3] object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818] mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                    {hotel.hotel_name}
                  </h3>
                  {hotel.slogan_line && (
                    <p className="text-sm text-[#5E17EB] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>{hotel.slogan_line}</p>
                  )}
                  <p className="text-sm text-[#8C8C8C] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>{hotel.hotel_location}</p>
                  {/* <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                    {hotel.description}
                  </p> */}
                  {hotel.facilities && Array.isArray(hotel.facilities) && hotel.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.facilities.map((f, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-[#FFF0E0] rounded" style={{ fontFamily: 'Lato, sans-serif' }}>{f}</span>
                      ))}
                    </div>
                  )}
                  <Link to={`/book-hotel/${hotel.id}`} className="text-[#5E17EB] hover:underline inline-block uppercase mt-6" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    VIEW RETREAT →
                  </Link>
                </div>
              ))}
            </div>
            {displayCount < filteredHotels.length && (
              <div className="text-center mt-24">
                <button
                  type="button"
                  onClick={() => setDisplayCount((prev) => Math.min(prev + INITIAL_DISPLAY, filteredHotels.length))}
                  className="text-[#5E17EB] text-sm sm:text-base tracking-[0.1em] uppercase hover:underline px-6 py-6  rounded-lg transition-colors "
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Show more hotels
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

