import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import RevealOnScroll from "../components/RevealOnScroll";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { fetchWellnessHotels } from "../lib/wellnessApi";
import AdvancedFilters from "../components/AdvancedFilters";
import PriceRangeSlider from "../components/PriceRangeSlider";

const INITIAL_DISPLAY = 8;

const SRI_LANKA_CITIES = [
  "Ahungalla", "Aluthgama", "Ambalangoda", "Anuradhapura", "Arugam Bay",
  "Balapitiya", "Bandarawela", "Bentota", "Beruwala", "Colombo",
  "Dambulla", "Dikwella", "Ella", "Galle", "Hambantota",
  "Haputale", "Hikkaduwa", "Induruwa", "Kalutara", "Kandy",
  "Koggala", "Kosgoda", "Mirissa", "Matara", "Negombo",
  "Nilaveli", "Nuwara Eliya", "Pasikuda", "Polonnaruwa", "Sigiriya",
  "Tangalle", "Trincomalee", "Unawatuna", "Ulapane", "Wadduwa",
  "Waikkal", "Weligama", "Yala",
].sort();

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

function getCurrentMonthPrice(hotel) {
  if (!hotel.monthly_prices?.length) return null;
  const now = new Date();
  const probe = new Date(now.getFullYear(), now.getMonth(), 15);
  const match = hotel.monthly_prices.find(
    (mp) => new Date(mp.valid_from) <= probe && probe <= new Date(mp.valid_to)
  );
  if (match) return match;
  return [...hotel.monthly_prices].sort((a, b) => Number(a.price) - Number(b.price))[0] ?? null;
}

function formatMonthlyPrice(mp) {
  if (!mp) return null;
  const price = Number(mp.price);
  if (isNaN(price) || price <= 0) return null;
  const currency = mp.currency ?? "USD";
  return `From ${currency} ${price.toLocaleString()} / night`;
}

function computePriceBounds(hotels) {
  const prices = hotels
    .map(getCurrentMonthPrice)
    .filter(Boolean)
    .map((mp) => Number(mp.price))
    .filter((n) => !isNaN(n) && n > 0);
  if (!prices.length) return { min: 0, max: 800 };
  prices.sort((a, b) => a - b);
  const roundedMax = Math.ceil(prices[prices.length - 1] / 100) * 100;
  return { min: prices[0], max: roundedMax };
}

