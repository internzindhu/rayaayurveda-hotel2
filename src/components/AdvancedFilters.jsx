import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchLookups } from "../lib/wellnessApi";

const PROPERTY_TYPE_OPTIONS = [
  { value: "Ayurveda Only", label: "Ayurveda Only" },
  { value: "Wellness", label: "Wellness (Ayurveda + Spa Available)" },
  { value: "Leisure", label: "Leisure (Wellness and Spa available)" },
];

const MIN_NIGHTS_OPTIONS = ["1", "3", "5", "7", "14", "Other"];
const MAX_OCCUPANCY_OPTIONS = ["1", "3", "Other"];

const INITIAL_FILTERS = {
  propertyTypes: [],
  minNights: "",
  maxOccupancy: "",
  doctorsAvailable: "",
  medicalReportSupport: "",
  facilityIds: [],
  activityIds: [],
  mealPlanIds: [],
  cuisineTypeIds: [],
  diningFeatureIds: [],
  roomFeatureIds: [],
  restrictionIds: [],
  wellnessOfferingIds: [],
  swimmingPool: false,
};

function countActive(f) {
  return (
    f.propertyTypes.length +
    (f.minNights && f.minNights !== "Other" ? 1 : 0) +
    (f.maxOccupancy && f.maxOccupancy !== "Other" ? 1 : 0) +
    (f.doctorsAvailable ? 1 : 0) +
    (f.medicalReportSupport ? 1 : 0) +
    (f.swimmingPool ? 1 : 0) +
    f.facilityIds.length +
    f.activityIds.length +
    f.mealPlanIds.length +
    f.cuisineTypeIds.length +
    f.diningFeatureIds.length +
    f.roomFeatureIds.length +
    f.restrictionIds.length +
    f.wellnessOfferingIds.length
  );
}

function buildApiParams(f) {
  const p = {};
  if (f.propertyTypes.length > 0) p.property_type = f.propertyTypes[0];
  if (f.minNights && f.minNights !== "Other") p.min_nights = f.minNights;
  if (f.maxOccupancy && f.maxOccupancy !== "Other") p.max_occupancy = f.maxOccupancy;
  if (f.doctorsAvailable) p.doctors_available = f.doctorsAvailable;
  if (f.medicalReportSupport) p.medical_report_support = f.medicalReportSupport;
  if (f.swimmingPool) p.swimming_pool = true;
  if (f.facilityIds.length) p.facilities = f.facilityIds.join(",");
  if (f.activityIds.length) p.activities = f.activityIds.join(",");
  if (f.mealPlanIds.length) p.meal_plans = f.mealPlanIds.join(",");
  if (f.cuisineTypeIds.length) p.cuisine_types = f.cuisineTypeIds.join(",");
  if (f.diningFeatureIds.length) p.dining_features = f.diningFeatureIds.join(",");
  if (f.roomFeatureIds.length) p.room_features = f.roomFeatureIds.join(",");
  if (f.restrictionIds.length) p.restrictions = f.restrictionIds.join(",");
  if (f.wellnessOfferingIds.length) p.wellness_offerings = f.wellnessOfferingIds.join(",");
  return p;
}

// ─── Small UI pieces ──────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <div className="mb-4">
      <h4
        className="text-[15px] font-medium text-[#181818] mb-2"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {children}
      </h4>
      <div className="border-b border-[#D5CFC9]" />
    </div>
  );
}

function SectionDivider() {
  return <div className="my-6 border-b border-[#D5CFC9]" />;
}

