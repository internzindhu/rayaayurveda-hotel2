import Navbar from "../components/Navbar";

export default function Treatments() {
  const retreats = [
    {
      name: "UTMT Boutique Hotel",
      rating: "5★",
      duration: "10 days",
      price: "from €2,900",
      description: "Authentic Ayurveda in a designer hotel",
      location: "Asia",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Somatheeram Ayurveda Resort",
      rating: "★★★★",
      duration: "14 days",
      price: "from €2,450",
      description: "Authentic healing in Kerala",
      location: "India",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Ayurveda Resort Mandira",
      rating: "★★★★★",
      duration: "3 days",
      price: "from €1,452",
      description: "Authentic Ayurveda in luxurious surroundings",
      location: "Asia",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Ayurvie Weligama",
      rating: "★★★★★",
      duration: "10 days",
      price: "from €2,920",
      description: "Authentic Ayurveda in luxurious surroundings",
      location: "Sri Lanka",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Mangosteen",
      rating: "★★★★",
      duration: "7 days",
      price: "from €1,800",
      description: "Ayurveda & Wellness Resort",
      location: "Thailand",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Kingdom Ayurveda Resort",
      rating: "★★★★",
      duration: "10 days",
      price: "from €1,350",
      description: "Authentic Ayurveda",
      location: "Sri Lanka",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Boutique Resort Soul",
      rating: "★★★★★",
      duration: "10 days",
      price: "from €2,300",
      description: "Authentic Ayurveda in modern surroundings",
      location: "Asia",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Calendula Clinic",
      rating: "★★★★★",
      duration: "7 days",
      price: "from €2,430",
      description: "Holistic medicine clinic",
      location: "Europe",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Lotus Villa",
      rating: "★★★★",
      duration: "13 days",
      price: "from €2,750",
      description: "Ayurvedic resort & hospital",
      location: "India",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Peacock Ayurveda Resort",
      rating: "★★★★",
      duration: "10 days",
      price: "from €1,450",
      description: "Authentic Ayurveda in a family setting",
      location: "Sri Lanka",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Villa Alena",
      rating: "★★★★",
      duration: "7 days",
      price: "from €1,500",
      description: "Ayurveda in privacy",
      location: "Asia",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#EAE9E3]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#181818] mb-4" style={{ fontFamily: 'Sentient, serif' }}>
            Ayurvedic Retreats
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            If you want to invest in yourself and your health, an Ayurvedic healing retreat is the perfect place for you. 
            A great combination of therapeutic stay with an excellent therapeutic team and Ayurvedic cuisine will provide you with a complete Ayurveda experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {retreats.map((retreat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={retreat.image}
                  alt={retreat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#5E17EB]">
                  {retreat.rating}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#181818] mb-2" style={{ fontFamily: 'Sentient, serif' }}>
                  {retreat.name}
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {retreat.description}
                </p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {retreat.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {retreat.duration}
                  </span>
                </div>
                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-[#5E17EB]">{retreat.price}</p>
                  </div>
                  <button className="bg-[#5E17EB] hover:bg-[#4B12BD] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-2xl text-center shadow-lg">
          <h3 className="text-3xl font-bold text-[#181818] mb-4" style={{ fontFamily: 'Sentient, serif' }}>
            Need Help Choosing the Perfect Retreat?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Each of our Ayurvedic resorts is unique and proven over the years. We only offer resorts that maintain the highest quality of Ayurvedic therapies and diagnostics, because we truly care about the therapeutic results of each client.
          </p>
          <a 
            href="/consultation" 
            className="inline-block bg-[#5E17EB] hover:bg-[#4B12BD] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Book a Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