export default function IndividualStaysSriLanka() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [searchInput, setSearchInput] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [priceBounds, setPriceBounds] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilterParams, setActiveFilterParams] = useState({});
  const [showBudgetSlider, setShowBudgetSlider] = useState(false);

  const searchRef = useRef(null);
  const budgetLeaveTimer = useRef(null);

  const loadHotels = useCallback(async (extraParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchWellnessHotels(extraParams);
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

  const boundsInitialized = useRef(false);
  useEffect(() => {
    if (hotels.length > 0 && !boundsInitialized.current) {
      const bounds = computePriceBounds(hotels);
      setPriceBounds(bounds);
      setSelectedPrice([bounds.min, bounds.max]);
      boundsInitialized.current = true;
    }
  }, [hotels]);

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
    setSearchInput(hotel.name);
    setDisplayCount(INITIAL_DISPLAY);
    setShowDropdown(false);
    loadHotels({ ...activeFilterParams, search: hotel.name });
  };

  const handleSelectCity = (city) => {
    setSearchInput(city);
    setDisplayCount(INITIAL_DISPLAY);
    setShowDropdown(false);
    loadHotels({ ...activeFilterParams, location: city });
  };

  const applySearchInput = (input, params) => {
    const q = input.trim();
    if (!q) return;
    const matchedCity = SRI_LANKA_CITIES.find((c) => c.toLowerCase() === q.toLowerCase());
    if (matchedCity) params.location = matchedCity;
    else params.search = q;
  };

  // price is only applied on explicit Search click, not on other filter changes
  const buildParams = ({ month = selectedMonth, price = null, filters = activeFilterParams, search = searchInput } = {}) => {
    const params = { ...filters };
    applySearchInput(search, params);
    if (month) params.month = month;
    if (price) {
      params.min_price = price[0];
      params.max_price = price[1];
    }
    return params;
  };

  const handleSearchClick = () => {
    setDisplayCount(INITIAL_DISPLAY);
    setShowDropdown(false);
    loadHotels(buildParams({ price: selectedPrice }));
  };

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
    if (!value.trim()) {
      loadHotels(buildParams({ search: "" }));
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setDisplayCount(INITIAL_DISPLAY);
    loadHotels(buildParams({ month }));
  };

  const handlePriceChange = ([low, high]) => {
    setSelectedPrice([low, high]);
  };

  const handleInputFocus = () => setShowDropdown(true);
  const handleInputBlur = () => setTimeout(() => setShowDropdown(false), 150);

  const handleAdvancedFiltersApply = (filterParams) => {
    setActiveFilterParams(filterParams);
    setDisplayCount(INITIAL_DISPLAY);
    loadHotels(buildParams({ filters: filterParams }));
  };

  const q = searchInput.trim().toLowerCase();
  const matchingCities = q ? SRI_LANKA_CITIES.filter((c) => c.toLowerCase().includes(q)) : [];
  const matchingHotels = q
    ? hotels.filter((h) => (h.name ?? "").toLowerCase().includes(q)).slice(0, 5)
    : [];

  const priceFilteredHotels = hotels.filter((hotel) => {
    if (!selectedPrice || !priceBounds) return true;
    if (selectedPrice[0] <= priceBounds.min && selectedPrice[1] >= priceBounds.max) return true;
    const mp = getCurrentMonthPrice(hotel);
    if (!mp) return true;
    const price = Number(mp.price);
    return price >= selectedPrice[0] && price <= selectedPrice[1];
  });

  const hotelsToShow = priceFilteredHotels.slice(0, displayCount);

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">

      {/* Hero */}
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

      {/* Intro band */}
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

        {/* Search Bar — single line */}
        <div className="w-full bg-[#FFF8F2] rounded-xl shadow-sm border border-[#FFF0E0] px-6 sm:px-10 py-6 sm:py-8 mb-6 flex flex-col gap-4">

          {/* One unified bar: destination | month | price | search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 md:gap-0 md:divide-x md:divide-[#E0D4C8]">

            {/* Destination or Hotel */}
            <div className="flex-[2] flex flex-col relative md:pr-6" ref={searchRef}>
              <label
                htmlFor="hotel-search"
                className="text-xs tracking-[0.16em] text-[#181818] mb-1 uppercase"
                style={{ fontFamily: "Lato, sans-serif" }}
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
                onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                placeholder="City or hotel name"
                className="w-full text-sm text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] placeholder:text-[#8C8C8C]"
                style={{ fontFamily: "Lato, sans-serif" }}
              />
              {showDropdown && (matchingHotels.length > 0 || matchingCities.length > 0) && (
                <ul
                  className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-[#FFF0E0] py-2 max-h-60 overflow-y-auto z-50"
                  style={{ fontFamily: "Lato, sans-serif" }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {matchingHotels.length > 0 && (
                    <>
                      <li className="px-4 pt-1 pb-0.5 text-[10px] tracking-widest uppercase text-[#8C8C8C]">Hotels</li>
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
                  {matchingCities.length > 0 && (
                    <>
                      <li className="px-4 pt-2 pb-0.5 text-[10px] tracking-widest uppercase text-[#8C8C8C]">Cities</li>
                      {matchingCities.slice(0, 8).map((city) => (
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
                </ul>
              )}
            </div>

            {/* Month */}
            <div className="flex-1 flex flex-col md:px-6 transition-opacity duration-200">
              <label
                htmlFor="travel-month"
                className="text-xs tracking-[0.16em] text-[#181818] mb-1 uppercase"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Month
              </label>
              <select
                id="travel-month"
                value={selectedMonth}
                onChange={(e) => handleMonthChange(e.target.value)}
                className="w-full text-sm text-[#181818] bg-transparent border-b border-[#E0D4C8] py-1 focus:outline-none focus:border-[#5E17EB] appearance-none cursor-pointer"
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

            {/* Budget */}
            <div
              className="flex-1 flex flex-col md:px-6 relative transition-opacity duration-200"
              onMouseEnter={() => {
                if (budgetLeaveTimer.current) clearTimeout(budgetLeaveTimer.current);
                setShowBudgetSlider(true);
              }}
              onMouseLeave={() => {
                budgetLeaveTimer.current = setTimeout(() => setShowBudgetSlider(false), 120);
              }}
            >
              <label
                className="text-xs tracking-[0.16em] text-[#181818] mb-1 uppercase cursor-default"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Budget
              </label>
              <span
                className="text-sm text-[#8C8C8C] border-b border-[#E0D4C8] py-1 cursor-default"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                {selectedPrice && priceBounds
                  ? selectedPrice[0] <= priceBounds.min && selectedPrice[1] >= priceBounds.max
                    ? "Any price"
                    : `USD ${selectedPrice[0].toLocaleString()} – ${selectedPrice[1].toLocaleString()}+`
                  : "Any price"}
              </span>

              {showBudgetSlider && priceBounds && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-[#E0D4C8] px-6 pt-5 pb-5 z-50 w-80">
                  <p
                    className="text-xs text-[#5C5C5C] leading-relaxed mb-1"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Rates are estimates and may vary according to season, length of stay and services chosen.
                  </p>
                  <p
                    className="text-xs text-[#8C8C8C] italic mb-4"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Move the slider to select your price budget
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs tracking-[0.12em] uppercase text-[#181818]"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      Currency
                    </span>
                    <span
                      className="text-xs border border-[#E0D4C8] rounded-full px-3 py-1 text-[#181818]"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      USD ($)
                    </span>
                  </div>
                  <PriceRangeSlider
                    min={priceBounds.min}
                    max={priceBounds.max}
                    low={selectedPrice[0]}
                    high={selectedPrice[1]}
                    currency="USD"
                    onChange={handlePriceChange}
                  />
                </div>
              )}
            </div>

            {/* Search button */}
            <div className="md:pl-6 flex items-end">
              <button
                type="button"
                onClick={handleSearchClick}
                className="text-[#5E17EB] text-xs tracking-[0.16em] uppercase hover:underline cursor-pointer whitespace-nowrap pb-1"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Search &rarr;
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="border-t border-[#E0D4C8] pt-4 transition-opacity duration-200">
            <AdvancedFilters onApply={handleAdvancedFiltersApply} className="mb-0" />
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="relative mb-24 sm:mb-24">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-24 w-px bg-gray-900 transform -translate-x-1/2" />

          {loading && (
            <p className="text-center text-[#181818] py-12" style={{ fontFamily: "Lato, sans-serif" }}>
              Loading hotels…
            </p>
          )}
          {error && (
            <p className="text-center text-red-600 py-12" style={{ fontFamily: "Lato, sans-serif" }}>
              Failed to load hotels: {error}
            </p>
          )}
          {!loading && !error && priceFilteredHotels.length === 0 && (
            <p className="text-center text-[#181818] py-12" style={{ fontFamily: "Lato, sans-serif" }}>
              No hotels found. Try adjusting your filters.
            </p>
          )}
          {!loading && !error && priceFilteredHotels.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 items-start">
                {hotelsToShow.map((hotel, index) => {
                  const monthlyPrice = getCurrentMonthPrice(hotel);
                  const priceDisplay = formatMonthlyPrice(monthlyPrice) ?? hotel.price ?? null;
                  return (
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
                        <p className="text-sm text-[#5E17EB] mb-1" style={{ fontFamily: "Lato, sans-serif" }}>
                          {hotel.slogan_line}
                        </p>
                      )}
                      <p className="text-sm text-[#8C8C8C] mb-1" style={{ fontFamily: "Lato, sans-serif" }}>
                        {hotel.location}
                      </p>
                      {priceDisplay && (
                        <p className="text-sm font-medium text-[#181818] mb-2" style={{ fontFamily: "Lato, sans-serif" }}>
                          {priceDisplay}
                        </p>
                      )}
                      {hotel.facilities && hotel.facilities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.facilities.slice(0, 4).map((f) => (
                            <span
                              key={f.facility_id}
                              className="text-xs px-2 py-1 bg-[#FFF0E0] rounded"
                              style={{ fontFamily: "Lato, sans-serif" }}
                            >
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
                  );
                })}
              </div>

              {displayCount < priceFilteredHotels.length && (
                <div className="text-center mt-24">
                  <button
                    type="button"
                    onClick={() => setDisplayCount((prev) => Math.min(prev + INITIAL_DISPLAY, priceFilteredHotels.length))}
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
