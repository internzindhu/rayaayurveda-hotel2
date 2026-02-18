import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function IndividualStays() {
  const hotels = [
    {
      id: 1,
      name: "Tranquil Palms Ayurveda Resort",
      location: "Sri Lanka",
      price: "$2,500",
      duration: "7 nights",
      image: "/hotel.png",
      rating: 4.8
    },
    {
      id: 2,
      name: "Kerala Wellness Retreat",
      location: "India",
      price: "$2,200",
      duration: "7 nights",
      image: "/hotel.png",
      rating: 4.9
    },
    {
      id: 3,
      name: "Himalayan Healing Center",
      location: "India",
      price: "$3,000",
      duration: "10 nights",
      image: "/hotel.png",
      rating: 4.7
    }
  ];

  return (
    <div className="landing-theme min-h-screen bg-[#FFFBF7] overflow-x-hidden">
      {/* Hero Section with Background Image (same as About) */}
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
          <section className="relative min-h-[100svh] lg:h-[80vh] flex flex-col justify-center items-center text-center px-4">
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
              </div>
            </div>
          </section>
        </div>
      </div>
      <section className="py-16 px-4 sm:px-8 bg-[#FFFBF7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg text-[#181818] leading-relaxed text-center" style={{ fontFamily: 'poppins' }}>
            Tucked away in the heart of nature, RAYA Longlife honors Ayurvedic wisdom & Ayurveda by pairing each guest-owned holistic retreat, authentic spiritual & wellbeing through transformative healing experiences.
          </p>
        </div>
      </section>

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


      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Search Bar Section */}
        <div className="w-full bg-[#FFF8F2] rounded-xl shadow-sm border border-[#FFF0E0] px-6 sm:px-10 py-6 sm:py-8 mb-12 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
          {/* Destination */}
          <div className="flex-1 flex flex-col">
            <span
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Destination or Hotel
            </span>
            <span
              className="text-sm sm:text-base text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Country, region, hotel
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-[#E0D4C8]" />

          {/* Price Range */}
          <div className="flex-1 flex flex-col">
            <span
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Price Range
            </span>
            <span
              className="text-sm sm:text-base text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              What are you looking for?
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-[#E0D4C8]" />

          {/* Period */}
          <div className="flex-1 flex flex-col">
            <span
              className="text-xs sm:text-sm tracking-[0.16em] text-[#181818] mb-1"
              style={{ fontFamily: "Lato, sans-serif", textTransform: "uppercase" }}
            >
              Period
            </span>
            <span
              className="text-sm sm:text-base text-[#8C8C8C]"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              When &amp; for how long
            </span>
          </div>

          {/* Search */}
          <button
            type="button"
            className="md:ml-auto text-[#5E17EB] text-xs sm:text-sm tracking-[0.16em] uppercase"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Search &rarr;
          </button>
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
              <Link to="/book-hotel/1" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
              <Link to="/book-hotel/2" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
              <Link to="/book-hotel/3" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
              <Link to="/book-hotel/4" className="text-[#5E17EB] hover:underline inline-block uppercase" style={{ fontFamily: 'Lato', fontWeight: '500', fontStyle: 'normal', fontSize: '14px', lineHeight: '100%', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                VIEW RETREAT →
              </Link>
            </div>
          </div>



          {/* Discover All Retreats Button */}
          <div className="text-center mt-24 sm:mt-32">
            <Link to="/individual-stays" className="text-[#5E17EB]  text-lg hover:underline inline-block" style={{ fontFamily: 'poppins' }}>
              DISCOVER ALL RETREATS →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

