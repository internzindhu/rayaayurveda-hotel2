import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";

const BUDGET_STEPS = [
  { label: "$0",    display: "$0" },
  { label: "$2k",   display: "$2k" },
  { label: "$5k",   display: "$5k" },
  { label: "$10k",  display: "$10k" },
  { label: "$15k+", display: "$15k+" },
];
const LAST = BUDGET_STEPS.length - 1;

function BudgetRangeSlider({ minIdx, maxIdx, onChange }) {
  const trackRef = useRef(null);
  const dragging = useRef(null);
  const stateRef = useRef({ minIdx, maxIdx });
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; });
  useEffect(() => { stateRef.current = { minIdx, maxIdx }; }, [minIdx, maxIdx]);

  const getIdx = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(pct * LAST);
  }, []);

  const onMove = useCallback((e) => {
    if (!dragging.current) return;
    const idx = getIdx(e.clientX);
    const { minIdx, maxIdx } = stateRef.current;
    if (dragging.current === "min") onChangeRef.current(Math.min(idx, maxIdx), maxIdx);
    else onChangeRef.current(minIdx, Math.max(idx, minIdx));
  }, [getIdx]);

  const onUp = useCallback(() => {
    dragging.current = null;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  }, [onMove]);

  const startDrag = useCallback((thumb) => (e) => {
    e.preventDefault();
    dragging.current = thumb;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [onMove, onUp]);

  useEffect(() => () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  }, [onMove, onUp]);

  const minPct = (minIdx / LAST) * 100;
  const maxPct = (maxIdx / LAST) * 100;
  const midPct = (minPct + maxPct) / 2;
  const minLabel = BUDGET_STEPS[minIdx].display;
  const maxLabel = BUDGET_STEPS[maxIdx].display;

  return (
    <div className="px-2 pt-10 pb-4 select-none">
      {/* Floating label */}
      <div
        className="absolute -translate-x-1/2 pointer-events-none"
        style={{ left: `calc(8px + ${midPct}% * (100% - 16px) / 100)`, top: 0 }}
      >
        <div
          className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs shadow whitespace-nowrap text-[#181818]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {minLabel} – {maxLabel}
          <span
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
            style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #e5e7eb" }}
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
            style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid white", marginTop: "-1px" }}
          />
        </div>
      </div>

      {/* Track */}
      <div ref={trackRef} className="relative h-[3px] bg-gray-200 rounded-full mx-2">
        {/* Active fill */}
        <div
          className="absolute h-full bg-[#5E17EB] rounded-full"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%`, transition: "left 0.1s, width 0.1s" }}
        />

        {/* Min thumb */}
        <button
          type="button"
          onPointerDown={startDrag("min")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#5E17EB] shadow-md cursor-grab active:cursor-grabbing focus:outline-none hover:scale-110 active:scale-125 transition-transform duration-150"
          style={{ left: `${minPct}%` }}
          aria-label="Minimum budget"
        />

        {/* Max thumb */}
        <button
          type="button"
          onPointerDown={startDrag("max")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#5E17EB] shadow-md cursor-grab active:cursor-grabbing focus:outline-none hover:scale-110 active:scale-125 transition-transform duration-150"
          style={{ left: `${maxPct}%` }}
          aria-label="Maximum budget"
        />
      </div>

      {/* Step labels */}
      <div className="flex justify-between mt-3 mx-2">
        {BUDGET_STEPS.map((step, i) => (
          <span
            key={i}
            className="text-xs transition-colors duration-200"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: (i >= minIdx && i <= maxIdx) ? "#5E17EB" : "#d1d5db",
              fontWeight: (i === minIdx || i === maxIdx) ? 600 : 400,
            }}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Consultation() {
  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    country: "",
    email: "",
    mobile: "",
    preferredContact: [],
    travelMonth: "",
    budgetMinIdx: 0,
    budgetMaxIdx: 4,
    numberOfNights: "",
    scheduleDateTime: "",
    comment: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (This is a demo - no backend connected)");
    setFormData({
      gender: "",
      name: "",
      country: "",
      email: "",
      mobile: "",
      preferredContact: [],
      travelMonth: "",
      budgetMinIdx: 0,
      budgetMaxIdx: 4,
      numberOfNights: "",
      scheduleDateTime: "",
      comment: ""
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto  py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form Section */}
          <div>
            <h1 className="text-4xl sm:text-3xl font-bold text-[#181818] mb-4" style={{ fontFamily: 'Sentient, serif' }}>
              We will help you choose the perfect treatment stay.
            </h1>
            <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Leave your contact details along with any questions, and our team will guide you personally in planning your Ayurvedic retreat.
            </p>

            {/* Working Hours Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#181818] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Working Hours
              </h2>
              <p className="text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We're here to welcome you and assist with all your inquiries during the following hours:
              </p>
              <div className="space-y-2 text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p>Monday - Friday: 08:30 - 17:00 (UTC+5:30)</p>
                <p>Saturday - Sunday: 09:00 - 12:00 (UTC+5:30)</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Gender */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all bg-white"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Enter country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Mobile Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              {/* Preferred Mode of Contact */}
              <div>
                <label className="block text-gray-700 font-medium mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Preferred Mode of Contact<span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Call", "WhatsApp", "Email"].map((option) => {
                    const value = option.toLowerCase();
                    const selected = formData.preferredContact.includes(value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          const current = formData.preferredContact;
                          setFormData({
                            ...formData,
                            preferredContact: selected
                              ? current.filter((v) => v !== value)
                              : [...current, value],
                          });
                        }}
                        className={`px-5 py-2.5 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${
                          selected
                            ? "bg-[#5E17EB] border-[#5E17EB] text-white"
                            : "bg-white border-gray-300 text-gray-700 hover:border-[#5E17EB] hover:text-[#5E17EB]"
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {formData.preferredContact.length === 0 && (
                  <input
                    type="text"
                    required
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Travel Month */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Travel Month
                  </label>
                  <input
                    type="month"
                    value={formData.travelMonth}
                    onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                {/* Number of Nights */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Number of Nights
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numberOfNights}
                    onChange={(e) => setFormData({ ...formData, numberOfNights: e.target.value })}
                    placeholder="Nights"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </div>

              {/* Total Travel Budget — dual-handle range slider */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Per Night Travel Budget
                </label>
                <div className="relative">
                  <BudgetRangeSlider
                    minIdx={formData.budgetMinIdx}
                    maxIdx={formData.budgetMaxIdx}
                    onChange={(min, max) => setFormData({ ...formData, budgetMinIdx: min, budgetMaxIdx: max })}
                  />
                </div>
              </div>

              {/* Schedule Date & Time */}
              {/* <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Schedule Date & Time<span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduleDateTime}
                  onChange={(e) => setFormData({ ...formData, scheduleDateTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div> */}

              {/* Comment */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Comment
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="You can mention the reason you want to travel and any other comments"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all resize-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#5E17EB] hover:bg-[#4B12BD] text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* Right Column - Doctor Image with Consultation Popup */}
          <div className="relative flex items-start">
            <div className="relative w-full h-full rounded-lg overflow-visible">
              {/* Doctor Image */}
              <img
                src="/consutation.jpg"
                alt="Ayurvedic Doctor"
                className="w-full h-full object-contain mt-[-100px] rounded-lg"
              />

              {/* Consultation Popup Overlay */}
              <div className="absolute top-8 right-[-100px] bg-[#F5F1E8] shadow-2xl p-6 max-w-[400px] w-full">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <p className="text-[#5E17EB] font-semibold text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    15 minutes
                  </p>
                  <p className="text-[#181818] font-serif text-base leading-tight">
                    consultation with Ayurvedic doctor
                  </p>
                  <p className="text-[#5E17EB] font-semibold text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    for Free
                  </p>
                </div>
                <p className="text-[#181818] text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Call for appointment
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#181818] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    +123 595 9966 / +123 595 9966
                  </p>
                  <a
                    href="https://wa.me/1235959966"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#5E17EB] hover:bg-[#4B12BD] text-white p-3 rounded-full transition-colors flex items-center justify-center"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mt-20 border-t border-gray-200 pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* General Enquiries */}
          <div>
            <h3 className="text-base font-bold text-[#181818] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              General Enquiries
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>rayalonglife@gmail.com</p>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>+94 71 366 7946</p>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-base font-bold text-[#181818] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Customer support
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>rayalonglife@gmail.com</p>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>+94 71 366 7946</p>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-base font-bold text-[#181818] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Address
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Raya Longlife, Suite 5, Enterprise House, Moorgate Point, Moorgate Rd, Sri Lanka.
            </p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-base font-bold text-[#181818] mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.08em' }}>
              FOLLOW US
            </h3>
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-[#5E17EB] rounded-xl flex items-center justify-center text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-[#5E17EB] rounded-xl flex items-center justify-center text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
