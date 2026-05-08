import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const testimonials = [
  {
    name: "Sophie Laurent",
    location: "Paris, France",
    retreat: "Panchakarma Detox — Sri Lanka, 21 Days",
    rating: 5,
    quote:
      "I arrived depleted, carrying years of burnout in my body. RAYA matched me with a resort that felt like it had been waiting for me. Three weeks of Panchakarma later, I left with a completely renewed relationship to my own health. The doctors listened in ways no Western physician ever had.",
    tag: "Panchakarma",
    initials: "SL",
  },
  {
    name: "James Whitfield",
    location: "London, UK",
    retreat: "Stress & Rejuvenation — India, 14 Days",
    rating: 5,
    quote:
      "I was sceptical of Ayurveda before this trip. Now I understand it's not mysticism — it's an extraordinarily precise science. The personalised dietary plan alone transformed my digestion within the first week. RAYA's curation is impeccable.",
    tag: "Rejuvenation",
    initials: "JW",
  },
  {
    name: "Anita Rao",
    location: "Toronto, Canada",
    retreat: "Weight & Metabolic Balance — India, 28 Days",
    rating: 5,
    quote:
      "As someone of Indian heritage, I always felt disconnected from Ayurveda as it's practised in the West. RAYA brought me back to its roots. The practitioners treated me as a whole person, not a set of symptoms. A profoundly healing homecoming.",
    tag: "Metabolic Balance",
    initials: "AR",
  },
  {
    name: "Marcus Heller",
    location: "Berlin, Germany",
    retreat: "Joint & Mobility Retreat — Sri Lanka, 14 Days",
    rating: 5,
    quote:
      "After a decade of chronic back pain, I had accepted it as permanent. Within days of Kizhi and Pizhichil treatments, the inflammation began to subside. I left walking straighter than I had in years. I cannot explain it except to say it works.",
    tag: "Pain Relief",
    initials: "MH",
  },
  {
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    retreat: "Mind & Sleep Reset — Thailand, 10 Days",
    rating: 5,
    quote:
      "My sleep had been broken for four years. I tried everything. Ten days of Shirodhara and Nasya, combined with the meditative rhythm of the retreat, gave me the deepest sleep I can remember. RAYA understood exactly what I needed before I could articulate it myself.",
    tag: "Sleep & Mind",
    initials: "YT",
  },
  {
    name: "Clara Morin",
    location: "Zurich, Switzerland",
    retreat: "Couples Wellness — Thailand, 7 Days",
    rating: 5,
    quote:
      "My partner and I came together needing to slow down. What we found was a week of genuine reconnection — to ourselves, to each other, and to something much quieter than our usual lives. RAYA's team handled every detail so we could simply be present.",
    tag: "Couples",
    initials: "CM",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#fdbb3a]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease-out ${index * 0.1}s, transform 0.75s ease-out ${index * 0.1}s`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full bg-[#5E17EB] flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            {t.initials}
          </div>
          <div>
            <p className="font-semibold text-[#181818] text-sm" style={{ fontFamily: "Lato, sans-serif" }}>{t.name}</p>
            <p className="text-[#888] text-xs" style={{ fontFamily: "Lato, sans-serif" }}>{t.location}</p>
          </div>
        </div>
        <span
          className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#EAE9E3] text-[#5E17EB] flex-shrink-0 mt-0.5"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {t.tag}
        </span>
      </div>

      <StarRating count={t.rating} />

      <blockquote
        className="text-[#3a3a3a] leading-relaxed flex-1 text-base"
        style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
      >
        "{t.quote}"
      </blockquote>

      <p className="text-xs text-[#888] border-t border-[#EAE9E3] pt-4" style={{ fontFamily: "Lato, sans-serif" }}>
        {t.retreat}
      </p>
    </div>
  );
}

export default function GuestTestimonials() {
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const createObserver = (ref, setter) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); observer.disconnect(); } },
        { threshold: 0.15 }
      );
      observer.observe(ref.current);
      return observer;
    };
    const o1 = createObserver(statsRef, setStatsVisible);
    const o2 = createObserver(ctaRef, setCtaVisible);
    return () => { o1?.disconnect(); o2?.disconnect(); };
  }, []);

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">

      {/* ── Hero ── */}
      <div className="relative min-h-[80svh] lg:h-[60vh] overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/yoga1.jpg)", zIndex: 1 }}
        />
        <div className="absolute top-0 left-0 w-full h-full z-5 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-black/50" />

        <div className="relative z-20">
          <Navbar />
          <section className="relative min-h-[80svh] lg:h-[60vh] flex flex-col justify-center items-center text-center px-4">
            <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto space-y-4">
              <div className="text-white w-full space-y-2">
                <TextGenerateEffect
                  words="Real Journeys."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "normal", fontWeight: "300" }}
                />
                <TextGenerateEffect
                  words="Real Healing."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                />
                <TextGenerateEffect
                  words="Stories from guests who chose to heal the ancient way — and came home transformed."
                  className="text-white text-[18px] sm:text-[20px] md:text-[22px] leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif", fontStyle: "normal", width: "75%", margin: "0 auto" }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Stats band ── */}
      <section className="py-14 px-4 sm:px-8 bg-white">
        <div
          ref={statsRef}
          className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center"
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          {[
            { value: "1,200+", label: "Guests Hosted" },
            { value: "4.9 / 5", label: "Average Rating" },
            { value: "94%", label: "Would Return" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                className="text-3xl sm:text-4xl text-[#5E17EB] mb-2"
                style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
              >
                {value}
              </p>
              <p
                className="text-xs uppercase tracking-widest text-[#888]"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section header ── */}
      <section className="pt-16 pb-4 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[#5E17EB] uppercase mb-3"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.12em" }}
          >
            Guest Voices
          </p>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-end">
            <h2
              className="text-4xl sm:text-5xl text-[#181818]"
              style={{ fontFamily: "Sentient, serif", fontWeight: 400 }}
            >
              Guest Testimonies
            </h2>
            <div className="hidden lg:block w-0 h-16 border-l-2 border-dotted border-[#181818] mx-6 self-center" />
            <p
              className="text-base text-[#181818] leading-relaxed max-w-xl"
              style={{ fontFamily: "poppins" }}
            >
              Every journey is personal. Every transformation is real. These are the words of guests who trusted RAYA to guide their path to wellness.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials grid ── */}
      <section className="py-12 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="py-16 px-4 sm:px-8 bg-[#EAE9E3]">
        <div
          ref={ctaRef}
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <p
            className="text-base sm:text-lg text-[#181818] leading-relaxed mb-8"
            style={{ fontFamily: "poppins" }}
          >
            Ready to write your own chapter? Our wellness advisors will match you with the perfect retreat for your unique constitution and goals.
          </p>
          <Link
            to="/consultation"
            className="inline-block bg-[#5E17EB] hover:bg-[#4B12BD] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm rounded-lg transition-colors duration-200"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}