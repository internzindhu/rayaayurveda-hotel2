import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const pastIssues = [
  {
    issue: "Issue 12",
    month: "April 2025",
    title: "The Kapha Season Reset",
    excerpt:
      "As spring awakens the earth, Ayurveda calls for a deep cleanse of winter's accumulated heaviness. This month we explore Kapha-pacifying foods, the power of dry brushing, and why spring is the ideal time to begin a detox.",
    tag: "Seasonal Wellness",
    readTime: "6 min read",
  },
  {
    issue: "Issue 11",
    month: "March 2025",
    title: "Sleep, Ojas & the Art of True Rest",
    excerpt:
      "Modern sleep medicine and Ayurveda agree on one thing: most of us are sleeping, not resting. We look at the Ayurvedic concept of Ojas — vital essence — and how to genuinely restore it through ritual, herbs, and stillness.",
    tag: "Mind & Sleep",
    readTime: "8 min read",
  },
  {
    issue: "Issue 10",
    month: "February 2025",
    title: "Agni: Your Digestive Fire Explained",
    excerpt:
      "In Ayurveda, almost every chronic disease begins with a weakened Agni. This deep-dive issue unpacks the four states of digestive fire, the spices that rekindle it, and the morning rituals that protect it.",
    tag: "Digestion",
    readTime: "7 min read",
  },
  {
    issue: "Issue 09",
    month: "January 2025",
    title: "A New Year Through Ancient Eyes",
    excerpt:
      "January resolutions rarely last because they ignore constitution. Discover how Vata, Pitta, and Kapha types need fundamentally different approaches to renewal — and why personalised intentions outlast generic goals.",
    tag: "Doshas",
    readTime: "5 min read",
  },
  {
    issue: "Issue 08",
    month: "December 2024",
    title: "Travelling Well: Ayurveda for the Journey",
    excerpt:
      "Long-haul travel aggravates Vata — creating anxiety, dry skin, disturbed sleep, and digestive upset. Our travel guide to staying grounded in transit is essential reading before your next retreat departure.",
    tag: "Travel & Wellness",
    readTime: "6 min read",
  },
  {
    issue: "Issue 07",
    month: "November 2024",
    title: "Panchakarma: The Science of Letting Go",
    excerpt:
      "Many guests arrive for Panchakarma not knowing what to expect. We demystify the five classical purification therapies, explain what the body releases during Virechana and Basti, and share three guest transformation stories.",
    tag: "Panchakarma",
    readTime: "9 min read",
  },
];

const benefits = [
  {
    title: "Seasonal Wisdom",
    desc: "Monthly guidance aligned to the Ayurvedic calendar — what to eat, how to sleep, and which practices to prioritise each season.",
  },
  {
    title: "Retreat Spotlights",
    desc: "Curated deep-dives into our partner retreats — programmes, doctors, and the specific conditions each centre excels at treating.",
  },
  {
    title: "Expert Conversations",
    desc: "Interviews with Ayurvedic physicians, yoga masters, and wellness researchers distilled into actionable insight.",
  },
  {
    title: "Early Access",
    desc: "Subscribers receive first notice of new retreat openings, limited availability programmes, and exclusive consultation slots.",
  },
];

