import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function About() {
  const [expandedSections, setExpandedSections] = useState({ 'healed': true });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [imageVisible, setImageVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [processImageVisible, setProcessImageVisible] = useState(true);
  const [processOverlayVisible, setProcessOverlayVisible] = useState(true);
  const [ayurvedaImageVisible, setAyurvedaImageVisible] = useState(false);
  const [ayurvedaOverlayVisible, setAyurvedaOverlayVisible] = useState(false);

  const sectionRefs = useRef([]);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const processImageRef = useRef(null);
  const processOverlayRef = useRef(null);
  const ayurvedaImageRef = useRef(null);
  const ayurvedaOverlayRef = useRef(null);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Intersection Observer for section reveal (Home-like)
  useEffect(() => {
    const observers = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleSections((prev) => new Set([...prev, index]));
              }, index * 50);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -80px 0px',
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const createObserver = (ref, setVisible, delay = 0) => {
      if (!ref.current) return null;

      // Check if element is already in view on mount
      const rect = ref.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        setTimeout(() => setVisible(true), delay);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => setVisible(true), delay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '100px' }
      );

      observer.observe(ref.current);
      return observer;
    };

    const observers = [];
    const imgObs = createObserver(imageRef, setImageVisible, 100);
    const overlayObs = createObserver(overlayRef, setOverlayVisible, 300);
    const processImgObs = createObserver(processImageRef, setProcessImageVisible, 100);
    const processOverlayObs = createObserver(processOverlayRef, setProcessOverlayVisible, 300);
    const ayurvedaImgObs = createObserver(ayurvedaImageRef, setAyurvedaImageVisible, 100);
    const ayurvedaOverlayObs = createObserver(ayurvedaOverlayRef, setAyurvedaOverlayVisible, 300);

    if (imgObs) observers.push(imgObs);
    if (overlayObs) observers.push(overlayObs);
    if (processImgObs) observers.push(processImgObs);
    if (processOverlayObs) observers.push(processOverlayObs);
    if (ayurvedaImgObs) observers.push(ayurvedaImgObs);
    if (ayurvedaOverlayObs) observers.push(ayurvedaOverlayObs);

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[80svh] lg:h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/aboutUs.jpg)',
            zIndex: 1,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-5 bg-black/10"></div>

        {/* Blur/Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-black/50"></div>

        {/* Main Content Wrapper */}
        <div className="relative z-20">
          {/* Navigation */}
          <Navbar />

          {/* Hero Content */}
          <section className="relative min-h-[80svh] lg:h-[60vh] flex flex-col justify-center items-center text-center px-4">
            <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto space-y-6">
              <div className="text-white w-full space-y-2">
                <TextGenerateEffect
                  words="MORE THAN TREATMENT"
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: 'normal', fontWeight: '300' }}
                />
                <TextGenerateEffect
                  words="A return to balance."
                  className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                />
                <TextGenerateEffect
                  words="Personalised Ayurvedic healing retreats rooted in medical expertise, holistic care, and ancient wisdom."
                  className="text-white text-[20px] sm:text-[22px] md:text-[24px] leading-tight"
                  style={{ fontFamily: "Lato, sans-serif", fontStyle: "normal", width: '75%', margin: '0 auto' }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>


      {/* Our Promise Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg text-[#181818] leading-relaxed text-center" style={{ fontFamily: 'poppins' }}>
            Tucked away in the heart of nature, RAYA Longlife honors Ayurvedic wisdom & Ayurveda by pairing each guest-owned holistic retreat, authentic spiritual & wellbeing through transformative healing experiences.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto">

          <div className="relative w-full">
            {/* Full-width Image */}
            <div className="relative w-full aspect-[4/3] sm:h-[500px] lg:h-[600px]">
              <img
                ref={imageRef}
                src="/home1.jpg"
                alt="Ayurvedic treatment room"
                className={`w-full h-full object-cover rounded-lg transition-all duration-1000 ease-out ${imageVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
                  }`}
              />

              {/* White Text Overlay on Right - Desktop */}
              <div
                ref={overlayRef}
                className={`hidden sm:flex absolute top-4 right-4 bottom-4 w-[400px] lg:w-[450px] bg-[#E3E3E3] backdrop-blur-sm p-6 lg:p-8 shadow-lg flex-col justify-center rounded-lg transition-all duration-1000 ease-out ${overlayVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
                  }`}
              >
                <div className="space-y-4 lg:space-y-6">
                  <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    At Raya Longlife, we believe that true wellness comes from harmony between body, mind, and nature. Our mission is to make the timeless wisdom of Ayurveda accessible to everyone by connecting you with the finest Ayurvedic resorts and retreats across Sri Lanka and beyond.
                  </p>
                  <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    We carefully handpick each resort to ensure authenticity, comfort, and a holistic experience. From serene spa getaways to luxury Ayurvedic retreats, we bring together destinations where ancient traditions meet modern hospitality.
                  </p>
                  <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Whether you&apos;re seeking relief from stress, a deeper healing journey, or simply a peaceful escape, our platform makes it easy to find and book the perfect Ayurvedic experience for your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* White Text Box - Mobile (below image) */}
            <div
              className={`sm:hidden w-full bg-[#E3E3E3] p-6 shadow-lg rounded-lg mt-6 transition-all duration-1000 ease-out ${overlayVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
                }`}
            >
              <div className="space-y-4">
                <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                  At Raya Longlife, we believe that true wellness comes from harmony between body, mind, and nature. Our mission is to make the timeless wisdom of Ayurveda accessible to everyone by connecting you with the finest Ayurvedic resorts and retreats across Sri Lanka and beyond.
                </p>
                <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                  We carefully handpick each resort to ensure authenticity, comfort, and a holistic experience. From serene spa getaways to luxury Ayurvedic retreats, we bring together destinations where ancient traditions meet modern hospitality.
                </p>
                <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                  Whether you&apos;re seeking relief from stress, a deeper healing journey, or simply a peaceful escape, our platform makes it easy to find and book the perfect Ayurvedic experience for your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col text-center  gap-8 items-center">


      </div>

      <div className="bg-[#EAE9E3] w-full pb-10 pt-[7%]">
        <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
          fontFamily: 'Lato, sans-serif',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0.1em',
          textAlign: 'center',
          textTransform: 'uppercase'
        }}>Ayurveda as a medical system</h2>
        {/* Top Section: Heading with vertical separator and description */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
          <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>Our process</h3>
            <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center"></div>
          </div>
          <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-6 lg:gap-8">
            <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>We gently guide you from the very first consultation to a fully tailored Ayurvedic retreat, ensuring personalised care, clarity, and support at every step of your healing journey.</p>
          </div>
        </div>

        {/* Bottom Section: Image with overlaying text box */}
        <div className="relative px-4 sm:px-6 lg:px-0">
          <img
            ref={processImageRef}
            src="/process.png"
            alt="Natural ingredients and produce"
            className={`w-full lg:w-[892px] h-auto lg:h-[458px] lg:ml-[32%] object-cover rounded-lg lg:rounded-none transition-all duration-1000 ease-out ${processImageVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-12'
              }`}
          />
          {/* Overlaying Text Box */}
          <div
            ref={processOverlayRef}
            className={`relative lg:absolute bottom-0 left-0 lg:left-40 bg-[#F4F4F4] lg:bg-opacity-95 h-auto lg:h-[342px] p-4 sm:p-6 md:p-8 lg:p-10 max-w-full lg:max-w-lg mt-4 lg:mt-0 lg:m-4 lg:m-6 lg:m-8 rounded-lg transition-all duration-1000 ease-out ${processOverlayVisible
              ? 'opacity-100 translate-x-0 translate-y-0'
              : 'opacity-0 translate-x-12 translate-y-8'
              }`}
          >
            <h4 className="text-[#181818] mb-4 lg:mb-5 italic text-lg sm:text-xl lg:text-[20px]" style={{
              fontFamily: 'Sentient, serif',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}>
              A truly ayurvedic journey from the very beginning.
            </h4>
            <p className="text-[#181818] leading-relaxed text-sm sm:text-base lg:text-[16px]" style={{ fontFamily: 'Lato, sans-serif', lineHeight: '1.5' }}>
              You start by filling out a short questionnaire or connecting directly  with our specialists, who will carefully review your needs, medical history, and goals. Based on this, we recommend a clinic that best supports your path to balance. All bookings and communication is handled for you. Just sit back and relax. After your retreat, you are provided with ongoing support to help you maintain long-term results.
            </p>
          </div>
        </div>
      </div>


      {/* Conditions Treated Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#5E17EB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] md:text-[48px] lg:text-[72px] leading-none font-light text-white mb-2" style={{ fontFamily: 'Sentient, serif' }}>
              WE TREAT FOLLOWING
            </h2>
            <p className="text-[36px] md:text-[48px] lg:text-[72px] leading-none tracking-[-0.01em] font-light text-white italic" style={{ fontFamily: 'Sentient, serif', fontWeight: 300, fontStyle: 'italic' }}>
              conditions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {/* Digestive Issues */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/digestiveicon.png" alt="Digestive" className="w-24 h-24 object-contain" />
              </div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                Digestive Issues
              </p>
            </div>

            {/* Metabolic Inflammation */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/inflammation.png" alt="Metabolic" className="w-24 h-24 object-contain" />
              </div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                Metabolic Inflammation
              </p>
            </div>

            {/* Sleep Issues */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/sleep.png" alt="Sleep" className="w-24 h-24 object-contain rounded-full" />
              </div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                Sleep Issues
              </p>
            </div>

            {/* Fatigue & Depression */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/pregnancy.png" alt="Pregnancy" className="w-24 h-24 object-contain" />
              </div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                Pregnancy & Postpartum
              </p>
            </div>

            {/* Allergies & Rashes */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/weight.png" alt="Allergies" className="w-24 h-24 object-contain" />
              </div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                Optimization and Weight
              </p>
            </div>

            {/* Increased Stress */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/hormonal.png" alt="Hormonal" className="w-24 h-24 object-contain" />
              </div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                Hormonal Health
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Conditions/FAQ Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Section 1: Conditions That Can Be Healed or Significantly Improved */}
            <div>
              <button
                onClick={() => toggleSection('healed')}
                className="relative w-full flex items-center justify-center text-center mb-4"
              >
                <h3 className="text-2xl font-semibold text-[#181818] italic" style={{ fontFamily: 'Sentient, serif', fontWeight: 300, fontStyle: 'italic' }}>
                  Conditions That Can Be Healed or Significantly Improved (Full Recovery Possible)
                </h3>
                <svg
                  className={`absolute right-0 w-5 h-5 text-[#5E17EB] transition-transform ${expandedSections['healed'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['healed'] && (
                <div className="mt-4">
                  <p className="text-base text-[#181818] leading-relaxed mb-6" style={{ fontFamily: 'Sentient, serif' }}>
                    These conditions are reversible, often caused by lifestyle factors, stress, or hormonal imbalance – Ayurveda can achieve excellent results.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 list-disc list-inside" style={{ fontFamily: 'Sentient, serif' }}>
                      <li className="text-base text-[#181818]">Fatigue</li>
                      <li className="text-base text-[#181818]">Stress</li>
                      <li className="text-base text-[#181818]">Burnout</li>
                      <li className="text-base text-[#181818]">Sleep disorders</li>
                      <li className="text-base text-[#181818]">Weight regulation</li>
                      <li className="text-base text-[#181818]">Digestive tract disorders</li>
                      <li className="text-base text-[#181818]">Metabolic disorders (milder forms)</li>
                    </ul>
                    <ul className="space-y-2 list-disc list-inside" style={{ fontFamily: 'Sentient, serif' }}>
                      <li className="text-base text-[#181818]">High blood pressure (in early stages, if not genetically based)</li>
                      <li className="text-base text-[#181818]">Liver disease (in early stages, without permanent liver damage)</li>
                      <li className="text-base text-[#181818]">Hypoglycemia (low blood sugar)</li>
                      <li className="text-base text-[#181818]">Post-COVID symptoms</li>
                      <li className="text-base text-[#181818]">Skin diseases (eczema, psoriasis, acne)</li>
                      <li className="text-base text-[#181818]">Allergies (can be significantly reduced or eliminated)</li>
                      <li className="text-base text-[#181818]">Thyroid gland (mild hypothyroidism, non-autoimmune forms)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Conditions That Cannot Be Fully Cured */}
            <div className="border-t border-gray-300 pt-[10%]">
              <button
                onClick={() => toggleSection('improved')}
                className="relative w-full flex items-center justify-center text-center"
              >
                <h3 className="text-xl font-semibold text-[#181818] italic" style={{ fontFamily: 'Sentient, serif', fontWeight: 300, fontStyle: 'italic' }}>
                  Conditions That Cannot Be Fully Cured but Can Be Significantly Improved or Stabilized
                </h3>
                <svg
                  className={`absolute right-0 w-5 h-5 text-[#5E17EB] transition-transform ${expandedSections['improved'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['improved'] && (
                <p className="text-base text-[#181818] leading-relaxed mt-4" style={{ fontFamily: 'Sentient, serif' }}>
                  These are chronic or autoimmune conditions, but with regular Ayurvedic therapy, it is possible to improve quality of life and reduce the frequency and intensity of symptoms.
                </p>
              )}
            </div>

            {/* Section 3: Conditions That Are Not Curable */}
            <div className="border-t border-gray-300 pt-[10%]">
              <button
                onClick={() => toggleSection('symptomatic')}
                className="relative w-full flex items-center justify-center text-center"
              >
                <h3 className="text-xl font-semibold text-[#181818] italic" style={{ fontFamily: 'Sentient, serif', fontWeight: 300, fontStyle: 'italic' }}>
                  Conditions That Are Not Curable – Only Symptomatically Manageable
                </h3>
                <svg
                  className={`absolute right-0 w-5 h-5 text-[#5E17EB] transition-transform ${expandedSections['symptomatic'] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections['symptomatic'] && (
                <p className="text-base text-[#181818] leading-relaxed mt-4" style={{ fontFamily: 'Sentient, serif' }}>
                  These illnesses are progressive or genetically determined – Ayurveda can help relieve symptoms, slow progression, and improve overall well-being:
                </p>
              )}
            </div>

            {/* Concluding Paragraph */}
            <div className="pt-[10%] pb-[10%] w-full">
              <p className="text-[16px] md:text-[18 px] lg:text-[20px] text-[#181818] leading-relaxed italic text-center" style={{ fontFamily: 'Sentient, serif' }}>
                &quot;Some chronic or neurological conditions such as arthritis, diabetes type II, tinnitus, multiple sclerosis, Parkinson&apos;s disease, or epilepsy cannot be completely cured. However, Ayurvedic treatments can significantly reduce symptoms, improve overall well-being, and support a better quality of life.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`py-16 sm:py-20 px-4 sm:px-8 bg-white transition-all duration-1000 ease-out ${visibleSections.has(0)
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with Logo */}


          <div className="mb-6">

            <div className="flex flex-col text-center  gap-8 items-center">
              <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0.1em',
                textAlign: 'center',
                textTransform: 'uppercase'
              }}>Ayurveda as a medical system</h2>

            </div>
          </div>
        </div>
        <div className="w-full pb-10">
          {/* Top Section: Heading with vertical separator and description */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
            <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[30%] items-center justify-between">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] mr-0 font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>Ayurveda</h3>
              <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center"></div>
            </div>
            <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-6 lg:gap-8">
              <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>Ayurveda is the world's oldest complete system of medicine, a science that views each person as a whole.</p>
            </div>
          </div>

          {/* Bottom Section: Image with overlaying text box */}
          <div className="relative px-4 sm:px-6 lg:px-0">
            <img
              ref={ayurvedaImageRef}
              src="/healing.png"
              alt="Natural ingredients and produce"
              className={`w-full lg:w-[892px] h-auto lg:h-[458px] lg:mx-auto object-cover rounded-lg lg:rounded-none transition-all duration-1000 ease-out ${ayurvedaImageVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
                }`}
            />
            {/* Overlaying Text Box */}
            <div
              ref={ayurvedaOverlayRef}
              className={`
                relative
                lg:absolute
                lg:-bottom-2
                right-0
                lg:right-48
                bg-[#F4F4F4]
                lg:bg-opacity-95
                h-auto
                lg:h-[342px]
                p-4 sm:p-6 md:p-8 lg:p-10
                max-w-full
                lg:max-w-sm
                mt-8
                rounded-lg
                transition-all duration-1000 ease-out
                ${ayurvedaOverlayVisible
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : 'opacity-0 translate-x-12 translate-y-8'
                }
              `}
            >
              <h4
                className="text-[#181818] mb-4 lg:mb-5 italic text-lg sm:text-xl lg:text-[20px]"
                style={{
                  fontFamily: 'Sentient, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                }}
              >
                A medical system that heals the root cause, not just the symptoms.
              </h4>

              <p
                className="text-[#181818] leading-relaxed text-sm sm:text-base lg:text-[16px]"
                style={{ fontFamily: 'Lato, sans-serif', lineHeight: '1.5' }}
              >
                Ayurveda seeks to understand and address the underlying causes of imbalance
                in both body and mind, rather than treating isolated issues. At RAYA
                LongLife, we bring this time-proven medical approach into modern practice,
                making it clear, effective, and safe for anyone seeking deep, lasting
                wellbeing.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className={`py-16 sm:py-20 px-4 sm:px-8 bg-[#EAE9E3] transition-all duration-1000 ease-out ${visibleSections.has(4)
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12  items-start">
            {/* Left Side - Heading */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient, serif', fontStyle: 'light' }}>Modern</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB]  mb-8" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>Support</h3>
            </div>
            {/* Right Side - Two Columns of Text */}
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                  During your stay, every guest receives a smart wellness wristband. This wristband seamlessly tracks key health data such as heart rate, sleep patterns, and activity levels while you enjoy your Ayurvedic journey.
                </p>
                {/* <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Our expert team works closely with you to create a personalized healing journey that aligns with your goals and lifestyle.
                  </p> */}
              </div>
              <div>
                <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                  The information is securely synced with our mobile app, giving you real-time insights into your well-being.
                </p>
                {/* <p className="text-base sm:text-lg text-[#181818] mb-6 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Discover how our holistic approach can transform your health and restore balance to your body, mind, and spirit.
                  </p> */}
                {/* <Link to="/individual-stays" className="text-[#5E17EB] font-semibold hover:underline" style={{ fontFamily: 'Lato' }}>
                      Read More →
                    </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className=" w-full pb-10 pt-[10%]">
        <div className="flex flex-col text-center  gap-8 items-center">
          <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
            fontFamily: 'Lato, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0.1em',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>What to expect</h2>

        </div>
        {/* Top Section: Heading with vertical separator and description */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
          <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>Our mobile App</h3>
            <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center"></div>
          </div>
          <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-6 lg:gap-8">
            <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>This unique blend of ancient Ayurvedic care and modern technology ensures that your healing experience is not only traditional but also personalized and data-driven.</p>
          </div>
        </div>

        {/* Bottom Section: Image with overlaying text box */}
        <div className="relative px-4 sm:px-6 lg:px-0">
          <img
            ref={processImageRef}
            src="/app.png"
            alt="Natural ingredients and produce"
            className={`w-full lg:w-[892px] h-auto lg:h-[458px] lg:ml-[32%] object-cover rounded-lg lg:rounded-none transition-all duration-1000 ease-out ${processImageVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-12'
              }`}
          />
          {/* Overlaying Text Box */}
          <div
            ref={processOverlayRef}
            className={`relative lg:absolute bottom-0 left-0 lg:left-40 bg-[#F4F4F4] lg:bg-opacity-95 h-auto lg:h-[342px] p-4 sm:p-6 md:p-8 lg:p-10 max-w-full lg:max-w-lg mt-4 lg:mt-0 lg:m-4 lg:m-6 lg:m-8 rounded-lg transition-all duration-1000 ease-out ${processOverlayVisible
              ? 'opacity-100 translate-x-0 translate-y-0'
              : 'opacity-0 translate-x-12 translate-y-8'
              }`}
          >
            <h4 className="text-[#181818] mb-4 lg:mb-5 italic text-lg sm:text-xl lg:text-[20px]" style={{
              fontFamily: 'Sentient, serif',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}>
              A truly ayurvedic journey from the very beginning.
            </h4>
            <p className="text-[#181818] leading-relaxed text-sm sm:text-base lg:text-[16px]" style={{ fontFamily: 'Lato, sans-serif', lineHeight: '1.5' }}>
              You start by filling out a short questionnaire or connecting directly  with our specialists, who will carefully review your needs, medical history, and goals. Based on this, we recommend a clinic that best supports your path to balance. All bookings and communication is handled for you. Just sit back and relax. After your retreat, you are provided with ongoing support to help you maintain long-term results.
            </p>
          </div>
        </div>
      </div>

      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`py-16 sm:py-20 px-4 sm:px-8 bg-white transition-all duration-1000 ease-out ${visibleSections.has(2)
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with Logo */}
          <div className="text-center mb-12 sm:mb-16">
            {/* Blue line at top */}
            {/* <div className="w-full h-0.5 bg-blue-600 mb-8 sm:mb-12"></div> */}

            {/* RAYA WELLBEING */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] uppercase mb-2" style={{ fontFamily: 'Sentient, serif' }}>
              Our Ayurvedic     </h1>

            {/* Retreats */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB] font-normal" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
              {/* <Parters></Parters> */}Partners
            </h2>
          </div>

          {/* Retreat Programs Grid */}
          <div className="relative mb-24 sm:mb-24">
            {/* Vertical separator line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-10 w-px bg-gray-900 transform -translate-x-1/2"></div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Card 1: Ayurvedic Healing Retreat (Signature) */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <img
                    src="/meds.png"
                    alt="Ayurvedic Healing Retreat"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  Ayurvedic Healing Retreat (Signature)
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  A comprehensive therapeutic program for regeneration, detoxification, and restoring balance in both body and mind.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW RETREAT →
                </Link>
              </div>

              {/* Card 2: Panchakarma Cleanse */}
              <div className="flex flex-col">
                <div className="mb-4 lg:mt-[60px]">
                  <img
                    src="/panchakarma.jpg"
                    alt="Panchakarma Cleanse"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  Panchakarma Cleanse
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  A deep medical detox supervised by a doctor to reset the nervous system, hormonal balance, and overall health.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW RETREAT →
                </Link>
              </div>

              {/* Card 3: Stress & Burnout Recovery */}
              <div className="flex flex-col">
                <div className="mb-4 lg:mt-[100px]">
                  <img
                    src="/stress.png"
                    alt="Stress & Burnout Recovery"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  Stress & Burnout Recovery
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  A program focused on exhaustion, insomnia, anxiety, and long-term mental strain.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW RETREAT →
                </Link>
              </div>

              {/* Card 4: Digestive & Gut Health Programme */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <img
                    src="/digestive.png"
                    alt="Digestive & Gut Health Programme"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818] mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  Digestive & Gut Health Programme
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  Therapy targeting digestive issues, intolerances, inflammation, and metabolic problems.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW RETREAT →
                </Link>
              </div>
            </div>



            {/* Discover All Retreats Button */}

          </div>


        </div>

      </section>


      {/* Proven Healing Section */}


      {/* Concluding Text Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-base text-[#181818] leading-relaxed" style={{ fontFamily: 'Sentient, serif' }}>
                At RAYA, we are dedicated to providing authentic Ayurvedic healing experiences that restore balance to mind, body, and soul.
                Our mission is to bridge ancient wisdom with modern wellness practices.
              </p>
            </div>
            <div>
              <p className="text-base text-[#181818] leading-relaxed" style={{ fontFamily: 'Sentient, serif' }}>
                We believe in the power of nature&apos;s healing properties and the importance of personalized care in achieving optimal health.
                Every guest receives individualized attention and treatments tailored to their unique constitution.
              </p>
            </div>
            <div>
              <p className="text-base text-[#181818] leading-relaxed" style={{ fontFamily: 'Sentient, serif' }}>
                Our thoughtfully curated retreats are designed to support long-term health, vitality, and wellbeing,
                creating transformative experiences that inspire lasting health and well-being.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
