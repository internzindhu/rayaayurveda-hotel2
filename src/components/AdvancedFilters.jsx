import { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchLookups } from "../lib/wellnessApi";

const PROPERTY_TYPE_OPTIONS = ["Ayurveda Only", "Wellness", "Leisure"];
const MIN_NIGHTS_OPTIONS = ["1", "3", "5", "7", "14"];
const MAX_OCCUPANCY_OPTIONS = ["2", "3"];

const INITIAL_FILTERS = {
  propertyType: "",
  minNights: "",
  maxOccupancy: "",
  doctorsAvailable: "",
  medicalReportSupport: "",
  kidFriendly: false,
  facilityIds: [],
  activityIds: [],
  mealPlanIds: [],
  cuisineTypeIds: [],
  diningFeatureIds: [],
  roomFeatureIds: [],
  restrictionIds: [],
  wellnessOfferingIds: [],
};

function countActive(f) {
  return (
    (f.propertyType ? 1 : 0) +
    (f.minNights ? 1 : 0) +
    (f.maxOccupancy ? 1 : 0) +
    (f.doctorsAvailable ? 1 : 0) +
    (f.medicalReportSupport ? 1 : 0) +
    (f.kidFriendly ? 1 : 0) +
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
  if (f.propertyType) p.property_type = f.propertyType;
  if (f.minNights) p.min_nights = f.minNights;
  if (f.maxOccupancy) p.max_occupancy = f.maxOccupancy;
  if (f.doctorsAvailable) p.doctors_available = f.doctorsAvailable;
  if (f.medicalReportSupport) p.medical_report_support = f.medicalReportSupport;
  if (f.kidFriendly) p.kid_friendly = "true";
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

// ─── Small reusable UI pieces ─────────────────────────────────────────────────

function FilterSection({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h4
        className="text-[11px] tracking-[0.18em] text-[#5E17EB] uppercase font-semibold pb-2 border-b border-[#EDE8E2]"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckboxOption({ label, checked, onChange }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group" style={{ fontFamily: "Lato, sans-serif" }}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div
          className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
            checked ? "bg-[#5E17EB] border-[#5E17EB]" : "bg-white border-[#C8BEB4] group-hover:border-[#5E17EB]"
          }`}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
              <path d="M1 3.5L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-[#181818] leading-snug group-hover:text-[#5E17EB] transition-colors">{label}</span>
    </label>
  );
}

function RadioOption({ label, name, value, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group" style={{ fontFamily: "Lato, sans-serif" }}>
      <div className="relative flex-shrink-0">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
            checked ? "border-[#5E17EB]" : "border-[#C8BEB4] group-hover:border-[#5E17EB]"
          }`}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-[#5E17EB]" />}
        </div>
      </div>
      <span className="text-sm text-[#181818] group-hover:text-[#5E17EB] transition-colors">{label}</span>
    </label>
  );
}

function YesNoToggle({ name, value, onChange }) {
  return (
    <div className="flex gap-4">
      <RadioOption label="Yes" name={name} value="yes" checked={value === "yes"} onChange={() => onChange(value === "yes" ? "" : "yes")} />
      <RadioOption label="No" name={name} value="no" checked={value === "no"} onChange={() => onChange(value === "no" ? "" : "no")} />
    </div>
  );
}

function LookupCheckboxList({ items, selectedIds, onToggle, loading }) {
  if (loading) return <p className="text-xs text-[#8C8C8C]" style={{ fontFamily: "Lato" }}>Loading…</p>;
  if (!items.length) return <p className="text-xs text-[#8C8C8C]" style={{ fontFamily: "Lato" }}>None available</p>;
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <CheckboxOption
          key={item.id}
          label={item.name}
          checked={selectedIds.includes(item.id)}
          onChange={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdvancedFilters({ onApply }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [lookups, setLookups] = useState(null);
  const [lookupsLoading, setLookupsLoading] = useState(false);

  // Fetch lookups the first time the panel is opened
  useEffect(() => {
    if (!open || lookups) return;
    setLookupsLoading(true);
    fetchLookups()
      .then((data) => setLookups(data))
      .catch(() => setLookups({}))
      .finally(() => setLookupsLoading(false));
  }, [open, lookups]);

  const activeCount = countActive(filters);

  const set = (key) => (value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const toggleId = (key) => (id) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((v) => v !== id) : [...prev[key], id],
    }));

  const handleClear = () => {
    setFilters(INITIAL_FILTERS);
    if (onApply) onApply({});
  };

  const handleApply = () => {
    if (onApply) onApply(buildApiParams(filters));
    setOpen(false);
  };

  const lk = lookups ?? {};
  const isLoading = lookupsLoading;

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
          <SlidersHorizontal size={16} className="text-[#5E17EB] group-hover:scale-110 transition-transform" />
          <span className="tracking-[0.12em] uppercase text-xs font-medium">Advanced Filters</span>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5E17EB] text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
          {open ? <ChevronUp size={14} className="text-[#5E17EB]" /> : <ChevronDown size={14} className="text-[#5E17EB]" />}
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 text-xs text-[#8C8C8C] hover:text-[#181818] transition-colors"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            <X size={12} />
            Clear all filters
          </button>
        )}
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
            <div className="mt-4 bg-[#FDFAF7] rounded-xl border border-[#EDE8E2] p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Property Type */}
                <FilterSection title="Property Type">
                  <div className="flex flex-col gap-2">
                    {PROPERTY_TYPE_OPTIONS.map((type) => (
                      <RadioOption
                        key={type}
                        label={type}
                        name="property-type"
                        value={type}
                        checked={filters.propertyType === type}
                        onChange={() => set("propertyType")(filters.propertyType === type ? "" : type)}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Stay Details */}
                <FilterSection title="Stay Details">
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs text-[#8C8C8C] uppercase tracking-widest mb-2" style={{ fontFamily: "Lato" }}>
                        Minimum Nights
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {MIN_NIGHTS_OPTIONS.map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => set("minNights")(filters.minNights === n ? "" : n)}
                            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                              filters.minNights === n
                                ? "bg-[#5E17EB] border-[#5E17EB] text-white"
                                : "bg-white border-[#C8BEB4] text-[#181818] hover:border-[#5E17EB]"
                            }`}
                            style={{ fontFamily: "Lato" }}
                          >
                            {n} nights
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#8C8C8C] uppercase tracking-widest mb-2" style={{ fontFamily: "Lato" }}>
                        Max Occupancy Per Room
                      </p>
                      <div className="flex gap-3">
                        {MAX_OCCUPANCY_OPTIONS.map((n) => (
                          <RadioOption
                            key={n}
                            label={`${n} guests`}
                            name="max-occupancy"
                            value={n}
                            checked={filters.maxOccupancy === n}
                            onChange={() => set("maxOccupancy")(filters.maxOccupancy === n ? "" : n)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <CheckboxOption
                        label="Kid Friendly (11.99 years and below)"
                        checked={filters.kidFriendly}
                        onChange={() => set("kidFriendly")(!filters.kidFriendly)}
                      />
                    </div>
                  </div>
                </FilterSection>

                {/* Medical & Ayurveda Support */}
                <FilterSection title="Medical & Ayurveda Support">
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs text-[#8C8C8C] uppercase tracking-widest mb-2" style={{ fontFamily: "Lato" }}>
                        Doctor(s) on-site
                      </p>
                      <YesNoToggle name="doctor-on-site" value={filters.doctorsAvailable} onChange={set("doctorsAvailable")} />
                    </div>
                    <div>
                      <p className="text-xs text-[#8C8C8C] uppercase tracking-widest mb-2" style={{ fontFamily: "Lato" }}>
                        Assists with Medical Reports
                      </p>
                      <YesNoToggle name="assist-medical" value={filters.medicalReportSupport} onChange={set("medicalReportSupport")} />
                    </div>
                  </div>
                </FilterSection>

                {/* Wellness Offerings */}
                <FilterSection title="Ayurveda / Wellness Offering">
                  <LookupCheckboxList
                    items={lk.wellness_offerings ?? []}
                    selectedIds={filters.wellnessOfferingIds}
                    onToggle={toggleId("wellnessOfferingIds")}
                    loading={isLoading}
                  />
                </FilterSection>

                {/* Meal Plans */}
                <FilterSection title="Meal Plans">
                  <LookupCheckboxList
                    items={lk.meal_plans ?? []}
                    selectedIds={filters.mealPlanIds}
                    onToggle={toggleId("mealPlanIds")}
                    loading={isLoading}
                  />
                </FilterSection>

                {/* Dining Features */}
                <FilterSection title="Dining Features">
                  <LookupCheckboxList
                    items={lk.dining_features ?? []}
                    selectedIds={filters.diningFeatureIds}
                    onToggle={toggleId("diningFeatureIds")}
                    loading={isLoading}
                  />
                </FilterSection>

                {/* Cuisine Type */}
                <FilterSection title="Cuisine Type">
                  <LookupCheckboxList
                    items={lk.cuisine_types ?? []}
                    selectedIds={filters.cuisineTypeIds}
                    onToggle={toggleId("cuisineTypeIds")}
                    loading={isLoading}
                  />
                </FilterSection>

                {/* Room Features */}
                <FilterSection title="Room Features">
                  <LookupCheckboxList
                    items={lk.room_features ?? []}
                    selectedIds={filters.roomFeatureIds}
                    onToggle={toggleId("roomFeatureIds")}
                    loading={isLoading}
                  />
                </FilterSection>

                {/* Facilities */}
                <FilterSection title="Facilities">
                  <LookupCheckboxList
                    items={lk.facilities ?? []}
                    selectedIds={filters.facilityIds}
                    onToggle={toggleId("facilityIds")}
                    loading={isLoading}
                  />
                </FilterSection>

              </div>

              {/* Activities — full width */}
              <div className="mt-8 pt-8 border-t border-[#EDE8E2]">
                <FilterSection title="Activities & Experiences">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-1">
                    {isLoading ? (
                      <p className="text-xs text-[#8C8C8C] col-span-4" style={{ fontFamily: "Lato" }}>Loading…</p>
                    ) : (lk.activities ?? []).map((item) => (
                      <CheckboxOption
                        key={item.id}
                        label={item.name}
                        checked={filters.activityIds.includes(item.id)}
                        onChange={() => toggleId("activityIds")(item.id)}
                      />
                    ))}
                  </div>
                </FilterSection>
              </div>

              {/* Restrictions — full width */}
              <div className="mt-8 pt-8 border-t border-[#EDE8E2]">
                <FilterSection title="Restrictions">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-1">
                    {isLoading ? (
                      <p className="text-xs text-[#8C8C8C] col-span-4" style={{ fontFamily: "Lato" }}>Loading…</p>
                    ) : (lk.restrictions ?? []).map((item) => (
                      <CheckboxOption
                        key={item.id}
                        label={item.name}
                        checked={filters.restrictionIds.includes(item.id)}
                        onChange={() => toggleId("restrictionIds")(item.id)}
                      />
                    ))}
                  </div>
                </FilterSection>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-[#EDE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm text-[#8C8C8C] hover:text-[#181818] underline underline-offset-2 transition-colors"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Clear all filters
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-8 py-3 bg-[#5E17EB] text-white text-xs tracking-[0.16em] uppercase rounded-lg hover:bg-[#4B12BD] transition-colors"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Apply Filters
                  {activeCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/25 text-[10px] font-bold">
                      {activeCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
