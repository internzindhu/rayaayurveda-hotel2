import Navbar from "../components/Navbar";
import RevealOnScroll from "../components/RevealOnScroll";

export default function Shop() {
  const products = [
    { id: 1, name: "Ayurvedic Herbal Tea Set", price: "$29.99", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Organic Massage Oil", price: "$24.99", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Meditation Cushion", price: "$49.99", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Ayurvedic Spice Collection", price: "$34.99", image: "https://images.unsplash.com/photo-1596040033229-a0b8b5c8c7c7?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 md:py-32">
        <RevealOnScroll>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-800 mb-4">Ayurvedic Shop</h1>
          <p className="text-xl text-gray-700">Authentic products for your wellness journey</p>
        </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <RevealOnScroll key={product.id} delay={index * 80}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-orange-700 mb-4">{product.price}</p>
                <button className="w-full bg-orange-700 hover:bg-orange-800 text-white py-2 rounded-lg font-semibold transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 p-8 bg-orange-100 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-orange-800 mb-4">Shop Coming Soon!</h3>
          <p className="text-gray-700">We're preparing an amazing collection of authentic Ayurvedic products for you.</p>
        </div>
      </div>
    </div>
  );
}

