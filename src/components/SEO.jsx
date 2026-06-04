import { Helmet } from "react-helmet-async";

const DEFAULT_TITLE_SUFFIX = "| Raya LongLife";
const DEFAULT_DESCRIPTION =
  "Discover authentic Ayurveda and wellness retreats in Sri Lanka, India, and Thailand. Find your perfect healing journey with Raya LongLife.";
const DEFAULT_IMAGE = "https://www.rayalonglife.com/og-image.jpg";
const BASE_URL = "https://www.rayalonglife.com";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}) {
  const fullTitle = title ? `${title} ${DEFAULT_TITLE_SUFFIX}` : `Raya LongLife - Ayurvedic Healing Retreats`;
  const canonicalUrl = url ? `${BASE_URL}${url}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content={type} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
