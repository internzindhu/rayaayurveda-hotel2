import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

/* ─── data ─────────────────────────────────────────────────── */

const heroPost = {
  title: "A Day in an Ayurvedic Resort: What to Expect on Your Journey",
  image:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80",
};

const featuredPosts = [
  {
    title: "The Ancient Wisdom of Ayurveda Help for the Modern World",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Top 7 Ayurvedic Treatments That Transform Your Health",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Ayurveda & Stress: Natural Ways to Find Inner Calm",
    image:
      "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Power of Ayurvedic Diet: Eating for Balance and Energy",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80",
  },
];

const gridPosts = [
  {
    title: "Shirodhara: Oil for the Mind & Soul",
    excerpt:
      "In today's fast-paced world, stress has become an unwelcome constant. Shirodhara, an ancient Ayurvedic technique, offers a profound path to deep relaxation.",
    category: "Treatments",
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
    author: { name: "Anjali Pereira", avatar: "https://i.pravatar.cc/40?img=47", readTime: "3 min read" },
  },
  {
    title: "Why Visit an Ayurvedic Retreat in Sri Lanka?",
    excerpt:
      "In today's fast-paced world, stress has become an unwelcome constant. Discover why Sri Lanka is the ideal destination for healing and total relaxation.",
    category: "Retreats",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    author: { name: "Maya Sumayadis", avatar: "https://i.pravatar.cc/40?img=32", readTime: "11 min read" },
  },
  {
    title: "Meet Our Ayurveda Experts",
    excerpt:
      "Get to know our practitioners and wellness educators who bring generations of knowledge and compassionate care to every guest.",
    category: "Our Team",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    author: { name: "Anju Mishra", avatar: "https://i.pravatar.cc/40?img=28", readTime: "5 min read" },
  },
  {
    title: "The 3 Doshas Explained: Vata, Pitta, Kapha",
    excerpt:
      "Understand your body's subtle energy constitution and see how small shifts in routine and nourishment can create lasting change.",
    category: "Ayurveda Basics",
    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=600&q=80",
    author: { name: "Dr. Samara Jayawardena", avatar: "https://i.pravatar.cc/40?img=45", readTime: "8 min read" },
  },
  {
    title: "Herbal Remedies for Everyday Wellness",
    excerpt:
      "A recipe for clarity, presence, and the art of living well. Herbs like ashwagandha and triphala can transform your daily routine.",
    category: "Herbs & Remedies",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80",
    author: { name: "Nadia Abeyratne", avatar: "https://i.pravatar.cc/40?img=55", readTime: "10 min read" },
  },
  {
    title: "The Science of Ayurvedic Massage",
    excerpt:
      "Experience how a well-crafted Ayurvedic massage can release tension, balance the nervous system, and heal the body from within.",
    category: "Treatments",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80",
    author: { name: "Zayan Mishra", avatar: "https://i.pravatar.cc/40?img=12", readTime: "5 min read" },
  },
  {
    title: "Stress & Burnout Recovery",
    excerpt:
      "A topic often discussed but rarely addressed with depth. Ayurveda offers a complete framework for sustainable recovery from modern burnout.",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    author: { name: "Anju Mishra", avatar: "https://i.pravatar.cc/40?img=28", readTime: "6 min read" },
  },
  {
    title: "Digestive & Gut Health Programme",
    excerpt:
      "At Raya, we believe digestion is the cornerstone of all health. Discover our signature programme to restore your digestive fire.",
    category: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    author: { name: "Royan Mishra", avatar: "https://i.pravatar.cc/40?img=8", readTime: "5 min read" },
  },
];

/* ─── sub-components ────────────────────────────────────────── */

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const staggerOffsets = ["", "lg:mt-[60px]", "lg:mt-[100px]", ""];

