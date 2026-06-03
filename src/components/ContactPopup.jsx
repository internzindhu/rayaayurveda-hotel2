import { useState } from "react";

export default function ContactPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This is a demo - no backend connected)");
    setFormData({ name: "", email: "", subject: "", message: "" });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Popup */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="bg-[#5E17EB] text-white p-6 flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'poppins' }}>Contact Us</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6">
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'poppins' }}>
              Get in touch with us for any questions or wellness inquiries.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2" style={{ fontFamily: 'poppins' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2" style={{ fontFamily: 'poppins' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2" style={{ fontFamily: 'poppins' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2" style={{ fontFamily: 'poppins' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="bg-[#5E17EB] hover:bg-[#4B12BD] text-white w-full py-3 text-lg rounded-lg transition-colors font-medium"
                style={{ fontFamily: 'poppins' }}
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: 'poppins' }}>Quick Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <span className="mr-3">📞</span>
                  <span>+421 903 244</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="mr-3">✉️</span>
                  <span>rayalognlife@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="mr-3">📍</span>
                  <span className="text-sm">Hviezdoslavova 81, 903 28 Ivanka pri Dunaji, Slovakia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