function IssueCard({ issue, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${index * 0.08}s, transform 0.7s ease-out ${index * 0.08}s`,
      }}
    >
      <div className="bg-[#5E17EB] px-6 py-5 flex items-start justify-between gap-3">
        <div>
          <p
            className="text-[#fdbb3a] text-[10px] uppercase tracking-[0.2em] mb-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            {issue.issue} · {issue.month}
          </p>
          <h3
            className="text-white text-xl leading-snug"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
          >
            {issue.title}
          </h3>
        </div>
        <span
          className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-white/70 flex-shrink-0 mt-0.5"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {issue.tag}
        </span>
      </div>
      <div className="px-6 py-5 flex flex-col gap-4 flex-1">
        <p className="text-[#181818] leading-relaxed text-sm flex-1" style={{ fontFamily: "Lato, sans-serif" }}>
          {issue.excerpt}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[#EAE9E3]">
          <span className="text-xs text-[#888]" style={{ fontFamily: "Lato, sans-serif" }}>
            {issue.readTime}
          </span>
          <span
            className="text-[#5E17EB] text-xs font-semibold uppercase tracking-widest cursor-pointer hover:text-[#4B12BD] transition-colors duration-200"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Read Issue →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const benefitsRef = useRef(null);
  const archiveRef = useRef(null);
  const ctaRef = useRef(null);
  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const createObserver = (ref, setter) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); observer.disconnect(); } },
        { threshold: 0.12 }
      );
      observer.observe(ref.current);
      return observer;
    };
    const o1 = createObserver(benefitsRef, setBenefitsVisible);
    const o2 = createObserver(archiveRef, setArchiveVisible);
    const o3 = createObserver(ctaRef, setCtaVisible);
    return () => { o1?.disconnect(); o2?.disconnect(); o3?.disconnect(); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">

      {/* ── Hero ── */}
      <div className="relative min-h-[80svh] lg:h-[60vh] overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/leaves.jpg)", zIndex: 1 }}
        />
        <div className="absolute top-0 left-0 w-full h-full z-5 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-black/55" />

        <div className="relative z-20">
          <Navbar />
          <section className="relative min-h-[80svh] lg:h-[60vh] flex flex-col justify-center items-center text-center px-4">
            <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto space-y-4">
              <div className="text-white w-full space-y-2">
                <TextGenerateEffect
                  words="The RAYA Letter."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "normal", fontWeight: "300" }}
                />
                <TextGenerateEffect
                  words="Ancient wisdom for modern lives."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                />
                <TextGenerateEffect
                  words="A monthly dispatch on Ayurvedic living, seasonal rituals, retreat stories, and the quiet art of healing well."
                  className="text-white text-[18px] sm:text-[20px] md:text-[22px] leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif", fontStyle: "normal", width: "75%", margin: "0 auto" }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Subscribe band ── */}
      <section className="py-14 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-base sm:text-lg text-[#181818] leading-relaxed mb-8"
            style={{ fontFamily: "poppins" }}
          >
            Over 4,000 readers receive The RAYA Letter each month. Join them — no spam, ever.
          </p>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full sm:flex-1 px-5 py-3.5 rounded-lg border border-[#181818] text-[#181818] placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#5E17EB] text-sm"
                style={{ fontFamily: "Lato, sans-serif" }}
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#5E17EB] hover:bg-[#4B12BD] text-white font-bold uppercase tracking-widest text-sm rounded-lg transition-colors duration-200 flex-shrink-0"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Subscribe Free
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-3 bg-[#EAE9E3] border border-[#5E17EB]/20 rounded-lg px-7 py-4">
              <svg className="w-5 h-5 text-[#5E17EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#181818] text-sm" style={{ fontFamily: "Lato, sans-serif" }}>
                Welcome — your first issue arrives next month.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── What's inside ── */}
      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[#5E17EB] uppercase mb-3"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.12em" }}
          >
            What's Inside
          </p>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-end mb-12">
            <h2
              className="text-4xl sm:text-5xl text-[#181818]"
              style={{ fontFamily: "Sentient, serif", fontWeight: 400 }}
            >
              More than a newsletter
            </h2>
            <div className="hidden lg:block w-0 h-16 border-l-2 border-dotted border-[#181818] mx-6 self-center" />
            <p
              className="text-base text-[#181818] leading-relaxed max-w-xl"
              style={{ fontFamily: "poppins" }}
            >
              Each issue is a carefully composed guide — grounded in classical Ayurveda, written for people living real, busy, modern lives.
            </p>
          </div>

          <div
            ref={benefitsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            style={{
              opacity: benefitsVisible ? 1 : 0,
              transform: benefitsVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            {benefits.map(({ title, desc }, i) => (
              <div
                key={title}
                className="flex gap-5 p-6 bg-white rounded-2xl shadow-sm border border-[#EAE9E3]"
                style={{
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full bg-[#5E17EB] flex-shrink-0 flex items-center justify-center text-white text-lg"
                  style={{ fontFamily: "Sentient, serif" }}
                >
                  ✦
                </div>
                <div>
                  <h3
                    className="text-[#181818] font-semibold mb-2 text-sm uppercase tracking-wider"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Past Issues ── */}
      <section className="py-16 px-4 sm:px-8 bg-[#EAE9E3]">
        <div className="max-w-7xl mx-auto">
          <div ref={archiveRef}>
            <p
              className="text-[#5E17EB] uppercase mb-3"
              style={{
                fontFamily: "Lato, sans-serif", fontWeight: 500, fontSize: "13px", letterSpacing: "0.12em",
                opacity: archiveVisible ? 1 : 0,
                transform: archiveVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
              }}
            >
              The Archive
            </p>
            <h2
              className="text-4xl sm:text-5xl text-[#181818] mb-12"
              style={{
                fontFamily: "Sentient, serif", fontWeight: 400,
                opacity: archiveVisible ? 1 : 0,
                transform: archiveVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s",
              }}
            >
              Past Issues
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastIssues.map((issue, i) => (
              <IssueCard key={issue.issue} issue={issue} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 sm:px-8 bg-white">
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
            Ready to go beyond reading and begin your own healing journey? Our advisors are here to help.
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