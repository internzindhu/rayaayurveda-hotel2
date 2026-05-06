import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const accordionData = [
  {
    id: "healed",
    title: "Conditions That Can Be Healed or Significantly Improved (Full Recovery Possible)",
    left: [
      "Fatigue",
      "Stress",
      "Anxiety",
      "Sleep disorders",
      "Weight regulation",
      "Metabolic disorders",
      "Inflammatory chronic forms",
    ],
    right: [
      "High blood pressure in early stages",
      "Skin problems (psoriasis, eczema)",
      "Post-COVID symptoms",
      "Mild COVID symptoms",
      "Various digestive diseases",
      "Thyroid dysfunction",
      "Your gut-health / IBS problems",
    ],
  },
  {
    id: "improved",
    title: "Conditions That Cannot Be Fully Cured But Can Be Significantly Improved or Stabilized",
    left: ["Arthritis", "Type 2 diabetes", "Tinnitus", "Parkinson's disease"],
    right: ["Multiple sclerosis", "Epilepsy", "Chronic neurological conditions"],
  },
  {
    id: "manageable",
    title: "Conditions That Are Not Curable — Only Symptomatically Manageable",
    left: ["Terminal conditions", "Advanced organ failure", "Severe genetic disorders"],
    right: ["Late-stage neurodegenerative diseases"],
  },
];

