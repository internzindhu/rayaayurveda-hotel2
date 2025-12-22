import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ScrollReveal from "@/components/lightswind/scroll-reveal";
import { TextAnimate } from "@/components/ui/text-animate";
import ContactPopup from "../components/ContactPopup";

export default function Home() {
  const [blur, setBlur] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only set blur from scroll if video hasn't ended yet
      if (!videoEnded) {
        setBlur(window.scrollY > window.innerHeight * 0.6);
      }
    };
    const handleVideoEnd = () => {
      setVideoEnded(true);
      setBlur(true);
    };

    const currentVideoRef = videoRef.current;
    window.addEventListener("scroll", handleScroll);
    currentVideoRef?.addEventListener("ended", handleVideoEnd);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      currentVideoRef?.removeEventListener("ended", handleVideoEnd);
    };
  }, [videoEnded]);


  return (
    <div className="landing-theme overflow-x-hidden">
      {/* Absolute Fullscreen Background Video - Only for Hero Section */}
      <div className="absolute top-0 left-0 right-0 w-full min-h-[100svh] lg:h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop={true} // Stop looping so ended event fires
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: 1, objectPosition: 'center top' }}
        >
          <source src="/landing4.mp4" type="video/mp4" />
        </video>
      </div>


      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full min-h-[100svh] lg:h-screen z-5 bg-black/10"></div>

      {/* Blur Overlay */}
      <div className={`absolute top-0 left-0 w-full min-h-[100svh] lg:h-screen z-10 pointer-events-none transition-all duration-2000 ease-in-out ${blur ? 'opacity-100' : 'opacity-0'}`} style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', background: 'rgba(0, 0, 0, 0.5)' }}></div>

      {/* Main Content Wrapper */}
      <div className="relative z-20">
        {/* Navigation */}
        <Navbar />
        {/* Hero */}
        <section className="relative min-h-[100svh] lg:h-[80vh] flex flex-col justify-center items-center text-center px-4">

          {/* Cards Container - Side by Side Layout */}
          <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto space-y-6">
            <div className="text-white w-full space-y-2">
              <TextGenerateEffect
                words="WE DON'T TREAT,"
                className="text-white  text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-tight"
                style={{ fontFamily: "Sentient, serif", fontStyle: 'normal', fontWeight: '300' }}
              />
              <TextGenerateEffect
                words="WE HEAL."
                className="text-white  text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-tight"
                style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
              />
            </div>

            <div className="text-white space-y-6 animate-fade-up" style={{ animationDelay: '3s' }}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/consultation" className="px-4 py-2 border border-white rounded-full text-white text-sm font-medium hover:bg-white hover:text-black transition whitespace-nowrap">
                  CALL AN EXPERT
                </Link>
                <Link to="/questionnaire" className="px-4 py-2 border border-white rounded-full text-white text-sm font-medium hover:bg-white hover:text-black transition whitespace-nowrap">
                  IS AYURVEDA FOR ME?
                </Link>
              </div>
            </div>
            <div>
              <p className="text-white text-base sm:text-lg text-center max-w-2xl mx-auto" style={{ fontFamily: 'poppins' }}>
                Ayurvedic healing retreats blending ancient wisdom, expert care, and modern serenity.
              </p>
            </div>
          </div>


        </section>

        {/* Introductory Paragraph Section */}
        <section className="py-12 px-4 sm:px-8 bg-[#FFFBF7]">
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-[#181818] leading-relaxed text-center" style={{ fontFamily: 'poppins' }}>
              Tucked away in the heart of nature, RAYA Longlife honors Ayurvedic wisdom & Ayurveda by pairing each guest-owned holistic retreat, authentic spiritual & wellbeing through transformative healing experiences.
            </p>
          </div>
        </section>


        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F4F4F4] relative ">
          <div className="max-w-7xl mx-auto">

            <div className="relative w-full">
              {/* Full-width Image */}
              <div className="relative w-full aspect-[4/3] sm:h-[500px] lg:h-[600px]">
                <img
                  src="/home1.jpg"
                  alt="Ayurvedic treatment room"
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* White Text Overlay on Right - Desktop */}
                <div className="hidden sm:flex absolute top-4 right-4 bottom-4 w-[400px] lg:w-[450px] bg-[#E3E3E3] backdrop-blur-sm p-6 lg:p-8 shadow-lg flex-col justify-center rounded-lg">
                  <div className="space-y-4 lg:space-y-6">
                    {/* MEDICAL-FIRST APPROACH */}
                    <div>
                      <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                        MEDICAL-FIRST APPROACH
                      </h3>
                      <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                        all retreats are designed and supervised by Ayurvedic doctors
                      </p>
                    </div>

                    {/* PERSONALISATION */}
                    <div>
                      <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                        PERSONALISATION
                      </h3>
                      <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                        each program is created according to the client&apos;s health condition
                      </p>
                    </div>

                    {/* VERIFIED CLINICS & THERAPISTS */}
                    <div>
                      <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                        VERIFIED CLINICS & THERAPISTS
                      </h3>
                      <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                        we collaborate only with accredited facilities with the highest level of expertise
                      </p>
                    </div>

                    {/* END-TO-END CARE */}
                    <div>
                      <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                        END-TO-END CARE
                      </h3>
                      <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                        from diagnostics to post-retreat guidance
                      </p>
                    </div>

                    {/* HIGH SUCCESS RATE */}
                    <div>
                      <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                        HIGH SUCCESS RATE
                      </h3>
                      <p className="text-sm sm:text-base text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                        our clients report significant improvements in health and vitality after just one program
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* White Text Box - Mobile (below image) */}
              <div className="sm:hidden w-full bg-[#E3E3E3] p-6 shadow-lg rounded-lg mt-6">
                <div className="space-y-4">
                  {/* MEDICAL-FIRST APPROACH */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                      MEDICAL-FIRST APPROACH
                    </h3>
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                      all retreats are designed and supervised by Ayurvedic doctors
                    </p>
                  </div>

                  {/* PERSONALISATION */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                      PERSONALISATION
                    </h3>
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                      each program is created according to the client&apos;s health condition
                    </p>
                  </div>

                  {/* VERIFIED CLINICS & THERAPISTS */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                      VERIFIED CLINICS & THERAPISTS
                    </h3>
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                      we collaborate only with accredited facilities with the highest level of expertise
                    </p>
                  </div>

                  {/* END-TO-END CARE */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                      END-TO-END CARE
                    </h3>
                    <p className="text-[16px] text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                      from diagnostics to post-retreat guidance
                    </p>
                  </div>

                  {/* HIGH SUCCESS RATE */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#181818] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Lato' }}>
                      HIGH SUCCESS RATE
                    </h3>
                    <p className="text-sm text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato' }}>
                      our clients report significant improvements in health and vitality after just one program
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nourish Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Header with Logo */}
            <div className="text-center mb-12 sm:mb-16">
              {/* Blue line at top */}
              {/* <div className="w-full h-0.5 bg-blue-600 mb-8 sm:mb-12"></div> */}

              {/* RAYA WELLBEING */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] uppercase mb-2" style={{ fontFamily: 'Sentient, serif' }}>
                RAYA WELLBEING
              </h1>

              {/* Retreats */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB] font-normal" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                Retreats
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
              <div className="text-center mt-24 sm:mt-32">
                <Link to="/treatments" className="text-[#5E17EB]  text-lg hover:underline inline-block" style={{ fontFamily: 'poppins' }}>
                  DISCOVER ALL RETREATS →
                </Link>
              </div>
            </div>

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
                }}>How it works</h2>

              </div>
              {/* <p className="text-sm sm:text-base text-[#5E17EB] uppercase tracking-wider mb-2" style={{ fontFamily: 'poppins' }}>WHAT WE OFFER IN</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient Bold, serif' }}>Nourish</h2>
              <p className="text-base sm:text-lg text-[#181818] max-w-2xl leading-relaxed" style={{ fontFamily: 'poppins' }}>
                Restore your body with fresh, local and natural produce, nutritious cuisine, ingredients, and a diet to gently detoxify, balance, and rejuvenate.
              </p> */}
            </div>
          </div>
          <div className="bg-[#EAE9E3] w-full pb-10">
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
                src="/process.png"
                alt="Natural ingredients and produce"
                className="w-full lg:w-[892px] h-auto lg:h-[458px] lg:ml-[32%] object-cover rounded-lg lg:rounded-none"
              />
              {/* Overlaying Text Box */}
              <div className="relative lg:absolute bottom-0 left-0 lg:left-40 bg-[#F4F4F4] lg:bg-opacity-95 h-auto lg:h-[342px] p-4 sm:p-6 md:p-8 lg:p-10 max-w-full lg:max-w-lg mt-4 lg:mt-0 lg:m-4 lg:m-6 lg:m-8 rounded-lg">
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
        </section>

        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
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
              {/* <p className="text-sm sm:text-base text-[#5E17EB] uppercase tracking-wider mb-2" style={{ fontFamily: 'poppins' }}>WHAT WE OFFER IN</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient Bold, serif' }}>Nourish</h2>
              <p className="text-base sm:text-lg text-[#181818] max-w-2xl leading-relaxed" style={{ fontFamily: 'poppins' }}>
                Restore your body with fresh, local and natural produce, nutritious cuisine, ingredients, and a diet to gently detoxify, balance, and rejuvenate.
              </p> */}
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
                src="/med.png"
                alt="Natural ingredients and produce"
                className="w-full lg:w-[892px] h-auto lg:h-[458px] lg:mx-auto object-cover rounded-lg lg:rounded-none"
              />
              {/* Overlaying Text Box */}
              <div
                className="
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
                "
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

        {/* Awaken Section */}
        {/* <section className="py-16 sm:py-20 px-4 sm:px-8 ">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <p className="text-sm sm:text-base text-[#5E17EB] uppercase tracking-wider mb-2" style={{ fontFamily: 'poppins' }}>UNDERSTAND THE JOURNEY OF BEING</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient Bold, serif' }}>Awaken</h2>
              <p className="text-base sm:text-lg text-[#181818] max-w-2xl leading-relaxed" style={{ fontFamily: 'poppins' }}>
                Realign yourself to your inner desires and aspirations. Reconnect to your body, mind and soul.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
             
              <div className="lg:w-1/2 order-2 lg:order-1">
                <img
                  src="/ayurveda2.jpg"
                  alt="Person diving into water"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div className="lg:w-1/2 bg-[#EAE9E3] p-8 sm:p-12 rounded-lg order-1 lg:order-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient Bold, serif' }}>Balance</h3>
                <p className="text-base sm:text-lg text-[#181818] mb-6 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  Experience the transformative power of aligning your physical, mental, and spiritual well-being through ancient Ayurvedic practices.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] font-semibold hover:underline" style={{ fontFamily: 'poppins' }}>
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </section> */}

        {/* Healing Retreats DESIGNED FOR YOU Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#EAE9E3]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12  items-start">
              {/* Left Side - Heading */}
              <div className="lg:w-1/2">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient, serif', fontStyle: 'light' }}>Ayurveda</h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB]  mb-8" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>Healing Retreat</h3>
              </div>
              {/* Right Side - Two Columns of Text */}
              <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Each retreat is carefully curated to address your unique health needs, combining traditional Ayurvedic wisdom with modern wellness practices.
                  </p>
                  <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Our expert team works closely with you to create a personalized healing journey that aligns with your goals and lifestyle.
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    From initial consultation to post-retreat support, we ensure every aspect of your experience is tailored to your individual needs.
                  </p>
                  <p className="text-base sm:text-lg text-[#181818] mb-6 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Discover how our holistic approach can transform your health and restore balance to your body, mind, and spirit.
                  </p>
                  <Link to="/individual-stays" className="text-[#5E17EB] font-semibold hover:underline" style={{ fontFamily: 'Lato' }}>
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F4F4F4]">

          <div className=" w-full pb-10">

            <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '100%',
              letterSpacing: '0.1em',
              textAlign: 'center',
              textTransform: 'uppercase'
            }}>What to expect</h2>
            {/* Top Section: Heading with vertical separator and description */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">

              <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[20%] items-center justify-between">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>The benefits</h3>
                <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center"></div>
              </div>
              <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-6 lg:gap-8">
                <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>An Ayurvedic retreat offers deep regeneration, restoring balance, vitality, and long-term wellbeing through a uniquely holistic and medically grounded approach.</p>
              </div>
            </div>

            {/* Bottom Section: Image with overlaying text box */}
            <div className="relative px-4 sm:px-6 lg:px-0">
              <img
                src="/benefits.png"
                alt="Natural ingredients and produce"
                className="w-full lg:w-[892px] h-auto lg:h-[458px] lg:ml-[32%] object-cover rounded-lg lg:rounded-none"
              />
              {/* Overlaying Text Box */}
              <div className="relative lg:absolute bottom-0 left-0 lg:left-40 bg-[#F4F4F4] lg:bg-opacity-95 h-auto lg:h-[342px] p-4 sm:p-6 md:p-8 lg:p-10 max-w-full lg:max-w-lg mt-4 lg:mt-0 lg:m-4 lg:m-6 lg:m-8 rounded-lg">
                <h4 className="text-[#181818] mb-4 lg:mb-5 italic text-lg sm:text-xl lg:text-[20px]" style={{
                  fontFamily: 'Sentient, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}>
                  Supporting the body and mind.
                </h4>
                <p className="text-[#181818] leading-relaxed text-sm sm:text-base lg:text-[16px]" style={{ fontFamily: 'Lato, sans-serif', lineHeight: '1.5' }}>
                  Ayurvedic retreats offer relief from fatigue, stress, digestive issues, hormonal imbalance, physical pain, and psychosomatic conditions. They help improve sleep, support immunity, increase vitality, and nurture long-term emotional and physical health. By combining medical insight with a holistic view, you gain deep regeneration and practical tools to care for your wellbeing long after your stay. At RAYA LongLife, you are in expert, compassionate hands.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
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
                }}>OUR FOUNDER</h2>

              </div>
              {/* <p className="text-sm sm:text-base text-[#5E17EB] uppercase tracking-wider mb-2" style={{ fontFamily: 'poppins' }}>WHAT WE OFFER IN</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient Bold, serif' }}>Nourish</h2>
              <p className="text-base sm:text-lg text-[#181818] max-w-2xl leading-relaxed" style={{ fontFamily: 'poppins' }}>
                Restore your body with fresh, local and natural produce, nutritious cuisine, ingredients, and a diet to gently detoxify, balance, and rejuvenate.
              </p> */}
            </div>
          </div>
          <div className="w-full pb-10">
            {/* Top Section: Heading with vertical separator and description */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
              <div className="flex w-full lg:w-1/2 gap-4 lg:gap-6 lg:pl-[30%] items-center justify-between">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl text-[#181818] mr-0 font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>Karin</h3>
                <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center"></div>
              </div>
              <div className="flex w-full lg:w-1/2 items-center gap-4 lg:gap-6 lg:gap-8">
                <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>I founded RAYA LongLife to help people discover Ayurveda as a true medical system — one that transforms health, energy, and your overall quality of life.</p>
              </div>
            </div>

            {/* Bottom Section: Image with overlaying text box */}
            <div className="relative px-4 sm:px-6 lg:px-0">
              <img
                src="/karin.png"
                alt="Natural ingredients and produce"
                className="w-full lg:w-[892px] h-auto lg:h-[458px] lg:mx-auto object-cover rounded-lg lg:rounded-none"
              />
              {/* Overlaying Text Box */}
              <div
                className="
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
                "
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
                  Why you’re in safe hands.
                </h4>

                <p
                  className="text-[#181818] leading-relaxed text-sm sm:text-base lg:text-[16px]"
                  style={{ fontFamily: 'Lato, sans-serif', lineHeight: '1.5' }}
                >
                  I have spent years guiding clients through Ayurvedic healing and working closely with certified doctors and clinics that support hundreds of people each year. Having gone through my own therapeutic processes, I deeply understand the importance of trust and expert care. That’s why I choose only places and teams I know personally — and those I trust completely.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 px-4 sm:px-8 ">
          {/* Header with Logo */}
          <div className="text-center mb-12 sm:mb-16">
            {/* Blue line at top */}
            {/* <div className="w-full h-0.5 bg-blue-600 mb-8 sm:mb-12"></div> */}

            {/* RAYA WELLBEING */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] uppercase mb-2" style={{ fontFamily: 'Sentient, serif' }}>
              healing Supported
            </h1>

            {/* Retreats */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB] font-normal" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
              by experts
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
                    src="/docs.png"
                    alt="Ayurvedic Healing Retreat"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  Ayurvedic Medical Doctors
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  Certified specialists with experience in both traditional and modern Ayurvedic practice.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW MORE →
                </Link>
              </div>

              {/* Card 2: Panchakarma Cleanse */}
              <div className="flex flex-col">
                <div className="mb-4 lg:mt-[60px]">
                  <img
                    src="/docs2.png"
                    alt="Panchakarma Cleanse"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  Senior Therapists
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  Experts in therapeutic procedures, Ayurvedic massages, and healing techniques.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW MORE →
                </Link>
              </div>

              {/* Card 3: Stress & Burnout Recovery */}
              <div className="flex flex-col">
                <div className="mb-4 lg:mt-[100px]">
                  <img
                    src="/docs3.png"
                    alt="Stress & Burnout Recovery"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818]  mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  Nutrition and Lifestyle Consultants
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  Professionals who help integrate Ayurvedic recommendations into everyday life.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW MORE →
                </Link>
              </div>

              {/* Card 4: Digestive & Gut Health Programme */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <img
                    src="/docs4.png"
                    alt="Digestive & Gut Health Programme"
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl text-[#181818] mb-3" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>
                  RAYA Specialist Team - Client Support
                </h3>
                <p className="text-sm text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'poppins' }}>
                  Guiding and supporting each client throughout the entire process.
                </p>
                <Link to="/treatments" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  VIEW MORE →
                </Link>
              </div>
            </div>


          </div></section>

        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#EAE9E3]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12  items-start">
              {/* Left Side - Heading */}
              <div className="lg:w-1/2">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] font-serif mb-4" style={{ fontFamily: 'Sentient, serif', fontStyle: 'light' }}>The power</h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5E17EB]  mb-8" style={{ fontFamily: 'Sentient, serif', fontStyle: 'italic' }}>Of Healing</h3>
              </div>
              {/* Right Side - Two Columns of Text */}
              <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Healing is a gentle return to your natural balance.
                  </p>
                  <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Beginning with stillness, awareness, and personalised care. At Raya LongLife, our Ayurvedic Healing Retreats combine traditional wisdom with tailored treatments and restorative rituals that support body, mind, and nervous system. We guide you with personal care from the first consultation to your return home. Healing is a journey back to yourself.
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-[#181818] mb-4 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Wellbeing begins with understanding your body’s unique needs. At Raya LongLife, we take a personalised, deeply attentive approach to every retreat. Through Ayurvedic diagnostics, mindful therapies, nourishing routines, and compassionate guidance, we help you create space for renewal and long-term balance. Your journey is supported at every step — with clarity, safety, and genuine care. True wellbeing unfolds when you return to yourself.
                  </p>
                  {/* <p className="text-base sm:text-lg text-[#181818] mb-6 leading-relaxed" style={{ fontFamily: 'Lato' }}>
                    Discover how our holistic approach can transform your health and restore balance to your body, mind, and spirit.
                  </p> */}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories of Healing - Testimonials Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0.1em',
                textAlign: 'center',
                textTransform: 'uppercase'
              }}>
                WHAT OUR CLIENTS SHARE
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-6xl text-[#181818] font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>
                Stories of healing
              </h3>
            </div>

            {/* Testimonial Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Testimonial Card 1 */}
              <div className="bg-[#F4F4F4] p-6 sm:p-8 rounded-lg">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#5E17EB" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                {/* Testimonial Text */}
                <p className="text-[#181818] mb-6 leading-relaxed text-base" style={{ fontFamily: 'Lato, sans-serif' }}>
                  As a medical doctor, I doubted Ayurveda for years, until I experienced it myself. My retreat in Sri Lanka was one of the best decisions of my life. It brought me peace, strength, and a completely new perspective on health.
                </p>
                {/* Client Name */}
                <p className="text-[#181818] font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Mudr. Katarina R.
                </p>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-[#F4F4F4] p-6 sm:p-8 rounded-lg">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#5E17EB" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                {/* Testimonial Text */}
                <p className="text-[#181818] mb-6 leading-relaxed text-base" style={{ fontFamily: 'Lato, sans-serif' }}>
                  My Ayurvedic retreat in Sri Lanka felt like paradise on earth. I loved deeply the surroundings were beautiful, the food wonderful, and the therapies fantastic. I regenerated my whole body and experienced a level of care you rarely find. Karin arranged everything with love and professionalism, it was perfect.
                </p>
                {/* Client Name */}
                <p className="text-[#181818] font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Mudr. Katarina R.
                </p>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-[#F4F4F4] p-6 sm:p-8 rounded-lg">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#5E17EB" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                {/* Testimonial Text */}
                <p className="text-[#181818] mb-6 leading-relaxed text-base" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Ayurveda has truly reset my life. In 40 days I lost more than 20 kg, stabilised my blood pressure, and overcame post-COVID difficulties. I felt safe, cared for by real experts, and experienced a sense of peace I hadn't known for years.
                </p>
                {/* Client Name */}
                <p className="text-[#181818] font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Branislav R.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Hide scrollbar for slider */}
      <style>{`

         @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
          opacity: 0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Floating Contact Button */}
      <button
        onClick={() => setIsContactOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#5E17EB] hover:bg-[#4B12BD] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center gap-2 group"
        aria-label="Open contact form"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="hidden sm:inline-block font-medium" style={{ fontFamily: 'poppins' }}>Contact</span>
      </button>

    </div>
  );
}
