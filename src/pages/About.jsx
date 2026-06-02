import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const WHY_ITEMS = [
  {
    title: "Ayurveda as Our Foundation",
    body: "Our primary focus is authentic Ayurveda, working with trusted retreats, experienced doctors, and genuine healing environments rooted in traditional practices.",
  },
  {
    title: "Wellness as a Choice, Not a Compromise",
    body: "Alongside Ayurveda, we offer curated wellness stays featuring yoga, meditation, Pilates, fitness, and mindful living experiences designed to support overall wellbeing.",
  },
  {
    title: "Personalized Guidance Backed by Expertise",
    body: "We take the time to understand your goals and, when needed, consult with Ayurvedic doctors to recommend the most suitable retreat and ideal program duration.",
  },
  {
    title: "Handpicked & Verified Properties",
    body: "Every property is carefully selected and reviewed to ensure authenticity, comfort, service quality, and a meaningful wellness experience.",
  },
  {
    title: "Sri Lankan Expertise with Global Support",
    body: "With a Sri Lanka–based team and international advisors, we provide trusted guidance, local insight, and personalized support throughout your journey.",
  },
  {
    title: "Transparent & Fair Value",
    body: "Our pricing is aligned with the resorts, often offering equal or better value, with clear communication and no hidden costs.",
  },
  {
    title: "Trusted Standards of Care",
    body: "We partner with resorts that maintain strong standards in Ayurveda doctors, therapists, treatments, wellness facilities, and guest experience.",
  },
  {
    title: "A Fully Guided Wellness Journey",
    body: "From your first inquiry to your return home, we support every stage of your experience — because true wellness goes beyond the stay itself.",
  },
];

const BEFORE_ITEMS = [
  {
    title: "Understanding Your Needs",
    body: "We begin by understanding your wellness goals, lifestyle, preferences, and expectations to recommend the most suitable Ayurveda or wellness retreat.",
  },
  {
    title: "Personalized Guidance Backed by Expertise",
    body: "Our wellness and Ayurveda specialists take the time to understand your needs, lifestyle, and wellness goals. Where required, we consult with experienced Ayurvedic doctors to help recommend the most suitable program type and ideal duration.",
  },
  {
    title: "Curated Retreat Recommendations",
    body: "Based on your wellness goals, preferred level of comfort, budget, and travel style, we carefully recommend retreats and experiences best suited to your individual journey.",
  },
  {
    title: "Dedicated Support",
    body: "Our team remains available before your arrival to answer questions and ensure a smooth and stress-free booking experience.",
  },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 150;
  window.scrollTo({ top, behavior: "smooth" });
}

function useReveal(ref, delay = 0, triggerDep = null) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => setVisible(true), delay);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerDep]);
  return visible;
}

