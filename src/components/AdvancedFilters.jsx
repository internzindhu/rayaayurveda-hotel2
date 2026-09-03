import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchLookups } from "../lib/wellnessApi";

const PROPERTY_TYPE_OPTIONS = [
  { value: "Ayurveda Only", label: "Ayurveda Only" },
  { value: "Wellness", label: "Wellness (Ayurveda + Spa Available)" },
  { value: "Leisure", label: "Leisure (Wellness and Spa available)" },
];

const MIN_NIGHTS_STOPS = [
  { value: "", label: "Any" },
  { value: "1", label: "1" },
  { value: "3", label: "3" },
  { value: "5", label: "5" },
  { value: "7", label: "7" },
  { value: "14", label: "14+" },
];

const INITIAL_FILTERS = {
  propertyTypes: [],
  minNights: "",
  doctorsAvailable: "",
  facilityIds: [],
  activityIds: [],
  mealPlanIds: [],
  cuisineTypeIds: [],
  diningFeatureIds: [],
  roomFeatureIds: [],
  restrictionIds: [],
  wellnessOfferingIds: [],
};

const MEAL_PLAN_INFO = {
  "AI Ayurveda": "AI Ayurveda — Accommodation + 3 meals + Ayurveda treatments + Selected wellness activities",
};

