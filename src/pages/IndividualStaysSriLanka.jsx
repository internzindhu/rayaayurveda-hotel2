import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RevealOnScroll from "../components/RevealOnScroll";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { fetchWellnessHotels } from "../lib/wellnessApi";
import AdvancedFilters from "../components/AdvancedFilters";

const INITIAL_DISPLAY = 8;

function getPrimaryImage(images) {
  if (!images) return null;
  if (typeof images === "string") return images || null;
  if (Array.isArray(images) && images.length > 0) {
    const sorted = [...images].sort((a, b) => (b?.is_primary ? 1 : 0) - (a?.is_primary ? 1 : 0));
    const first = sorted[0];
    return (typeof first === "string" ? first : first?.url) || null;
  }
  return images?.url || null;
}

export default function IndividualStaysSriLanka() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [searchInput, setSearchInput] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilterParams, setActiveFilterParams] = useState({});

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownCloseTimer = useRef(null);

  const loadHotels = useCallback(async (extraParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        ownership_type: "Individual",
        location: "Sri Lanka",
        ...extraParams,
      };
      const result = await fetchWellnessHotels(params);
      setHotels(result.data ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

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
    setShowDropdown(false);
    navigate(`/book-hotel/${hotel.id}`);
  };

  const handleSelectCity = (city) => {
    setSearchInput(city);
    setDisplayCount(INITIAL_DISPLAY);
    setShowDropdown(false);
    loadHotels({ ...activeFilterParams, location: city });
  };

  const handleSearchClick = () => {
    setDisplayCount(INITIAL_DISPLAY);
    setShowDropdown(false);
    const params = { ...activeFilterParams };
    if (searchInput.trim()) params.location = searchInput.trim();
    if (selectedMonth) params.month = selectedMonth;
    if (startingPrice.trim()) params.min_price = startingPrice.trim();
    loadHotels(params);
  };

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
    if (!value.trim()) {
      loadHotels(activeFilterParams);
    }
  };

  const handleInputFocus = () => setShowDropdown(true);
  const handleInputBlur = () => {
    dropdownCloseTimer.current = setTimeout(() => setShowDropdown(false), 150);
  };
  const cancelBlur = () => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
  };

  const handleAdvancedFiltersApply = (filterParams) => {
    setActiveFilterParams(filterParams);
    setDisplayCount(INITIAL_DISPLAY);
    const params = { ...filterParams };
    if (searchInput.trim()) params.location = searchInput.trim();
    loadHotels(params);
  };

  const q = searchInput.trim().toLowerCase();
  const allCities = [...new Set(hotels.map((h) => h.location).filter(Boolean))].sort();
  const matchingCities = q
    ? allCities.filter((c) => c.toLowerCase().includes(q))
    : allCities;
  const matchingHotels = q
    ? hotels.filter((h) => (h.name ?? "").toLowerCase().includes(q)).slice(0, 5)
    : [];

  const hotelsToShow = hotels.slice(0, displayCount);

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[80svh] lg:h-[60vh] overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/slhero.jpg)", zIndex: 1 }}
        />
        <div className="absolute top-0 left-0 w-full h-full z-5 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-black/50" />

        <div className="relative z-20">
          <Navbar />
          <section className="relative min-h-[100svh] lg:h-[80vh] flex flex-col justify-center items-center text-center px-4">
            <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto space-y-6">
              <div className="text-white w-full space-y-2">
                <p
                  className="text-xs sm:text-sm tracking-[0.24em] uppercase text-white/85 mb-2"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Sri Lanka
                </p>
                <TextGenerateEffect
                  words="SERENITY IN CEYLON"
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "normal", fontWeight: "300" }}
                />
                <TextGenerateEffect
                  words="Your healing begins here."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                />
                <p
                  className="text-white/90 text-sm sm:text-base max-w-lg mx-auto pt-4 leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Wake to ocean breeze and tropical calm as Sri Lanka's heritage of Ayurvedic healing guides your personal retreat journey.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="py-16 px-4 mb-4 sm:px-8 bg-[#EAE9E3]">
        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg text-[#181818] leading-relaxed text-center" style={{ fontFamily: "poppins" }}>
            For individual stays, you can select your preferred resort and decide the dates of your stay.
          </p>
        </div>
      </section>

      <h2
        className="text-[#5E17EB] mb-4 uppercase"
        style={{ fontFamily: "Lato, sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "100%", letterSpacing: "0.1em", textAlign: "center", textTransform: "uppercase" }}
      >
        A journey back to balance
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
        <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: "Sentient Bold, serif" }}>
            Individual Stay
          </h3>
          <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center" />
        </div>
        <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-8">
          <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            Step into a world of natural harmony and deep restoration. Across our handpicked Ayurvedic resorts in Sri Lanka and beyond, you'll experience personalised wellness journeys designed to heal the body, calm the mind, and nourish the spirit.
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Search Bar */}
        <div className="w-full bg-[#FFF8F2] rounded-xl shadow-sm border border-[#FFF0E0] px-6 sm:px-10 py-6 sm:py-8 mb-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">

          {/* Destination or Hotel */}
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
              placeholder="City or hotel name"
              className="w-full text-sm sm:text-base text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] placeholder:text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            />
            {showDropdown && (matchingCities.length > 0 || matchingHotels.length > 0) && (
              <ul
                className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-[#FFF0E0] py-2 max-h-60 overflow-y-auto z-50"
                style={{ fontFamily: "Lato, sans-serif" }}
                onMouseDown={cancelBlur}
              >
                {matchingCities.length > 0 && (
                  <>
                    <li className="px-4 pt-1 pb-0.5 text-[10px] tracking-widest uppercase text-[#8C8C8C]">Cities</li>
                    {matchingCities.map((city) => (
                      <li key={city}>
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 text-sm text-[#181818] hover:bg-[#FFF0E0] transition-colors"
                          onClick={() => handleSelectCity(city)}
                        >
                          {city}
                        </button>
                      </li>
                    ))}
                  </>
                )}
                {matchingHotels.length > 0 && (
                  <>
                    <li className="px-4 pt-2 pb-0.5 text-[10px] tracking-widest uppercase text-[#8C8C8C]">Hotels</li>
                    {matchingHotels.map((hotel) => (
                      <li key={hotel.id}>
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2.5 text-sm text-[#181818] hover:bg-[#FFF0E0] transition-colors"
                          onClick={() => handleSelectHotel(hotel)}
                        >
                          <span className="font-medium">{hotel.name}</span>
                          {hotel.location && (
                            <span className="block text-[#8C8C8C] text-xs mt-0.5 truncate">{hotel.location}</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}
          </div>

          <div className="hidden md:block w-px self-stretch bg-[#E0D4C8]" />

          {/* Month */}
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="travel-month"
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Month
            </label>
            <select
              id="travel-month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full text-sm sm:text-base text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] appearance-none cursor-pointer"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              <option value="">Any month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className="hidden md:block w-px self-stretch bg-[#E0D4C8]" />

          {/* Starting Price */}
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="starting-price"
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Starting Price
            </label>
            <input
              id="starting-price"
              type="text"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              placeholder="e.g. EUR 3000"
              className="w-full text-sm sm:text-base text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] placeholder:text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            />
          </div>

          <button
            type="button"
            onClick={handleSearchClick}
            className="md:ml-auto text-[#5E17EB] text-xs sm:text-sm tracking-[0.16em] uppercase hover:underline cursor-pointer"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Search &rarr;
          </button>
          </div>

          <div className="border-t border-[#E0D4C8] pt-4">
            <AdvancedFilters onApply={handleAdvancedFiltersApply} className="mb-0" />
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="relative mb-24 sm:mb-24">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-24 w-px bg-gray-900 transform -translate-x-1/2" />

          {loading && (
            <p className="text-center text-[#181818] py-12" style={{ fontFamily: "Lato, sans-serif" }}>Loading hotels…</p>
          )}
          {error && (
            <p className="text-center text-red-600 py-12" style={{ fontFamily: "Lato, sans-serif" }}>Failed to load hotels: {error}</p>
          )}
          {!loading && !error && hotels.length === 0 && (
            <p className="text-center text-[#181818] py-12" style={{ fontFamily: "Lato, sans-serif" }}>No hotels found. Try adjusting your filters.</p>
          )}
          {!loading && !error && hotels.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 items-start">
                {hotelsToShow.map((hotel, index) => (
                  <RevealOnScroll key={hotel.id} delay={(index % 4) * 70} className="flex flex-col">
                    <div className={`mb-4 ${index === 1 ? "lg:mt-[60px]" : index === 2 ? "lg:mt-[100px]" : ""}`}>
                      <img
                        src={getPrimaryImage(hotel.images) || "/hotel.png"}
                        alt={hotel.name}
                        className="w-full aspect-[4/3] object-cover rounded-lg"
                      />
                    </div>
                    <h3
                      className="text-xl sm:text-2xl md:text-2xl text-[#181818] mb-3"
                      style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                    >
                      {hotel.name}
                    </h3>
                    {hotel.slogan_line && (
                      <p className="text-sm text-[#5E17EB] mb-1" style={{ fontFamily: "Lato, sans-serif" }}>{hotel.slogan_line}</p>
                    )}
                    <p className="text-sm text-[#8C8C8C] mb-1" style={{ fontFamily: "Lato, sans-serif" }}>{hotel.location}</p>
                    {hotel.price && (
                      <p className="text-sm font-medium text-[#181818] mb-2" style={{ fontFamily: "Lato, sans-serif" }}>{hotel.price}</p>
                    )}
                    {hotel.facilities && hotel.facilities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.facilities.slice(0, 4).map((f) => (
                          <span key={f.facility_id} className="text-xs px-2 py-1 bg-[#FFF0E0] rounded" style={{ fontFamily: "Lato, sans-serif" }}>
                            {f.facility?.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/book-hotel/${hotel.id}`}
                      className="text-[#5E17EB] hover:underline inline-block uppercase mt-6"
                      style={{ fontFamily: "Lato", fontWeight: "500", fontStyle: "normal", fontSize: "14px", lineHeight: "100%", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      VIEW RETREAT →
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
              {displayCount < hotels.length && (
                <div className="text-center mt-24">
                  <button
                    type="button"
                    onClick={() => setDisplayCount((prev) => Math.min(prev + INITIAL_DISPLAY, hotels.length))}
                    className="text-[#5E17EB] text-sm sm:text-base tracking-[0.1em] uppercase hover:underline px-6 py-6 rounded-lg transition-colors"
                    style={{ fontFamily: "Lato, sans-serif" }}
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
