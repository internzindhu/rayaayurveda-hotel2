import { useState } from "react";
import Navbar from "../components/Navbar";
import { submitConsultation } from "../lib/wellnessApi";

export default function Consultation() {
  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    country: "",
    email: "",
    mobile: "",
    preferredContact: [],
    travelMonth: "",
    budget: "",
    budgetCurrency: "USD",
    numberOfNights: "",
    scheduleDateTime: "",
    comment: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitConsultation({
        gender: formData.gender || undefined,
        name: formData.name,
        country: formData.country || undefined,
        email: formData.email,
        mobile: formData.mobile || undefined,
        preferredContact: formData.preferredContact,
        travelMonth: formData.travelMonth || undefined,
        budget: formData.budget || undefined,
        budgetCurrency: formData.budgetCurrency || undefined,
        numberOfNights: formData.numberOfNights || undefined,
        scheduleDateTime: formData.scheduleDateTime || undefined,
        comment: formData.comment || undefined,
      });
      setSubmittedName(formData.name);
      setSubmittedEmail(formData.email);
      setShowSuccessPopup(true);
      setFormData({
        gender: "",
        name: "",
        country: "",
        email: "",
        mobile: "",
        preferredContact: [],
        travelMonth: "",
        budget: "",
        budgetCurrency: "USD",
        numberOfNights: "",
        scheduleDateTime: "",
        comment: ""
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form Section */}
          <div>
            <h1 className="text-4xl sm:text-3xl font-bold text-[#181818] mb-4" style={{ fontFamily: 'Sentient, serif' }}>
              Let us help you find your ideal Ayurveda/Wellness retreat.
            </h1>
            <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our wellness advisors are available during the hours below to assist with enquiries, retreat recommendations, and booking support.
            </p>

            {/* Working Hours Section */}
            <div className="mb-8">
              <p className="text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We aim to respond to all messages as quickly as possible. Enquiries received outside working hours will be attended to at the earliest opportunity.
              </p>
              <div className="space-y-2 text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p>Monday – Friday: 08:30 – 17:00 (UTC +5:30)</p>
                <p>Saturday – Sunday: 09:00 – 12:00 (UTC +5:30)</p>
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
                  <div className="flex gap-2">
                    <select
                      value={formData.travelMonth ? formData.travelMonth.split('-')[1] : ''}
                      onChange={(e) => {
                        const year = formData.travelMonth ? formData.travelMonth.split('-')[0] : new Date().getFullYear();
                        setFormData({ ...formData, travelMonth: e.target.value ? `${year}-${e.target.value}` : '' });
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all bg-white"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <option value="">Month</option>
                      {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => (
                        <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={formData.travelMonth ? formData.travelMonth.split('-')[0] : ''}
                      onChange={(e) => {
                        const month = formData.travelMonth ? formData.travelMonth.split('-')[1] : '01';
                        setFormData({ ...formData, travelMonth: e.target.value ? `${e.target.value}-${month}` : '' });
                      }}
                      className="w-28 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all bg-white"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
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

              {/* Per Night Travel Budget */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Per Night Travel Budget
                </label>
                <div className="flex">
                  <select
                    value={formData.budgetCurrency}
                    onChange={(e) => setFormData({ ...formData, budgetCurrency: e.target.value })}
                    className="px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
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
                disabled={submitting}
                className="w-full bg-[#5E17EB] hover:bg-[#4B12BD] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {submitting ? "SUBMITTING..." : "SUBMIT"}
              </button>
            </form>
          </div>

          {/* Right Column - Doctor Image with Consultation Popup */}
          <div className="relative flex items-start">
            <div className="relative w-full rounded-lg overflow-hidden">
              {/* Doctor Image */}
              <img
                src="/consutation.jpg"
                alt="Ayurvedic Doctor"
                className="w-full h-full object-cover object-top rounded-lg"
                style={{ minHeight: "420px", maxHeight: "720px" }}
              />

              {/* Consultation Popup Overlay */}
              <div className="absolute top-6 right-4 bg-[#F5F1E8] shadow-2xl p-5 max-w-[300px] w-[calc(100%-2rem)] sm:w-auto sm:max-w-[340px]">
                <div className="mb-4">
                  <p className="text-[#181818] font-serif text-base leading-snug">
                    Talk to our Ayurveda/Wellness Expert
                  </p>
                </div>
                <p className="text-[#181818] text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Call or WhatsApp
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#181818] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    +94744135359 / +94744135358
                  </p>
                  <a
                    href="https://wa.me/94744135359"
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
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>hello@rayalonglife.com</p>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>+94 74 413 5358</p>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-base font-bold text-[#181818] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Customer support
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>healing@rayalonglife.com</p>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>+94 74 413 5357</p>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-base font-bold text-[#181818] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Address
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            No. 37, 33 Bullers Ln, Colombo 00700
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

      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setShowSuccessPopup(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-success-title"
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-[#5E17EB] via-[#E91E63] to-[#FFB300]" />

            {/* Decorative floating dots */}
            <span className="absolute top-8 left-8 w-3 h-3 rounded-full bg-[#FFB300] opacity-70" />
            <span className="absolute top-16 right-10 w-2 h-2 rounded-full bg-[#E91E63] opacity-70" />
            <span className="absolute top-24 left-16 w-2.5 h-2.5 rounded-full bg-[#5E17EB] opacity-70" />
            <span className="absolute bottom-24 right-6 w-2 h-2 rounded-full bg-[#FFB300] opacity-60" />
            <span className="absolute bottom-12 left-10 w-3 h-3 rounded-full bg-[#5E17EB] opacity-50" />
            <span className="absolute bottom-32 right-16 w-2 h-2 rounded-full bg-[#E91E63] opacity-60" />

            {/* Close X */}
            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-[#F4F4F4] text-[#181818] flex items-center justify-center transition-colors shadow-sm z-10"
              aria-label="Close"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>

            <div className="px-8 sm:px-10 pt-10 pb-8 text-center relative">
              {/* Logo */}
              <img
                src="/logo.png"
                alt="RAYA Longlife"
                className="h-12 sm:h-14 w-auto mx-auto mb-6"
              />

              {/* Animated check icon inside a gradient circle */}
              <div className="relative mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#5E17EB] via-[#7B3FF2] to-[#E91E63] flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5E17EB] via-[#7B3FF2] to-[#E91E63] animate-ping opacity-25" />
                <svg className="relative w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 id="consultation-success-title" className="mb-4" style={{ fontFamily: "Sentient, serif" }}>
                <span className="block text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-[#5E17EB] via-[#9333EA] to-[#E91E63] bg-clip-text text-transparent">
                  Thank you{submittedName ? `, ${submittedName.split(" ")[0]}` : ""}!
                </span>
                <span
                  className="block text-lg sm:text-xl font-normal mt-2 text-[#181818]"
                  style={{ fontStyle: "italic" }}
                >
                  for your inquiry
                </span>
              </h2>

              <div
                className="space-y-3 mb-7 text-sm sm:text-base text-[#3a3a3a] leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <p>
                  We&apos;ve received your consultation request and our wellness advisors will get back to you{" "}
                  <span className="font-semibold text-[#5E17EB]">very soon</span>.
                </p>
                {submittedEmail && (
                  <p className="text-[#666] text-sm">
                    A confirmation has been sent to{" "}
                    <span className="font-semibold text-[#181818]">{submittedEmail}</span>.
                    <br />
                    If you don&apos;t see it, please check your spam folder.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowSuccessPopup(false)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#5E17EB] to-[#E91E63] text-white text-sm font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                CONTINUE
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
