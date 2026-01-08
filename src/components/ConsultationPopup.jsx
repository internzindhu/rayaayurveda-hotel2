import { Link } from "react-router-dom";

export default function ConsultationPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 max-w-sm w-[320px] sm:w-[380px]">
      <div className="relative bg-[#F5F1E8]  rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#181818] hover:text-gray-600 transition-colors z-10 p-1 bg-white/80 rounded-full"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative">
          {/* Headline */}
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-xl sm:text-2xl font-serif text-[#181818]">
              Talk to an <span className="text-[#5E17EB]">Expert</span>
            </h2>
          </div>

          {/* Main Image and Overlay Box */}
          <div className="relative px-4 pb-4">
            {/* Doctor Image */}
            <div className="relative w-full h-48 sm:h-56 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="/consutation.jpg"
                alt="Ayurvedic Doctor"
                className="w-full h-full object-cover object-center"
              />
              {/* Green foliage background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-transparent to-green-900/30"></div>
            </div>

            {/* Overlay Box - positioned in bottom right quadrant */}
            <div className="absolute bottom-3 right-3 bg-white rounded-lg shadow-xl p-3 max-w-[200px] sm:max-w-[220px]">
              <div className="space-y-0.5 mb-3">
                <p className="text-[#5E17EB] font-semibold text-sm sm:text-base leading-tight">
                  15 minutes consultation
                </p>
                <p className="text-[#181818] font-serif text-xs sm:text-sm leading-tight">
                  with Ayurvedic doctor
                </p>
                <p className="text-[#5E17EB] font-semibold text-sm sm:text-base leading-tight">
                  for Free
                </p>
              </div>
              <Link
                to="/consultation"
                onClick={onClose}
                className="block w-full bg-[#5E17EB] hover:bg-[#4B12BD] text-white py-2 px-4 rounded-lg font-semibold text-sm text-center transition-colors"
                style={{ fontFamily: 'poppins' }}
              >
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

