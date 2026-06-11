import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { submitCallExpert } from "../lib/wellnessApi";

const KEYFRAMES = `
  @keyframes raya-scale-in {
    0%   { transform: scale(0.4); opacity: 0; }
    65%  { transform: scale(1.12); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes raya-check {
    from { stroke-dashoffset: 32; opacity: 0; }
    to   { stroke-dashoffset: 0;  opacity: 1; }
  }
  @keyframes raya-ripple {
    0%   { transform: scale(0.9); opacity: 0.45; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes raya-fade-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes raya-cal-in {
    0%   { transform: scale(0.5) rotate(-8deg); opacity: 0; }
    65%  { transform: scale(1.1) rotate(2deg);  opacity: 1; }
    100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
  }
`;

const PP = { fontFamily: "Poppins, sans-serif" };
const TODAY = new Date().toISOString().split("T")[0];
const TIME_SLOTS = ["10 – 11 am", "1 – 2 pm", "4 – 5 pm"];

function PopupHeader({ onClose }) {
  return (
    <div className="bg-[#5E17EB] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
          <img src="/logo.png" alt="Raya Ayurveda" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight" style={PP}>Speak to a Travel Advisor</p>
          <p className="text-white/70 text-xs leading-tight" style={PP}>We're here to help</p>
        </div>
      </div>
      <button onClick={onClose} className="text-white/70 hover:text-white transition-colors ml-2 flex-shrink-0 p-1" aria-label="Close">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

function FormView({ onSuccess, onSchedule }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const ready = !submitting;
  const canSchedule = ready && phone.trim() && name.trim() && email.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setSubmitting(true);
    try {
      await submitCallExpert({ phone, name, email, recipientEmail: "hod@rayalonglife.com" });
      onSuccess();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white px-4 py-4">
        <p className="text-black text-xs mb-4 leading-relaxed" style={PP}>
          Let's Find Your Perfect Retreat. Whether you're looking for Ayurveda, yoga, meditation, detox, or relaxation, our team is here to guide you every step of the way. Share your number and one of our wellness advisors will reach out to you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-1.5 focus-within:border-[#5E17EB] transition-colors">
            <span className="text-[#5E17EB] text-xs font-semibold flex-shrink-0" style={PP}>+94</span>
            <div className="w-px h-3.5 bg-gray-300 flex-shrink-0" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" required
              className="flex-1 text-xs text-gray-700 outline-none bg-transparent placeholder-gray-900 min-w-0" style={PP} />
          </div>
          <div className="border-b-2 border-gray-200 pb-1.5 focus-within:border-[#5E17EB] transition-colors">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required
              className="w-full text-xs text-gray-700 outline-none bg-transparent placeholder-gray-900" style={PP} />
          </div>
          <div className="border-b-2 border-gray-200 pb-1.5 focus-within:border-[#5E17EB] transition-colors">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" required
              className="w-full text-xs text-gray-700 outline-none bg-transparent placeholder-gray-900" style={PP} />
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={!ready}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-lg transition-all ${
                ready
                  ? "bg-[#5E17EB] hover:bg-[#4B12BD] text-white cursor-pointer"
                  : "bg-gray-100 text-gray-900 cursor-not-allowed"
              }`} style={PP}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Connect now
            </button>
            <button type="button" disabled={!canSchedule} onClick={() => canSchedule && onSchedule({ phone, name, email })}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-lg border-2 transition-all ${
                canSchedule
                  ? "border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white cursor-pointer"
                  : "border-gray-200 text-gray-900 cursor-not-allowed"
              }`} style={PP}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule a call
            </button>
          </div>
        </form>
      </div>
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
        <p className="text-gray-400 text-[10px]" style={PP}>Trusted Wellness Guidance by Raya Long Life</p>
      </div>
    </>
  );
}

function SuccessView({ onClose }) {
  return (
    <div className="bg-white px-5 py-10 flex flex-col items-center text-center">
      {/* Ripple rings */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-16 h-16 rounded-full bg-[#5E17EB]/20"
          style={{ animation: "raya-ripple 1.4s 0.2s ease-out infinite" }} />
        <div className="absolute w-16 h-16 rounded-full bg-[#5E17EB]/15"
          style={{ animation: "raya-ripple 1.4s 0.6s ease-out infinite" }} />
        {/* Circle */}
        <div className="w-16 h-16 rounded-full bg-[#5E17EB] flex items-center justify-center"
          style={{ animation: "raya-scale-in 0.55s cubic-bezier(0.175,0.885,0.32,1.275) both" }}>
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
            <polyline points="4 12 9 17 20 6" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="32" strokeDashoffset="32"
              style={{ animation: "raya-check 0.4s 0.35s ease forwards" }} />
          </svg>
        </div>
      </div>

      <h3 className="text-[#5E17EB] font-bold text-base mb-2" style={{ ...PP, animation: "raya-fade-up 0.4s 0.5s ease both" }}>
        We'll contact you soon
      </h3>
      <p className="text-gray-500 text-xs leading-relaxed mb-6 max-w-[220px]" style={{ ...PP, animation: "raya-fade-up 0.4s 0.65s ease both" }}>
        Our wellness team will reach out within the hour. Get ready to begin your Ayurvedic journey.
      </p>
      <button onClick={onClose}
        className="text-xs text-[#5E17EB] font-semibold border-2 border-[#5E17EB] px-8 py-2 rounded-full hover:bg-[#5E17EB] hover:text-white transition-colors"
        style={{ ...PP, animation: "raya-fade-up 0.4s 0.8s ease both" }}>
        Close
      </button>
    </div>
  );
}

function ScheduleView({ onBooked, onBack }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && slot) onBooked(date, slot);
  };

  const formatted = date
    ? new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" })
    : "";

  return (
    <div className="bg-white px-4 py-4">
      <button onClick={onBack} className="flex items-center gap-1 text-[#5E17EB] text-[10px] font-medium mb-3 hover:opacity-70 transition-opacity" style={PP}>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date */}
        <div>
          <label className="block text-gray-400 text-[10px] uppercase tracking-wider mb-1.5" style={PP}>Select a date</label>
          <input type="date" value={date} min={TODAY} onChange={(e) => setDate(e.target.value)} required
            className="w-full text-xs text-gray-700 border-2 border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E17EB] transition-colors" style={PP} />
          {formatted && (
            <p className="text-[#5E17EB] text-[10px] mt-1 font-medium" style={PP}>{formatted}</p>
          )}
        </div>

        {/* Time slots */}
        <div>
          <label className="block text-gray-400 text-[10px] uppercase tracking-wider mb-2" style={PP}>Pick a time slot</label>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((s) => (
              <button key={s} type="button" onClick={() => setSlot(s)}
                className={`text-[10px] py-3 px-1 rounded-xl font-semibold border-2 transition-all duration-150 ${
                  slot === s
                    ? "bg-[#5E17EB] border-[#5E17EB] text-white shadow-md scale-105"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#5E17EB] hover:text-[#5E17EB]"
                }`} style={PP}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={!date || !slot}
          className="w-full bg-[#5E17EB] hover:bg-[#4B12BD] disabled:bg-gray-100 disabled:text-gray-300 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors" style={PP}>
          Book this slot
        </button>
      </form>
    </div>
  );
}

function BookedView({ date, slot, onClose }) {
  const formatted = new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return (
    <div className="bg-white px-5 py-10 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#5E17EB]/10 flex items-center justify-center mb-5"
        style={{ animation: "raya-cal-in 0.55s cubic-bezier(0.175,0.885,0.32,1.275) both" }}>
        <svg className="w-8 h-8 text-[#5E17EB]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="8" cy="15" r="0.8" fill="currentColor" /><circle cx="12" cy="15" r="0.8" fill="currentColor" />
        </svg>
      </div>
      <h3 className="text-[#5E17EB] font-bold text-base mb-1" style={{ ...PP, animation: "raya-fade-up 0.4s 0.4s ease both" }}>
        You're all set!
      </h3>
      <p className="text-gray-700 text-xs font-semibold mb-0.5" style={{ ...PP, animation: "raya-fade-up 0.4s 0.5s ease both" }}>
        {formatted}
      </p>
      <p className="text-[#5E17EB] text-xs font-semibold mb-4" style={{ ...PP, animation: "raya-fade-up 0.4s 0.55s ease both" }}>
        {slot}
      </p>
      <p className="text-gray-500 text-xs leading-relaxed mb-6 max-w-[210px]" style={{ ...PP, animation: "raya-fade-up 0.4s 0.65s ease both" }}>
        We'll call you at the scheduled time. See you soon!
      </p>
      <button onClick={onClose}
        className="text-xs text-[#5E17EB] font-semibold border-2 border-[#5E17EB] px-8 py-2 rounded-full hover:bg-[#5E17EB] hover:text-white transition-colors"
        style={{ ...PP, animation: "raya-fade-up 0.4s 0.8s ease both" }}>
        Done
      </button>
    </div>
  );
}

function CallExpertPopup({ onClose }) {
  const [view, setView] = useState("form"); // form | success | schedule | booked
  const [bookedDate, setBookedDate] = useState("");
  const [bookedSlot, setBookedSlot] = useState("");
  const [contactInfo, setContactInfo] = useState({ phone: "", name: "", email: "" });

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSchedule = (info) => {
    setContactInfo(info);
    setView("schedule");
  };

  const handleBooked = async (date, slot) => {
    setBookedDate(date);
    setBookedSlot(slot);
    setView("booked");
    try {
      await submitCallExpert({
        ...contactInfo,
        scheduled_date: date,
        scheduled_slot: slot,
        recipientEmail: "hod@rayalonglife.com",
      });
    } catch {
      // Non-blocking — booking view already shown
    }
  };

  return createPortal(
    <>
      <style>{KEYFRAMES}</style>
      <div className="fixed inset-0" style={{ zIndex: 9999 }} onClick={onClose}>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />
        <div
          className="absolute w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <PopupHeader onClose={onClose} />
          {view === "form"     && <FormView onSuccess={() => setView("success")} onSchedule={handleSchedule} />}
          {view === "success"  && <SuccessView onClose={onClose} />}
          {view === "schedule" && <ScheduleView onBooked={handleBooked} onBack={() => setView("form")} />}
          {view === "booked"   && <BookedView date={bookedDate} slot={bookedSlot} onClose={onClose} />}
        </div>
      </div>
    </>,
    document.body
  );
}

export default function FloatingCTAButtons({
  scrollY = 0,
  windowWidth = window.innerWidth,
  buttonsVisible = true,
  autoConnectionProgress = 0,
}) {
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const [animationStarted, setAnimationStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!leftBtnRef.current || !rightBtnRef.current) return;

    const measure = () => {
      setLeftWidth(leftBtnRef.current.offsetWidth);
      setRightWidth(rightBtnRef.current.offsetWidth);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(leftBtnRef.current);
    observer.observe(rightBtnRef.current);

    return () => observer.disconnect();
  }, []);

  // Mobile: simple bottom bar
  if (isMobile) {


    return (
      <>
        {showModal && (
          <CallExpertPopup onClose={() => setShowModal(false)} />
        )}
        <div className="fixed bottom-0 left-0 right-0 flex pointer-events-none" style={{ zIndex: 62 }}>
          <button
            ref={leftBtnRef}
            onClick={() => setShowModal(true)}
            className="pointer-events-auto flex-1 py-3 sm:py-4 bg-[#fdbb3a] text-white text-xs sm:text-sm font-medium text-center shadow-lg hover:bg-yellow-500 transition-colors duration-200 leading-tight"
            style={{ fontFamily: "Lato, sans-serif", letterSpacing: "0.05em" }}
          >
            CALL AN EXPERT
          </button>
          <Link
            ref={rightBtnRef}
            to="/questionnaire"
            className="pointer-events-auto flex-1 py-3 sm:py-4 bg-[#5E17EB] text-white text-xs sm:text-sm font-medium text-center shadow-lg hover:bg-[#4B12BD] transition-colors duration-200 leading-tight"
            style={{ fontFamily: "Lato, sans-serif", letterSpacing: "0.05em" }}
          >
            IS AYURVEDA FOR ME?
          </Link>
        </div>
      </>
    );
  }

  // Desktop: slide-in animation
  const gap = 0;
  const maxTranslate = windowWidth / 2 - (leftWidth + rightWidth) / 2 - gap;

  const magneticEase = (t) => {
    const snapStart = 0.85;
    const driftEnd = 0.3;
    if (t <= snapStart) {
      return (t / snapStart) * driftEnd;
    }
    const zoneProgress = (t - snapStart) / (1 - snapStart);
    const snapped = 1 - Math.pow(1 - zoneProgress, 3);
    return driftEnd + snapped * (1 - driftEnd);
  };

  const scrollProgress = Math.min((scrollY * 0.6) / maxTranslate, 1);
  const rawProgress = Math.max(scrollProgress, autoConnectionProgress);
  const easedProgress = animationStarted ? magneticEase(rawProgress) : 0;
  const finalTranslate = easedProgress * maxTranslate;

  const leftTranslate = buttonsVisible ? finalTranslate : -leftWidth;
  const rightTranslate = buttonsVisible ? -finalTranslate : rightWidth;

  const connectionThreshold = maxTranslate * 0.85;
  const connectionComplete = maxTranslate * 0.98;

  const connectionProgress =
    finalTranslate >= connectionThreshold
      ? Math.min(
          (finalTranslate - connectionThreshold) /
            (connectionComplete - connectionThreshold),
          1
        )
      : 0;

  const isConnected = connectionProgress >= 0.5;


  return (
    <>
      {showModal && (
        <CallExpertPopup onClose={() => setShowModal(false)} />
      )}
      <div className="fixed inset-x-0 pointer-events-none" style={{ zIndex: 62 }}>
        <button
          ref={leftBtnRef}
          onClick={() => setShowModal(true)}
          className={`fixed left-0 pointer-events-auto px-8 py-4 sm:px-12 sm:py-6 bg-[#fdbb3a] text-white text-lg sm:text-xl font-medium shadow-lg hover:bg-yellow-500 hover:text-black transition ${
            isConnected ? "rounded-l-3xl border-r border-white/50" : "rounded-3xl"
          }`}
          style={{
            bottom: "2rem",
            transform: `translateX(${leftTranslate}px)`,
            opacity: buttonsVisible ? 1 : 0,
            transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
          }}
        >
          CALL AN EXPERT
        </button>

        <Link
          ref={rightBtnRef}
          to="/questionnaire"
          className={`fixed right-0 pointer-events-auto px-8 py-4 sm:px-12 sm:py-6 bg-[#5E17EB] text-white text-lg sm:text-xl font-medium shadow-lg hover:bg-blue-500 hover:text-black transition ${
            isConnected ? "rounded-r-3xl" : "rounded-3xl"
          }`}
          style={{
            bottom: "2rem",
            transform: `translateX(${rightTranslate}px)`,
            opacity: buttonsVisible ? 1 : 0,
            transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
          }}
        >
          IS AYURVEDA FOR ME?
        </Link>
      </div>
    </>
  );
}