function CheckboxItem({ label, description, checked, onChange }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group mb-3 last:mb-0">
      <div className="relative flex-shrink-0 mt-[3px]">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div
          className={`w-[15px] h-[15px] border transition-all flex items-center justify-center ${
            checked
              ? "bg-[#181818] border-[#181818]"
              : "bg-white border-[#AAAAAA] group-hover:border-[#181818]"
          }`}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 3.5L3.5 6.5L9 1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span
          className="text-sm text-[#181818] leading-snug"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {label}
        </span>
        {description && (
          <span
            className="text-xs text-[#8C8C8C] mt-0.5 leading-relaxed"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

function PillButton({ label, active, onClick }) {
  const isWide = label === "Other";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${isWide ? "px-4" : "w-10"} h-10 rounded-full text-sm border transition-all flex items-center justify-center ${
        active
          ? "border-[#181818] text-[#181818] font-semibold bg-white"
          : "border-[#AAAAAA] text-[#181818] bg-white hover:border-[#181818]"
      }`}
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      {label}
    </button>
  );
}

function YesNoButtons({ value, onChange }) {
  return (
    <div className="flex gap-2 mt-1">
      <button
        type="button"
        onClick={() => onChange(value === "yes" ? "" : "yes")}
        className={`px-10 py-2 text-sm border transition-all ${
          value === "yes"
            ? "border-[#181818] bg-white text-[#181818] font-medium"
            : "border-[#AAAAAA] bg-white text-[#181818] hover:border-[#181818]"
        }`}
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange(value === "no" ? "" : "no")}
        className={`px-10 py-2 text-sm border transition-all ${
          value === "no"
            ? "border-[#181818] bg-white text-[#181818] font-medium"
            : "border-[#AAAAAA] bg-white text-[#181818] hover:border-[#181818]"
        }`}
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        No
      </button>
    </div>
  );
}

function LookupCheckboxList({ items, selectedIds, onToggle, loading }) {
  if (loading)
    return (
      <p className="text-xs text-[#8C8C8C]" style={{ fontFamily: "Lato" }}>
        Loading…
      </p>
    );
  if (!items.length)
    return (
      <p className="text-xs text-[#8C8C8C]" style={{ fontFamily: "Lato" }}>
        None available
      </p>
    );
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <CheckboxItem
          key={item.id}
          label={item.name}
          description={item.description}
          checked={selectedIds.includes(item.id)}
          onChange={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}

// ─── Static fallback data matching the image exactly ─────────────────────────

const STATIC_ROOM_FEATURES = [
  { id: "rf1", name: "Air Conditioning" },
  { id: "rf2", name: "No Air Conditioning" },
  { id: "rf3", name: "Private Pool" },
  { id: "rf4", name: "Bathtub" },
  { id: "rf5", name: "Shower" },
  { id: "rf6", name: "TV" },
];

const STATIC_MEAL_PLANS = [
  { id: "mp1", name: "Al Ayurveda", description: "Accommodation + 3 meals + Ayurveda treatments + Selected wellness activities" },
  { id: "mp2", name: "Ayurveda Full Board", description: "Breakfast, lunch & dinner + Ayurveda treatments" },
  { id: "mp3", name: "Full Board", description: "Breakfast, lunch, dinner" },
  { id: "mp4", name: "Half Board", description: "Breakfast + dinner" },
  { id: "mp5", name: "Bed & Breakfast", description: "Breakfast only" },
  { id: "mp6", name: "Wellness Full Board", description: "3 meals + wellness activities" },
];

const STATIC_WELLNESS_OFFERINGS = [
  { id: "wo1", name: "Full Ayurveda Only", description: "Structured program including treatments, meals & consultations" },
  { id: "wo2", name: "Wellness Programs", description: "General wellness (spa, yoga, relaxation)" },
  { id: "wo3", name: "Leisure + Ayurveda/Wellness included" },
  { id: "wo4", name: "Leisure + Ayurveda/Wellness (separate packages)" },
];

const STATIC_FACILITIES = [
  { id: "f1", name: "Spa" },
  { id: "f2", name: "Yoga Pavilion" },
  { id: "f3", name: "Sauna" },
  { id: "f4", name: "Steam Room" },
  { id: "f5", name: "Gym / Fitness Centre" },
  { id: "f6", name: "Pilates" },
  { id: "f7", name: "Restaurant" },
  { id: "f8", name: "Free WiFi" },
  { id: "f9", name: "Airport Transfers" },
  { id: "f10", name: "Wheelchair Accessible" },
  { id: "f11", name: "Disability-Friendly Rooms" },
];

const STATIC_DINING_FEATURES = [
  { id: "df1", name: "Doctor-Prescribed Meals", description: "Customized after first doctor consultation" },
  { id: "df2", name: "Dosha-Based Meals", description: "Meals designed to balance Vata, Pitta, and Kapha" },
  { id: "df3", name: "Ayurveda Dining", description: "Meals prepared based on Ayurvedic principles" },
  { id: "df4", name: "Wellness Dining", description: "Light, balanced meals focused on health and digestion" },
  { id: "df5", name: "Herbal Teas / Fresh Juices", description: "Daily Ayurvedic infusions served alongside meals" },
  { id: "df6", name: "No Processed Sugar", description: "Meals prepared using natural sweeteners instead of refined sugar" },
  { id: "df7", name: "No Red Meat", description: "Meals exclude beef, pork, and similar meats" },
  { id: "df8", name: "No Restrictions", description: "No specific dietary restrictions applied to meals" },
];

const STATIC_RESTRICTIONS = [
  { id: "r1", name: "No Alcohol" },
  { id: "r2", name: "No Smoking" },
  { id: "r3", name: "No Restrictions" },
  { id: "r4", name: "Kid Friendly (11.99 years and below)" },
];

const STATIC_CUISINE_TYPES = [
  { id: "ct1", name: "Ayurveda Cuisine", description: "Based on Ayurvedic principles to balance doshas" },
  { id: "ct2", name: "Wellness Cuisine", description: "Healthy, balanced meals for overall wellbeing" },
  { id: "ct3", name: "Vegetarian", description: "No meat or seafood" },
  { id: "ct4", name: "Vegan", description: "No animal products, only plant based" },
  { id: "ct5", name: "Vegetarian & Non-Vegetarian" },
  { id: "ct6", name: "Non-Vegetarian" },
  { id: "ct7", name: "Satvik / Yogic Food", description: "Pure vegetarian, light meals promoting balance and clarity" },
  { id: "ct8", name: "Organic", description: "Uses organically sourced ingredients (no chemicals/pesticides)" },
  { id: "ct9", name: "Garden-to-Table", description: "Fresh, locally sourced ingredients (Focus on freshness)" },
];

const STATIC_ACTIVITIES = [
  { id: "a1", name: "Yoga / Breathwork" },
  { id: "a2", name: "Meditation" },
  { id: "a3", name: "Tai Chi / Qi Gong", description: "Gentle mind-body movement practices" },
  { id: "a4", name: "Reiki / Energy Healing", description: "Holistic energy balancing treatments" },
  { id: "a5", name: "Sound Healing/Music Therapy", description: "Therapeutic sound-based relaxation sessions" },
  { id: "a6", name: "Aromatherapy", description: "Use of essential oils for relaxation and wellbeing" },
  { id: "a7", name: "Pilates", description: "Core-strengthening and flexibility exercises" },
  { id: "a8", name: "Fitness / Gym Sessions" },
  { id: "a9", name: "Arts & Crafts / Learning", description: "Cooking classes, painting, local craft workshops, herbal workshops" },
  { id: "a10", name: "Religious / Spiritual Activities", description: "Temple visits, spiritual rituals, monk-led sessions" },
  { id: "a11", name: "Cultural Experiences", description: "Village tours, city tours, cooking demonstrations" },
  { id: "a12", name: "Nature Activities", description: "Nature walks, bird watching, cycling, hiking, garden tours" },
  { id: "a13", name: "Water / Beach Activities", description: "Swimming, beach relaxation, snorkeling, diving, surfing" },
  { id: "a14", name: "Sports & Leisure Activities", description: "Gym, Tennis, Golf, badminton and indoor games" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdvancedFilters({ onApply }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [lookups, setLookups] = useState(null);
  const [lookupsLoading, setLookupsLoading] = useState(false);
  const onApplyRef = useRef(onApply);
  useEffect(() => { onApplyRef.current = onApply; });

  useEffect(() => {
    if (!open || lookups) return;
    setLookupsLoading(true);
    fetchLookups()
      .then((data) => setLookups(data))
      .catch(() => setLookups({}))
      .finally(() => setLookupsLoading(false));
  }, [open, lookups]);

  // Auto-apply with debounce
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      if (onApplyRef.current) onApplyRef.current(buildApiParams(filters));
    }, 400);
    return () => clearTimeout(timer);
  }, [filters, open]);

  const activeCount = countActive(filters);

  const set = (key) => (value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const toggleId = (key) => (id) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((v) => v !== id) : [...prev[key], id],
    }));

  const togglePropertyType = (value) =>
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(value)
        ? prev.propertyTypes.filter((v) => v !== value)
        : [...prev.propertyTypes, value],
    }));

  const handleClear = () => {
    setFilters(INITIAL_FILTERS);
    if (onApply) onApply({});
  };

  // Merge API lookups with static fallbacks
  const lk = lookups ?? {};
  const roomFeatures = lk.room_features?.length ? lk.room_features : STATIC_ROOM_FEATURES;
  const mealPlans = lk.meal_plans?.length ? lk.meal_plans : STATIC_MEAL_PLANS;
  const wellnessOfferings = lk.wellness_offerings?.length ? lk.wellness_offerings : STATIC_WELLNESS_OFFERINGS;
  const facilities = lk.facilities?.length ? lk.facilities : STATIC_FACILITIES;
  const diningFeatures = lk.dining_features?.length ? lk.dining_features : STATIC_DINING_FEATURES;
  const restrictions = lk.restrictions?.length ? lk.restrictions : STATIC_RESTRICTIONS;
  const cuisineTypes = lk.cuisine_types?.length ? lk.cuisine_types : STATIC_CUISINE_TYPES;
  const activities = lk.activities?.length ? lk.activities : STATIC_ACTIVITIES;

  return (
    <div className="w-full mb-8">
      {/* Toggle row */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2.5 text-sm text-[#181818] hover:text-[#5E17EB] transition-colors group"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          <SlidersHorizontal
            size={16}
            className="text-[#5E17EB] group-hover:scale-110 transition-transform"
          />
          <span className="tracking-[0.12em] uppercase text-xs font-medium">Advanced Filters</span>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5E17EB] text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
          {open ? (
            <ChevronUp size={14} className="text-[#5E17EB]" />
          ) : (
            <ChevronDown size={14} className="text-[#5E17EB]" />
          )}
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="af-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-white border border-[#E8E3DC] p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#D5CFC9]">

                {/* ── Left Column ── */}
                <div className="pb-8 lg:pb-0 lg:pr-8">

                  {/* Property Type */}
                  <SectionTitle>Property Type</SectionTitle>
                  <div className="flex flex-col">
                    {PROPERTY_TYPE_OPTIONS.map((opt) => (
                      <CheckboxItem
                        key={opt.value}
                        label={opt.label}
                        checked={filters.propertyTypes.includes(opt.value)}
                        onChange={() => togglePropertyType(opt.value)}
                      />
                    ))}
                  </div>

                  <SectionDivider />

                  {/* Stay Details */}
                  <SectionTitle>Stay Details</SectionTitle>
                  <div className="flex flex-col gap-5">
                    <div>
                      <p
                        className="text-sm text-[#181818] mb-2"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
                        Minimum Nights Stay
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {MIN_NIGHTS_OPTIONS.map((n) => (
                          <PillButton
                            key={n}
                            label={n}
                            active={filters.minNights === n}
                            onClick={() => set("minNights")(filters.minNights === n ? "" : n)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-sm text-[#181818] mb-2"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
                        Maximum Occupancy Per Room
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {MAX_OCCUPANCY_OPTIONS.map((n) => (
                          <PillButton
                            key={n}
                            label={n}
                            active={filters.maxOccupancy === n}
                            onClick={() => set("maxOccupancy")(filters.maxOccupancy === n ? "" : n)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <SectionDivider />

                  {/* Room Features */}
                  <SectionTitle>Room Features</SectionTitle>
                  <LookupCheckboxList
                    items={roomFeatures}
                    selectedIds={filters.roomFeatureIds}
                    onToggle={toggleId("roomFeatureIds")}
                    loading={lookupsLoading}
                  />

                  <SectionDivider />

                  {/* Meal Plans */}
                  <SectionTitle>Meal Plans</SectionTitle>
                  <LookupCheckboxList
                    items={mealPlans}
                    selectedIds={filters.mealPlanIds}
                    onToggle={toggleId("mealPlanIds")}
                    loading={lookupsLoading}
                  />

                  <SectionDivider />

                  {/* Ayurveda / Wellness Offering */}
                  <SectionTitle>Ayurveda / Wellness Offering</SectionTitle>
                  <LookupCheckboxList
                    items={wellnessOfferings}
                    selectedIds={filters.wellnessOfferingIds}
                    onToggle={toggleId("wellnessOfferingIds")}
                    loading={lookupsLoading}
                  />
                </div>

                {/* ── Middle Column ── */}
                <div className="py-8 lg:py-0 lg:px-8">

                  {/* Medical & Ayurveda Support */}
                  <SectionTitle>Medical &amp; Ayurveda Support</SectionTitle>
                  <div className="flex flex-col gap-5">
                    <div>
                      <p
                        className="text-sm text-[#181818] mb-1"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
                        Doctor(s) available on-site
                      </p>
                      <YesNoButtons
                        value={filters.doctorsAvailable}
                        onChange={set("doctorsAvailable")}
                      />
                    </div>
                    <div>
                      <p
                        className="text-sm text-[#181818] mb-1"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
                        Assist with Obtaining Medical Reports
                      </p>
                      <YesNoButtons
                        value={filters.medicalReportSupport}
                        onChange={set("medicalReportSupport")}
                      />
                    </div>
                  </div>

                  <SectionDivider />

                  {/* Facilities — "Swimming Pool" is a plain label, rest are checkboxes */}
                  <SectionTitle>Facilities</SectionTitle>
                  <div className="mb-3">
                    <span
                      className="text-sm text-[#181818] leading-snug"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      Swimming Pool
                    </span>
                  </div>
                  <LookupCheckboxList
                    items={facilities}
                    selectedIds={filters.facilityIds}
                    onToggle={toggleId("facilityIds")}
                    loading={lookupsLoading}
                  />

                  <SectionDivider />

                  {/* Dining Features */}
                  <SectionTitle>Dining Features</SectionTitle>
                  <LookupCheckboxList
                    items={diningFeatures}
                    selectedIds={filters.diningFeatureIds}
                    onToggle={toggleId("diningFeatureIds")}
                    loading={lookupsLoading}
                  />

                  <SectionDivider />

                  {/* Restrictions */}
                  <SectionTitle>Restrictions</SectionTitle>
                  <LookupCheckboxList
                    items={restrictions}
                    selectedIds={filters.restrictionIds}
                    onToggle={toggleId("restrictionIds")}
                    loading={lookupsLoading}
                  />
                </div>

                {/* ── Right Column ── */}
                <div className="pt-8 lg:pt-0 lg:pl-8">

                  {/* Cuisine Type */}
                  <SectionTitle>Cuisine Type</SectionTitle>
                  <LookupCheckboxList
                    items={cuisineTypes}
                    selectedIds={filters.cuisineTypeIds}
                    onToggle={toggleId("cuisineTypeIds")}
                    loading={lookupsLoading}
                  />

                  <SectionDivider />

                  {/* Activities & Experiences */}
                  <SectionTitle>Activities &amp; Experiences</SectionTitle>
                  <LookupCheckboxList
                    items={activities}
                    selectedIds={filters.activityIds}
                    onToggle={toggleId("activityIds")}
                    loading={lookupsLoading}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-[#D5CFC9] flex justify-end">
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#181818] border border-[#AAAAAA] hover:border-[#181818] transition-colors"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Clear
                  <span className="text-base leading-none">×</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}