export default function About() {
  const { hash } = useLocation();

  // image reveal refs
  const img1Ref = useRef(null);
  const overlay1Ref = useRef(null);
  const img2Ref = useRef(null);
  const overlay2Ref = useRef(null);
  const img3Ref = useRef(null);
  const overlay3Ref = useRef(null);
  const img4Ref = useRef(null);
  const overlay4Ref = useRef(null);

  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (id) => setOpenSection((prev) => (prev === id ? null : id));

  const img1Visible = useReveal(img1Ref, 100);
  const overlay1Visible = useReveal(overlay1Ref, 300);
  const img2Visible = useReveal(img2Ref, 100, openSection);
  const overlay2Visible = useReveal(overlay2Ref, 300, openSection);
  const img3Visible = useReveal(img3Ref, 100, openSection);
  const overlay3Visible = useReveal(overlay3Ref, 300, openSection);
  const img4Visible = useReveal(img4Ref, 100, openSection);
  const overlay4Visible = useReveal(overlay4Ref, 300, openSection);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => scrollToSection(id), 150);
    }
  }, [hash]);

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">

      {/* ── Hero ── */}
      <div className="relative min-h-[80svh] lg:h-[60vh] overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/aboutUs.jpg)", zIndex: 1 }}
        />
        <div className="absolute top-0 left-0 w-full h-full z-5 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-black/50" />
        <div className="relative z-20">
          <Navbar />
          <section className="relative min-h-[100svh] lg:h-[80vh] flex flex-col justify-center items-center text-center px-4">
            <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto space-y-6">
              <div className="text-white w-full space-y-2">
                <p
                  className="text-xs sm:text-sm tracking-[0.24em] uppercase text-white/85 mb-2"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  About Raya Longlife
                </p>
                <TextGenerateEffect
                  words="HEALING, GUIDED"
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "normal", fontWeight: "300" }}
                />
                <TextGenerateEffect
                  words="with purpose."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                />
                <p
                  className="text-white/90 text-sm sm:text-base max-w-lg mx-auto pt-4 leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Transparency, trust, and personalized care guide every experience we offer.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════ */}

      {/* Intro band */}
      <section id="our-story" className="py-16 px-4 mb-4 sm:px-8 bg-[#EAE9E3]">
        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg text-[#181818] leading-relaxed text-center" style={{ fontFamily: "poppins" }}>
            To curate and deliver trusted Ayurveda retreats and wellness stays across Asia and beyond—combining tradition, quality, and personalized support to help individuals restore balance and build lasting wellbeing.
          </p>
        </div>
      </section>

      {/* Purple label + heading/separator/lead */}
      <div className="bg-[#FFFBF7] w-full pb-10 pt-[7%]">
        <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
          fontFamily: "Lato, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "100%",
          letterSpacing: "0.1em",
          textAlign: "center",
          textTransform: "uppercase",
        }}>
          Foundations
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
          <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: "Sentient Bold, serif" }}>
              Our Story
            </h3>
            <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center" />
          </div>
          <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-8">
            <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            Transparency, trust, and personalized care guide every experience we offer.
            </p>
          </div>
        </div>

        {/* Image + right overlay */}
        <section className="py-8 px-4 sm:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full">
              <div className="relative w-full aspect-[4/3] sm:h-[500px] lg:h-[800px]">
                <img
                  ref={img1Ref}
                  src="/a1.jpg"
                  alt="Ayurvedic treatment room"
                  className={`w-full h-full object-cover rounded-lg transition-all duration-1000 ease-out ${img1Visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
                />
                <div
                  ref={overlay1Ref}
                  className={`hidden sm:flex absolute top-4 right-4 bottom-4 w-[400px] lg:w-[450px] bg-[#E3E3E3] backdrop-blur-sm p-6 lg:p-8 shadow-lg flex-col justify-center rounded-lg transition-all duration-1000 ease-out ${overlay1Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
                >
                  <div className="space-y-4 lg:space-y-6">
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: "Lato" }}>At Raya Longlife, we believe that true wellness comes from harmony between body,
mind, and nature. Our mission is to make the timeless wisdom of Ayurveda accessible
to everyone by connecting you with the finest Ayurvedic and wellness retreats across
Sri Lanka and beyond. </p>
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: "Lato" }}>
                      We operate through a global network of dedicated advisors, supported also by a Sri Lanka–based center for on-ground assistance—ensuring that you are guided, supported, and cared for at every stage of your journey.
                    </p>
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: "Lato" }}>
                      We carefully handpick each resort to ensure authenticity, comfort, and a holistic experience. Alongside traditional Ayurveda, we also offer a curated blend of wellness experiences including yoga, meditation, fitness, and mindful living—bringing together destinations where ancient traditions meet modern hospitality.
                    </p>
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: "Lato" }}>
                      Whether you're seeking relief from stress, a deeper healing journey, or simply a peaceful escape, our platform brings everything together under one roof.
                    </p>
                  </div>
                </div>
              </div>
              {/* Mobile version */}
              <div className={`sm:hidden w-full bg-[#E3E3E3] p-6 shadow-lg rounded-lg mt-6 transition-all duration-1000 ease-out ${overlay1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="space-y-4">
                  <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: "Lato" }}>
                    We operate through a global network of dedicated advisors, supported also by a Sri Lanka–based center for on-ground assistance.
                  </p>
                  <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: "Lato" }}>
                    We carefully handpick each resort to ensure authenticity, comfort, and a holistic experience—bringing together destinations where ancient traditions meet modern hospitality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section id="why-travel-with-us">
      <div className="bg-[#FFFBF7] w-full pb-10 pt-[7%]">
        <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
          fontFamily: "Lato, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "100%",
          letterSpacing: "0.1em",
          textAlign: "center",
          textTransform: "uppercase",
        }}>
          The Difference
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
          <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: "Sentient Bold, serif" }}>
              Why Raya
            </h3>
            <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center" />
          </div>
          <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-8">
            <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            Authentic Ayurveda at the core. Wellness, your way.
            </p>
          </div>
        </div>
      </div>
      </section>


      {/* 8-item grid with image — same style as Our Story */}
      <section className="py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full">
            <div className="relative w-full aspect-[4/3] sm:h-[500px] lg:h-[800px]">
              <img
                ref={img3Ref}
                src="/ayurveda2.jpg"
                alt="Why travel with Raya"
                className={`w-full h-full object-cover rounded-lg transition-all duration-1000 ease-out ${img3Visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
              />
              <div
                ref={overlay3Ref}
                className={`hidden sm:flex absolute top-4 right-4 bottom-4 w-[400px] lg:w-[500px] bg-[#E3E3E3] backdrop-blur-sm p-6 lg:p-8 shadow-lg flex-col rounded-lg transition-all duration-1000 ease-out ${overlay3Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
              >
                <div className="space-y-4 lg:space-y-5 overflow-y-auto h-full">
                  {WHY_ITEMS.map((item, i) => (
                    <div key={i}>
                      <h4 className="text-[#181818] mb-1 italic text-base lg:text-[17px]" style={{ fontFamily: "Sentient, serif", fontWeight: 400, fontStyle: "italic", lineHeight: "100%" }}>
                        {item.title}
                      </h4>
                      <p className="text-[#181818] text-sm lg:text-[13px]" style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.5" }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile: stacked list */}
            <div className={`sm:hidden w-full bg-[#E3E3E3] p-6 shadow-lg rounded-lg mt-6 transition-all duration-1000 ease-out ${overlay3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="space-y-4">
                {WHY_ITEMS.map((item, i) => (
                  <div key={i}>
                    <h4 className="text-[#181818] mb-1 italic text-base" style={{ fontFamily: "Sentient, serif", fontWeight: 400, fontStyle: "italic", lineHeight: "100%" }}>
                      {item.title}
                    </h4>
                    <p className="text-[#181818] text-sm" style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.5" }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS  — purple intro band
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="py-16 px-4 sm:px-8 bg-[#5E17EB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] md:text-[48px] lg:text-[72px] leading-none font-light text-white mb-2" style={{ fontFamily: "Sentient, serif" }}>
              Your Guided
            </h2>
            <p className="text-[36px] md:text-[48px] lg:text-[72px] leading-none tracking-[-0.01em] font-light text-white italic" style={{ fontFamily: "Sentient, serif", fontWeight: 300, fontStyle: "italic" }}>
              Wellness Journey.
            </p>
          </div>
          <div className="flex justify-center gap-12 sm:gap-24 mt-8">
            {["Before", "During", "After"].map((label, i) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center text-white text-sm font-semibold mb-3 cursor-pointer hover:border-white transition-colors"
                  style={{ fontFamily: "Lato, sans-serif" }}
                  onClick={() => { scrollToSection(label.toLowerCase()); setOpenSection(label.toLowerCase()); }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-[11px] tracking-[0.15em] uppercase text-white/70"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          JOURNEY ACCORDION — Before / During / After
      ══════════════════════════════════════════ */}
      <div className="bg-[#FFFBF7] px-4 sm:px-8 lg:px-12">

        {/* ── Before Your Stay ── */}
        <div id="before" className="border-b border-[#181818]/15">
          <button
            className="w-full flex items-center justify-between py-7 text-left cursor-pointer"
            onClick={() => toggleSection("before")}
          >
            <div className="flex items-center gap-5">
              {/* <span className="text-[#5E17EB] text-[11px] uppercase tracking-[0.3em]" style={{ fontFamily: "Lato, sans-serif" }}>01</span> */}
              <span className="text-[#5E17EB] mb-4 uppercase px-4 sm:px-8 lg:px-12" style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.1em",
                textAlign: "center",
                textTransform: "uppercase",
              }}>Before Your Stay</span>
            </div>
            <span className="flex-shrink-0 text-[#5E17EB]">
              {openSection === "before" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          {openSection === "before" && (
            <div className="pb-10 -mx-4 sm:-mx-8 lg:-mx-12">
              <h2 className="text-[#5E17EB] mb-4 uppercase px-4 sm:px-8 lg:px-12" style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.1em",
                textAlign: "center",
                textTransform: "uppercase",
              }}>
                Before Your Stay
              </h2>
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
                <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: "Sentient Bold, serif" }}>
                    Before Your Stay
                  </h3>
                  <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center" />
                </div>
                <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-8">
                  <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                    We begin by understanding your wellness goals, lifestyle, preferences, and expectations to recommend the most suitable Ayurveda or wellness retreat.
                  </p>
                </div>
              </div>
              <div className="relative px-4 sm:px-6 lg:px-0">
                <img
                  ref={img2Ref}
                  src="/a1.jpg"
                  alt="Before your stay preparation"
                  className={`w-full lg:w-[892px] h-auto lg:h-[458px] lg:ml-[32%] object-cover rounded-lg lg:rounded-none transition-all duration-1000 ease-out ${img2Visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
                />
                <div
                  ref={overlay2Ref}
                  className={`relative lg:absolute bottom-0 left-0 lg:left-40 bg-[#F4F4F4] lg:bg-opacity-95 h-auto lg:h-[342px] p-4 sm:p-6 md:p-8 lg:p-10 max-w-full lg:max-w-lg mt-4 lg:mt-0 lg:m-8 rounded-lg transition-all duration-1000 ease-out ${overlay2Visible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-12 translate-y-8"}`}
                >
                  <div className="space-y-4 lg:space-y-5 overflow-y-auto h-full">
                    {BEFORE_ITEMS.map((item, i) => (
                      <div key={i}>
                        <h4 className="text-[#181818] mb-1 italic text-base lg:text-[17px]" style={{ fontFamily: "Sentient, serif", fontWeight: 400, fontStyle: "italic", lineHeight: "100%" }}>
                          {item.title}
                        </h4>
                        <p className="text-[#181818] text-sm lg:text-[13px]" style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.5" }}>
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── During Your Stay ── */}
        <div id="during" className="border-b border-[#181818]/15">
          <button
            className="w-full flex items-center justify-between py-7 text-left cursor-pointer"
            onClick={() => toggleSection("during")}
          >
            <div className="flex items-center gap-5">
              {/* <span className="text-[#5E17EB] text-[11px] uppercase tracking-[0.3em]" style={{ fontFamily: "Lato, sans-serif" }}>02</span> */}
              <span className="text-[#5E17EB] mb-4 uppercase px-4 sm:px-8 lg:px-12" style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.1em",
                textAlign: "center",
                textTransform: "uppercase",
              }}>During Your Stay</span>
            </div>
            <span className="flex-shrink-0 text-[#5E17EB]">
              {openSection === "during" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          {openSection === "during" && (
            <div className="pb-10 -mx-4 sm:-mx-8 lg:-mx-12 py-16 sm:py-20 px-4 sm:px-8 bg-[#EAE9E3]">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  <div className="lg:w-1/2">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: "Sentient, serif", fontStyle: "light" }}>
                      During Your
                    </h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB] mb-8" style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}>
                      Stay.
                    </h3>
                  </div>
                  <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg text-[#181818] mb-2 italic" style={{ fontFamily: "Sentient, serif" }}>
                        A Personalized Experience
                      </h4>
                      <p className="text-base text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: "Lato" }}>
                        Daily wellness activities are tailored to each guest. Depending on the retreat, guests may experience Ayurveda treatments, yoga and meditation, wellness-focused meals, nature and cultural experiences, and fitness and mindfulness activities.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg text-[#181818] mb-2 italic" style={{ fontFamily: "Sentient, serif" }}>
                        Nourishing Dining
                      </h4>
                      <p className="text-base text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: "Lato" }}>
                        Many retreats focus on balanced wellness cuisine, including Ayurveda-based or health-focused meal plans designed to support overall wellbeing.
                      </p>
                      <h4 className="text-lg text-[#181818] mb-2 italic" style={{ fontFamily: "Sentient, serif" }}>
                        Time to Slow Down
                      </h4>
                      <p className="text-base text-[#181818] leading-relaxed" style={{ fontFamily: "Lato" }}>
                        Wellness stays are designed to encourage rest, mindfulness, balance, and reconnection with yourself and your surroundings. Our team remains available throughout your stay to assist if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── After Your Stay ── */}
        <div id="after" className="border-b border-[#181818]/15">
          <button
            className="w-full flex items-center justify-between py-7 text-left cursor-pointer"
            onClick={() => toggleSection("after")}
          >
            <div className="flex items-center gap-5">
              {/* <span className="text-[#5E17EB] text-[11px] uppercase tracking-[0.3em]" style={{ fontFamily: "Lato, sans-serif" }}>03</span> */}
              <span className="text-[#5E17EB] mb-4 uppercase px-4 sm:px-8 lg:px-12" style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.1em",
                textAlign: "center",
                textTransform: "uppercase",
              }}>After Your Stay</span>
            </div>
            <span className="flex-shrink-0 text-[#5E17EB]">
              {openSection === "after" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          {openSection === "after" && (
            <div className="pb-10 -mx-4 sm:-mx-8 lg:-mx-12">
              <h2 className="text-[#5E17EB] mb-4 uppercase px-4 sm:px-8 lg:px-12" style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.1em",
                textAlign: "center",
                textTransform: "uppercase",
              }}>
                After Your Stay
              </h2>
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
                <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: "Sentient Bold, serif" }}>
                    After Your Stay
                  </h3>
                  <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center" />
                </div>
                <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-8">
                  <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                    Wellness does not end when your stay is over. Many guests continue practices learned during their retreat—including mindful routines, healthier habits, balanced nutrition, movement, and self-care rituals that support long-term wellbeing.
                  </p>
                </div>
              </div>
              <div className="relative px-4 sm:px-6 lg:px-0">
                <img
                  ref={img4Ref}
                  src="/app.png"
                  alt="Continuing your wellness journey"
                  className={`w-full lg:w-[892px] h-auto lg:h-[458px] lg:ml-[32%] object-cover rounded-lg lg:rounded-none transition-all duration-1000 ease-out ${img4Visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
                />
                <div
                  ref={overlay4Ref}
                  className={`relative lg:absolute bottom-0 left-0 lg:left-40 bg-[#F4F4F4] lg:bg-opacity-95 h-auto lg:h-[342px] p-4 sm:p-6 md:p-8 lg:p-10 max-w-full lg:max-w-lg mt-4 lg:mt-0 lg:m-8 rounded-lg transition-all duration-1000 ease-out ${overlay4Visible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-12 translate-y-8"}`}
                >
                  <h4 className="text-[#181818] mb-4 lg:mb-5 italic text-lg sm:text-xl lg:text-[20px]" style={{ fontFamily: "Sentient, serif", fontWeight: 400, fontStyle: "italic", lineHeight: "100%" }}>
                    Follow-Up Support
                  </h4>
                  <p className="text-[#181818] leading-relaxed text-sm sm:text-base lg:text-[16px]" style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.5", whiteSpace: "pre-line" }}>
                    Where possible, we remain available after your stay to support your ongoing wellness journey through future retreat recommendations, continued wellness guidance, healthy eating ideas, seasonal detox juice suggestions, and wellness-focused recipes to help maintain balance beyond your retreat.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Closing band */}
      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-base text-[#181818] leading-relaxed" style={{ fontFamily: "Sentient, serif", whiteSpace: "pre-line" }}>
                We believe healing is a journey, not a destination. Our role is to walk alongside you — from your first inquiry to your return home.
              </p>
            </div>
            <div>
              <p className="text-base text-[#181818] leading-relaxed" style={{ fontFamily: "Sentient, serif", whiteSpace: "pre-line" }}>
                Every resort we partner with has been personally vetted for authenticity, therapeutic depth, and the quality of care they provide to each guest.
              </p>
            </div>
            <div>
              <p className="text-base text-[#181818] leading-relaxed" style={{ fontFamily: "Sentient, serif", whiteSpace: "pre-line" }}>
                Authentic Ayurveda at the core. Wellness, your way. Guided by Raya Longlife — wherever your journey takes you.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
