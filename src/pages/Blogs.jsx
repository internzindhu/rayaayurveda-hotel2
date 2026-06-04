import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import { blogs } from "../data/blogData";

/* ─── data ─────────────────────────────────────────────────── */

const heroPost = blogs[0];

const featuredPosts = blogs.map((b) => ({ title: b.title, image: b.image, slug: b.slug }));

const gridPosts = blogs;

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
        <Link to={`/blogs/${post.slug}`} className="mb-4 block overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <h3
          className="text-xl sm:text-2xl text-[#181818] mb-3"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm text-[#181818] mb-4 leading-relaxed flex-1"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {post.excerpt}
        </p>
        <Link
          to={`/blogs/${post.slug}`}
          className="text-[#5E17EB] hover:underline inline-block uppercase text-left"
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            letterSpacing: "0.1em",
          }}
        >
          VIEW POST →
        </Link>
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
      <SEO
        title="Ayurveda & Wellness Blog"
        description="Explore articles about Ayurveda, healing traditions, wellness retreats, and mindful travel across Sri Lanka, India, and Thailand on the Raya LongLife blog."
        url="/blogs"
      />
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
            <Link
              to={`/blogs/${heroPost.slug}`}
              className="text-[11px] text-[#5E17EB] tracking-[0.16em] uppercase hover:underline"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Read article →
            </Link>
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
            <div className="flex w-full lg:w-2/3 items-center gap-4 lg:gap-8">
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
              <Link key={i} to={`/blogs/${fp.slug}`} className="text-left group">
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
              </Link>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {gridPosts.map((post, i) => (
              <BlogCard key={post.title} post={post} index={i % 4} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