function BlogCard({ post, index }) {
  const [ref, visible] = useReveal();
  return (
    <div className={`flex flex-col ${staggerOffsets[index % 4]}`}>
      <article
        ref={ref}
        className={`flex flex-col flex-1 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: `${(index % 4) * 70}ms` }}
      >
        <div className="mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[4/3] object-cover rounded-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h3
          className="text-xl sm:text-2xl text-[#181818] mb-3"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm text-[#181818] mb-4 leading-relaxed flex-1"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {post.excerpt}
        </p>
        <button
          type="button"
          className="text-[#5E17EB] hover:underline inline-block uppercase text-left"
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            letterSpacing: "0.1em",
          }}
        >
          VIEW POST →
        </button>
      </article>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────── */

export default function Blogs() {
  const [featRef, featVisible] = useReveal(0.08);
  const [headRef, headVisible] = useReveal(0.1);

  const heroImageRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const [heroImageVisible, setHeroImageVisible] = useState(false);
  const [heroOverlayVisible, setHeroOverlayVisible] = useState(false);

  useEffect(() => {
    const imageObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeroImageVisible(true); },
      { threshold: 0.1 }
    );
    const overlayObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeroOverlayVisible(true); },
      { threshold: 0.1 }
    );
    if (heroImageRef.current) imageObs.observe(heroImageRef.current);
    if (heroOverlayRef.current) overlayObs.observe(heroOverlayRef.current);
    return () => { imageObs.disconnect(); overlayObs.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-36 pb-0 px-4 mb-16 sm:px-6 lg:px-0">
        <div className="relative px-0">
          <img
            ref={heroImageRef}
            src={heroPost.image}
            alt="Hero"
            className={`w-full lg:w-[892px] h-auto lg:h-[458px] lg:mx-auto object-cover rounded-lg lg:rounded-none transition-all duration-1000 ease-out ${heroImageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
          />
          {/* Overlay card */}
          <div
            ref={heroOverlayRef}
            className={`
              relative
              lg:absolute
              lg:bottom-24
              right-0
              lg:right-48
              bg-[#F4F4F4]
              lg:bg-opacity-95
              h-auto
              lg:h-[240px]
              p-4 sm:p-6 md:p-8 lg:p-10
              max-w-full
              lg:max-w-sm
              mt-8
              rounded-lg
              transition-all duration-1000 ease-out
              ${heroOverlayVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-12 translate-y-8"}
            `}
          >
            <p
              className="text-[#5E17EB] text-[11px] tracking-[0.18em] uppercase mb-3"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Featured article
            </p>
            <h2
              className="text-[#181818] mb-4 lg:mb-5 italic text-lg sm:text-xl lg:text-[20px]"
              style={{
                fontFamily: "Sentient, serif",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: "130%",
              }}
            >
              {heroPost.title}
            </h2>
            {/* <p
              className="text-[#181818] leading-relaxed text-sm sm:text-base lg:text-[16px] mb-5"
              style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.5" }}
            >
              A journey through ancient healing rituals, mindful nourishment, and the restorative power of Ayurveda in one of the world's most serene settings.
            </p> */}
            <button
              type="button"
              className="text-[11px] text-[#5E17EB] tracking-[0.16em] uppercase hover:underline"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              View retreat →
            </button>
          </div>
        </div>
      </section>

      {/* ── Featured posts ── */}
      <section className="bg-[#F4F4F4] py-16 px-4 sm:px-8">
        <div
          ref={featRef}
          className={`max-w-6xl mx-auto transition-all duration-800 ease-out ${featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <h2 className="text-[#5E17EB] mb-4 uppercase" style={{
            fontFamily: 'Lato, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0.1em',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>Insights &amp; Guidance</h2>
          {/* Top Section: Heading with vertical separator and description */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start p-4 sm:p-8 lg:p-12">
            <div className="flex w-full lg:w-2/3 gap-4 lg:gap-6 lg:pl-[10%] items-center justify-between">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181818] font-serif" style={{ fontFamily: 'Sentient Bold, serif' }}>Featured Posts</h3>
              <div className="hidden lg:block w-0 h-24 border-l-2 border-dotted border-[#181818] mr-0 self-center"></div>
            </div>
            <div className="flex w-full lg:w-2/3 items-center gap-4 lg:gap-6 lg:gap-8">
              <p className="text-[16px] sm:text-lg text-[#181818] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>Short reads designed to guide, inspire, and deepen your understanding of Ayurveda healing, and mindful living  before, during, and beyond your retreat.</p>
            </div>
          </div>

          {/* <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <h2
              className="text-4xl sm:text-5xl text-[#181818] leading-tight lg:max-w-xs"
              style={{ fontFamily: "Sentient, serif" }}
            >
              Featured posts
            </h2>
            <p
              className="text-sm text-[#555555] leading-relaxed max-w-md"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Share every inspired guide, insight, and story to grow your understanding of
              Ayurveda healing and mindful living: nutrition, doshas, and beyond your retreat.
            </p>
          </div> */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredPosts.map((fp, i) => (
              <button key={i} type="button" className="text-left group">
                <div className="overflow-hidden rounded-sm mb-3">
                  <img
                    src={fp.image}
                    alt={fp.title}
                    className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>
                <p
                  className="text-xs text-[#181818] leading-snug group-hover:text-[#5E17EB] transition-colors"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {fp.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial heading ── */}
      <section className="bg-[#FFFBF7] py-16 px-4 sm:px-8">
        <div
          ref={headRef}
          className={`max-w-6xl mx-auto text-center transition-all duration-800 ease-out ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl text-[#181818] uppercase leading-none"
            style={{ fontFamily: "Sentient, serif" }}
          >
            Insights from
          </h2>
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl text-[#5E17EB] leading-none"
            style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
          >
            Ayurvedic Practice
          </h2>
        </div>
      </section>

      {/* ── Blog grid ── */}
      <section className="bg-[#FFFBF7] pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-24">
            {/* Vertical separator */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-10 w-px bg-gray-900 transform -translate-x-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {gridPosts.map((post, i) => (
                <BlogCard key={post.title} post={post} index={i} />
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-24 sm:mt-32">
              <button
                type="button"
                className="text-[#5E17EB] text-lg hover:underline inline-block"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                DISCOVER ALL POSTS →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