export default function AyurvedaGuide() {
  const location = useLocation();
  const [openAccordion, setOpenAccordion] = useState("healed");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const navbarHeight = 100;
          const top =
            element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }, 150);
      }
    }
  }, [location.hash]);

  const toggleAccordion = (id) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#FFFBF7]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pexels-kavi-31032831.jpg"
            alt="Ayurveda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 px-6 max-w-4xl mx-auto pt-24">
          <p
            className="text-white/50 text-[10px] uppercase tracking-[0.35em] mb-8"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Raya Longlife
          </p>
          <h1
            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold uppercase leading-[1.05]"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            WE DON'T TREAT.
          </h1>
          <h2
            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.05] mt-1"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
          >
            We heal.
          </h2>
          <p
            className="mt-8 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Ancient wisdom, modern precision, and a deep belief in treating the
            whole person — body, mind, and spirit.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path d="M0,70 Q720,0 1440,70 L1440,70 L0,70 Z" fill="#FFFBF7" />
          </svg>
        </div>
      </section>

      {/* ── What is Ayurveda ── */}
      <section id="what-is-ayurveda" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <p
          className="text-[#5E17EB] text-[10px] uppercase tracking-[0.3em] text-center mb-14"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Ayurveda as a Medical System
        </p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl mb-14 text-[#181818]"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
        >
          What is Ayurveda
        </h2>
        <div className="relative flex flex-col md:flex-row">
          <div className="w-full md:w-[65%] h-[360px] md:h-[480px] overflow-hidden flex-shrink-0">
            <img
              src="/ayurveda2.jpg"
              alt="What is Ayurveda"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 md:w-[42%] bg-white shadow-lg p-8 md:p-10 mt-0 md:mt-0">
            <p
              className="text-[#181818] text-[15px] leading-relaxed mb-4"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              A medical system that heals the root cause, not just the symptoms.
              Ayurveda seeks to understand and address the underlying causes of
              imbalance in both body and mind, rather than treating isolated issues.
            </p>
            <p
              className="text-[#181818]/70 text-[15px] leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              At Raya Longlife, we bring this time-proven medical approach into
              modern practice, making it accessible, effective, and safe for anyone
              seeking deep, lasting wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Vata, Pitta, Kapha ── */}
      <section id="doshas" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl mb-14 text-[#181818]"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
        >
          Introduction:<br />
          Vata, Pita, and Kapha
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <p
              className="text-[#181818]/65 text-[15px] leading-relaxed mb-5"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              In the fast-paced modern world, finding peace of mind can often feel
              like an unattainable dream. As ancient Ayurvedic therapy, the path back
              to ease and deep relaxation is rooted in understanding your unique
              constitution. Ancient India has long understood the mind as a continuous
              stream, flowing between activity and stillness.
            </p>
            <p
              className="text-[#181818]/65 text-[15px] leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Mindfulness therapy is much more than a spa treatment — it is a holistic
              healing practice rooted in millennia-old traditions of Ayurvedic wisdom,
              addressing the whole person rather than isolated symptoms.
            </p>
          </div>
          <div>
            <p
              className="text-[#181818]/65 text-[15px] leading-relaxed mb-5"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              In Ayurveda, three fundamental biological energies — Vata, Pitta, and
              Kapha — govern all physical and mental processes. Your unique blend
              determines your constitution (Prakriti) and the imbalances (Vikriti)
              that may arise through lifestyle, diet, and environment.
            </p>
            <p
              className="text-[#181818]/65 text-[15px] leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Understanding your dosha profile is the first step toward personalised
              Ayurvedic care — guiding the herbs, treatments, foods, and daily rhythms
              that will restore your natural balance most effectively.
            </p>
          </div>
        </div>
      </section>

      {/* ── Preventive & Curative ── */}
      <section id="preventive-curative" className="py-16 px-4 sm:px-8 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto">
          {/* Preventive */}
          <div className="mb-20">
            <h2
              className="text-5xl md:text-7xl lg:text-[90px] mb-12 text-[#181818]"
              style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
            >
              Preventive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <p
                className="text-[#181818]/65 text-[15px] leading-relaxed"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Healing is a gentle return to your natural balance. Beginning with
                stillness, awareness, and personalised care, at Raya Longlife our
                Ayurvedic healing retreats condition the body with care, using natural
                therapies, yoga, and meditation that support body, mind, and nervous
                system. We guide you every step of the way, from planning to execution —
                all personalised to your inner home.
              </p>
              <p
                className="text-[#181818]/65 text-[15px] leading-relaxed"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Wellbeing begins with understanding your body's unique needs. At Raya
                Longlife, we take a personalised, deeply attentive approach to each
                individual. Through expert medical therapies, rejuvenating routines, and
                comprehensive guidance, we help you create trusted renewal and long-term
                balance. Your transformation unfolds at every step — allowing you to
                return to yourself.
              </p>
            </div>
          </div>

          {/* Curative Approach */}
          <div>
            <h2
              className="text-5xl md:text-7xl lg:text-[90px] mb-12 text-[#181818]"
              style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
            >
              Curative<br />Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <p
                className="text-[#181818]/65 text-[15px] leading-relaxed"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Healing is a gentle return to your natural balance. Beginning with
                stillness, awareness, and personalised care, at Raya Longlife our
                Ayurvedic healing retreats condition the body with care, using natural
                therapies, rejuvenating nutrition, and restoration rituals that support
                body, mind, and nervous system. We guide you every step of the way,
                all personalised to your inner home.
              </p>
              <p
                className="text-[#181818]/65 text-[15px] leading-relaxed"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Wellbeing begins with understanding your body's unique needs. At Raya
                Longlife, we take a personalised, deeply attentive approach to each
                individual. Through expert medical therapies, rejuvenating routines, and
                comprehensive guidance, we help you create trusted renewal and long-term
                balance — with comprehensive treatment plans and personalised routines
                that ultimately allow you to return to yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Panchakarma ── */}
      <section id="panchakarma" className="py-16">
        <div className="px-4 sm:px-8 max-w-7xl mx-auto mb-12">
          <p
            className="text-[#5E17EB] text-[10px] uppercase tracking-[0.3em] mb-6"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Ayurvedic Procedures
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl text-[#181818]"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
          >
            What is Panchakarma
          </h2>
        </div>
        <div className="relative">
          <div className="w-full h-[420px] md:h-[560px] overflow-hidden">
            <img
              src="/panchakarma.jpg"
              alt="Panchakarma"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-10 lg:right-20 md:w-[38%] lg:w-[34%] bg-white shadow-xl p-8 md:p-10 mx-4 md:mx-0 -mt-8 md:mt-0 relative z-10">
            <p
              className="text-[#181818] font-semibold text-[15px] leading-relaxed mb-4"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Time-tested methods guided by certified practitioners.
            </p>
            <p
              className="text-[#181818]/65 text-[14px] leading-relaxed mb-3"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Panchakarma is Ayurveda's most comprehensive cleansing programme,
              administered under the guidance of trained physicians and practitioners.
              Our Ayurvedic programmes are supervised by senior Ayurvedic doctors,
              ensuring clinical safety throughout.
            </p>
            <p
              className="text-[#181818]/65 text-[14px] leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              These profound treatments are safe, reliable, and deeply rejuvenating
              — offering a path toward complete healing and restored balance energy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Conditions ── */}
      <section id="conditions" className="py-20 px-4 sm:px-8 max-w-5xl mx-auto">
        {accordionData.map((item) => (
          <div key={item.id} className="border-b border-[#181818]/15">
            <button
              className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
              onClick={() => toggleAccordion(item.id)}
            >
              <span
                className="text-[15px] md:text-base text-[#181818] pr-6 leading-snug"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                {item.title}
              </span>
              <span className="flex-shrink-0 text-[#5E17EB]">
                {openAccordion === item.id ? (
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
            {openAccordion === item.id && (
              <div className="pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="space-y-2.5">
                    {item.left.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[#181818]/65 text-[14px]"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5E17EB] flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2.5">
                    {item.right.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[#181818]/65 text-[14px]"
                        style={{ fontFamily: "Lato, sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5E17EB] flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}

        <blockquote
          className="mt-16 text-center text-[#181818]/55 text-[15px] md:text-base max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
        >
          "Some chronic or neurological conditions such as arthritis, diabetes type 2,
          tinnitus, multiple sclerosis, Parkinson's disease, or epilepsy cannot be
          completely cured. However, Ayurvedic treatments can significantly reduce
          symptoms, improve overall well-being, and support a better quality of life."
        </blockquote>
      </section>

      {/* ── Myths About Ayurveda ── */}
      <section id="myths" className="py-16">
        <div className="px-4 sm:px-8 max-w-7xl mx-auto mb-10">
          <h2
            className="text-5xl md:text-7xl lg:text-[90px] font-bold uppercase text-[#181818] leading-[1]"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            MYTHS ABOUT
          </h2>
          <h3
            className="text-5xl md:text-7xl lg:text-[90px] text-[#181818] leading-[1.05]"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
          >
            ayurveda
          </h3>
        </div>
        <div className="relative">
          <div className="w-full h-[420px] md:h-[560px] overflow-hidden">
            <img
              src="/ayurveda3.jpg"
              alt="Myths about Ayurveda"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="md:absolute md:bottom-10 md:right-10 lg:right-20 md:w-[38%] lg:w-[34%] bg-white shadow-xl p-8 md:p-10 mx-4 md:mx-0 -mt-8 md:mt-0 relative z-10">
            <p
              className="text-[#181818] text-[15px] leading-relaxed mb-4"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              A medical system that heals the root cause, not just the symptoms.
              Ayurveda seeks to understand and address the underlying causes of
              imbalance in both body and mind, rather than treating isolated issues.
            </p>
            <p
              className="text-[#181818]/65 text-[14px] leading-relaxed"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              At Raya Longlife, we bring this time-proven medical approach into
              modern practice, making it accessible, effective, and safe for anyone
              seeking deep, lasting wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ayurveda Vs Wellness ── */}
      <section id="ayurveda-vs-wellness" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-7xl lg:text-[90px] mb-16 text-[#181818] leading-[1.05]"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic", fontWeight: 400 }}
        >
          Ayurveda Vs<br />
          Wellness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <p
            className="text-[#181818]/65 text-[15px] leading-relaxed"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            A medical system that heals the root cause, not just the compromises.
            Ayurveda seeks to understand and address the underlying causes of imbalance
            in both body and mind, rather than treating isolated issues. At Raya
            Longlife, we bring this time-proven medical approach into modern practice,
            making it accessible, effective, and safe for anyone seeking deep, lasting
            wellbeing.
          </p>
          <p
            className="text-[#181818]/65 text-[15px] leading-relaxed"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            A medical system that heals the root cause, not just the compromises.
            Ayurveda seeks to understand and address the underlying causes of imbalance
            in both body and mind, rather than treating isolated issues. At Raya
            Longlife, rather than treating isolated issues, this time-proven medical
            approach is modern, effective, and safe for anyone seeking deep, lasting
            wellbeing.
          </p>
        </div>
      </section>
    </div>
  );
}