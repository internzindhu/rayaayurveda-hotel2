import Navbar from "../components/Navbar";

export default function Destinations() {
  const destinations = [
    {
      name: "Sri Lanka",
      description: "Tropical paradise with ancient Ayurvedic traditions",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      highlights: ["Beach resorts", "Traditional practices", "Herbal gardens"]
    },
    {
      name: "India",
      description: "Birthplace of Ayurveda with authentic experiences",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      highlights: ["Kerala backwaters", "Himalayan retreats", "Authentic treatments"]
    },
    {
      name: "Thailand",
      description: "Blend of Ayurveda with Thai wellness traditions",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
      highlights: ["Luxury resorts", "Spa experiences", "Modern facilities"]
    },
    {
      name: "Europe",
      description: "Contemporary Ayurveda in scenic European settings",
      image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=800&q=80",
      highlights: ["Alpine wellness", "Organic cuisine", "European comfort"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#181818]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent z-10" />
        <img
          src="/home1.jpg"
          alt="Destinations"
          className="w-full h-[360px] sm:h-[440px] md:h-[520px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
          >
            Where you’ll heal
          </h1>
          <p
            className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl"
            style={{ fontFamily: "poppins" }}
          >
            Curated Ayurvedic sanctuaries across the world—medical-first, serene, and deeply restorative.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
        <div className="text-center mb-12">
          <p
            className="text-[#5E17EB] uppercase tracking-[0.15em] text-sm sm:text-base mb-2"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 600 }}
          >
            Our destinations
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-[#181818]"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
          >
            Crafted for healing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="bg-white/80 border border-[#EAE9E3] rounded-2xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)] overflow-hidden hover:shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)] transition-all duration-500"
            >
              <div className="relative h-64 sm:h-72">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <h3
                    className="text-white text-3xl sm:text-4xl font-light"
                    style={{ fontFamily: "Sentient, serif" }}
                  >
                    {dest.name}
                  </h3>
                  <span className="text-white/80 text-sm sm:text-base" style={{ fontFamily: "poppins" }}>
                    Medical-first
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 lg:p-8 space-y-4">
                <p className="text-[#181818]/80 text-base sm:text-lg" style={{ fontFamily: "poppins" }}>
                  {dest.description}
                </p>
                <div className="space-y-2">
                  <h4
                    className="text-[#181818] font-semibold text-base sm:text-lg"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dest.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[#181818]/80 text-sm sm:text-base"
                        style={{ fontFamily: "poppins" }}
                      >
                        <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-[#5E17EB]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="w-full bg-[#5E17EB] hover:bg-[#4B12BD] text-white py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-[0_10px_25px_-10px_rgba(94,23,235,0.7)]"
                  style={{ fontFamily: "poppins" }}
                >
                  Explore {dest.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