function countActive(f) {
  return (
    f.propertyTypes.length +
    (f.minNights ? 1 : 0) +
    (f.doctorsAvailable ? 1 : 0) +
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

function CheckboxItem({ label, description, info, checked, onChange }) {
  const [showInfo, setShowInfo] = useState(false);
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
      <div className="flex flex-col min-w-0">
        <span
          className="text-sm text-[#181818] leading-snug inline-flex items-center gap-1.5"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {label}
          {info && (
            <span
              className="relative inline-flex"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              onClick={(e) => e.preventDefault()}
            >
              <Info size={13} className="text-[#8C8C8C] hover:text-[#5E17EB] transition-colors" />
              {showInfo && (
                <span
                  role="tooltip"
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 z-50 w-56 px-3 py-2 rounded bg-[#181818] text-white text-xs leading-relaxed shadow-lg"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {info}
                </span>
              )}
            </span>
          )}
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

function MinNightsSlider({ value, onChange, stops }) {
  const currentIndex = Math.max(
    0,
    stops.findIndex((s) => s.value === value)
  );
  const percent = (currentIndex / (stops.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-8 flex items-center">
        <div className="absolute left-0 right-0 h-[3px] rounded-full bg-[#E8E3DC]" />
        <div
          className="absolute left-0 h-[3px] rounded-full bg-[#5E17EB] transition-all"
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          min={0}
          max={stops.length - 1}
          step={1}
          value={currentIndex}
          onChange={(e) => onChange(stops[Number(e.target.value)].value)}
          className="min-nights-range absolute left-0 right-0 w-full appearance-none bg-transparent cursor-pointer"
          aria-label="Minimum nights stay"
        />
      </div>
      <div className="flex justify-between mt-1">
        {stops.map((s) => (
          <span
            key={s.label}
            className={`text-xs ${
              s.value === value ? "text-[#181818] font-semibold" : "text-[#8C8C8C]"
            }`}
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            {s.label}
          </span>
        ))}
      </div>
      <style>{`
        .min-nights-range::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #5E17EB;
          cursor: pointer;
          margin-top: 0;
        }
        .min-nights-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #5E17EB;
          cursor: pointer;
        }
        .min-nights-range::-webkit-slider-runnable-track {
          height: 3px;
          background: transparent;
        }
        .min-nights-range::-moz-range-track {
          height: 3px;
          background: transparent;
        }
      `}</style>
    </div>
  );
}

function LookupCheckboxList({ items, selectedIds, onToggle, loading, infoMap }) {
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
          info={infoMap?.[item.name]}
          checked={selectedIds.includes(item.id)}
          onChange={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdvancedFilters({ onApply, className = "mb-8", open: openProp, onOpenChange, disabled = false }) {
  const [openInternal, setOpenInternal] = useState(false);
  const open = openProp !== undefined ? openProp : openInternal;
  const setOpen = (v) => {
    const next = typeof v === "function" ? v(open) : v;
    if (onOpenChange) onOpenChange(next);
    else setOpenInternal(next);
  };
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [lookups, setLookups] = useState(null);
  const [lookupsLoading, setLookupsLoading] = useState(true);
  const onApplyRef = useRef(onApply);
  useEffect(() => { onApplyRef.current = onApply; });

  // Load lookups once on mount so the real (integer) option IDs are ready
  // before the user can interact with any checkbox. This is what keeps the
  // IDs stored in `filters` aligned with the join IDs on each hotel record.
  useEffect(() => {
    let cancelled = false;
    setLookupsLoading(true);
    fetchLookups()
      .then((data) => { if (!cancelled) setLookups(data); })
      .catch(() => { if (!cancelled) setLookups({}); })
      .finally(() => { if (!cancelled) setLookupsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Notify parent of filter changes for client-side filtering — no API call
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onApplyRef.current) onApplyRef.current(filters);
    }, 150);
    return () => clearTimeout(timer);
  }, [filters]);

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

  // Options come straight from the loaded lookups (real integer IDs).
  const lk = lookups ?? {};
  const roomFeatures = lk.room_features ?? [];
  const mealPlans = lk.meal_plans ?? [];
  const wellnessOfferings = lk.wellness_offerings ?? [];
  const facilities = lk.facilities ?? [];
  const diningFeatures = lk.dining_features ?? [];
  const restrictions = lk.restrictions ?? [];
  const cuisineTypes = lk.cuisine_types ?? [];
  const activities = lk.activities ?? [];

  return (
    <div className={`w-full ${className}`}>
      {/* Toggle row */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
          title={disabled ? "Search first to enable filters" : undefined}
          className={`flex items-center gap-2.5 text-sm transition-colors group ${
            disabled ? "opacity-40 cursor-not-allowed" : "text-[#181818] hover:text-[#5E17EB]"
          }`}
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          <SlidersHorizontal
            size={16}
            className={disabled ? "text-[#AAAAAA]" : "text-[#5E17EB] group-hover:scale-110 transition-transform"}
          />
          <span className="tracking-[0.12em] uppercase text-xs font-medium">Advanced Filters</span>
          {!disabled && activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5E17EB] text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
          {!disabled && (open ? (
            <ChevronUp size={14} className="text-[#5E17EB]" />
          ) : (
            <ChevronDown size={14} className="text-[#5E17EB]" />
          ))}
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
                        className="text-sm text-[#181818] mb-3"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
                        Minimum Nights Stay
                      </p>
                      <MinNightsSlider
                        value={filters.minNights}
                        onChange={set("minNights")}
                        stops={MIN_NIGHTS_STOPS}
                      />
                    </div>
                  </div>

                  <SectionDivider />

                  {/* Ayurveda / Wellness Offering */}
                  <SectionTitle>Ayurveda / Wellness Offering</SectionTitle>
                  <LookupCheckboxList
                    items={wellnessOfferings}
                    selectedIds={filters.wellnessOfferingIds}
                    onToggle={toggleId("wellnessOfferingIds")}
                    loading={lookupsLoading}
                  />

                  <SectionDivider />

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
                  </div>
                </div>

                {/* ── Middle Column ── */}
                <div className="py-8 lg:py-0 lg:px-8">

                  {/* Meal Plans */}
                  <SectionTitle>Meal Plans</SectionTitle>
                  <LookupCheckboxList
                    items={mealPlans}
                    selectedIds={filters.mealPlanIds}
                    onToggle={toggleId("mealPlanIds")}
                    loading={lookupsLoading}
                    infoMap={MEAL_PLAN_INFO}
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

                  {/* Cuisine Type */}
                  <SectionTitle>Cuisine Type</SectionTitle>
                  <LookupCheckboxList
                    items={cuisineTypes}
                    selectedIds={filters.cuisineTypeIds}
                    onToggle={toggleId("cuisineTypeIds")}
                    loading={lookupsLoading}
                  />

                  <SectionDivider />

                  {/* Room Features */}
                  <SectionTitle>Room Features</SectionTitle>
                  <LookupCheckboxList
                    items={roomFeatures}
                    selectedIds={filters.roomFeatureIds}
                    onToggle={toggleId("roomFeatureIds")}
                    loading={lookupsLoading}
                  />
                </div>

                {/* ── Right Column ── */}
                <div className="pt-8 lg:pt-0 lg:pl-8">

                  {/* Facilities */}
                  <SectionTitle>Facilities</SectionTitle>
                  <LookupCheckboxList
                    items={facilities}
                    selectedIds={filters.facilityIds}
                    onToggle={toggleId("facilityIds")}
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
