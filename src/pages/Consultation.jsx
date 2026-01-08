import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    mobile: "",
    scheduleDateTime: "",
    comment: "",
    gender: "female"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (This is a demo - no backend connected)");
    setFormData({
      name: "",
      email: "",
      country: "",
      mobile: "",
      scheduleDateTime: "",
      comment: "",
      gender: "female"
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

            {/* Personal Data Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#181818] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Personal Data
              </h2>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-5 h-5 text-[#5E17EB] focus:ring-[#5E17EB] focus:ring-2"
                  />
                  <span className="ml-2 text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Female</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-5 h-5 text-[#5E17EB] focus:ring-[#5E17EB] focus:ring-2"
                  />
                  <span className="ml-2 text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="prefer-not-to-say"
                    checked={formData.gender === "prefer-not-to-say"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-5 h-5 text-[#5E17EB] focus:ring-[#5E17EB] focus:ring-2"
                  />
                  <span className="ml-2 text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Prefer not to say</span>
                </label>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
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

              {/* Country */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Country<span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all bg-white"
                  required
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <option value="">Select</option>
                  <option value="slovakia">Slovakia</option>
                  <option value="czech">Czech Republic</option>
                  <option value="poland">Poland</option>
                  <option value="germany">Germany</option>
                  <option value="austria">Austria</option>
                  <option value="other">Other</option>
                </select>
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

              {/* Schedule Date & Time */}
              <div>
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
              </div>

              {/* Comment */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Comment
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Enter comment..."
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
      </div>
    </div>
  );
}
