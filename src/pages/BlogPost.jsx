import { useParams, Link } from "react-router-dom";
import { getBlogBySlug, blogs } from "../data/blogData";
import Navbar from "../components/Navbar";

function renderSection(section, i) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="text-2xl sm:text-3xl text-[#181818] mt-10 mb-4"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="text-xl text-[#181818] mt-8 mb-3"
          style={{ fontFamily: "Sentient, serif", fontWeight: 600 }}
        >
          {section.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          key={i}
          className="text-[16px] text-[#333333] leading-relaxed mb-5"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {section.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="mb-6 space-y-2 pl-5">
          {section.items.map((item, j) => (
            <li
              key={j}
              className="text-[16px] text-[#333333] leading-relaxed list-disc"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FFFBF7]">
        <Navbar />
        <div className="pt-40 text-center">
          <p className="text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
            Article not found.
          </p>
          <Link to="/blogs" className="text-[#5E17EB] underline mt-4 inline-block">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      {/* Hero image */}
      <div className="pt-24">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[40vh] sm:h-[55vh] object-cover"
        />
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="text-[11px] text-[#5E17EB] uppercase tracking-[0.18em]"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            {post.category}
          </span>
          <span className="text-[#999] text-xs" style={{ fontFamily: "Lato, sans-serif" }}>
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl text-[#181818] leading-tight mb-10"
          style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
        >
          {post.title}
        </h1>

        {/* Body */}
        <div>{post.sections.map((s, i) => renderSection(s, i))}</div>

        {/* Back link */}
        <div className="mt-14 pt-8 border-t border-[#E0E0E0]">
          <Link
            to="/blogs"
            className="text-[#5E17EB] uppercase text-sm tracking-[0.14em] hover:underline"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            ← Back to all articles
          </Link>
        </div>
      </article>

      {/* More articles */}
      {otherPosts.length > 0 && (
        <section className="bg-[#F4F4F4] py-16 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl text-[#181818] mb-10"
              style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
            >
              More articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {otherPosts.map((p) => (
                <Link key={p.slug} to={`/blogs/${p.slug}`} className="group flex flex-col">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full aspect-[4/3] object-cover rounded mb-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className="text-[10px] text-[#5E17EB] uppercase tracking-[0.16em] mb-1"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {p.category}
                  </span>
                  <h3
                    className="text-[17px] text-[#181818] leading-snug group-hover:text-[#5E17EB] transition-colors"
                    style={{ fontFamily: "Sentient, serif", fontStyle: "italic" }}
                  >
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
