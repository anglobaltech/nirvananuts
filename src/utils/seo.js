export function generateSEO({ title, description }) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://www.nirvananuts.in",
      siteName: "Nirvana Nuts",
      images: [
        {
          url: "https://www.nirvananuts.in/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.nirvananuts.in/og-image.jpg"],
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Nirvana Nuts",
        url: "https://www.nirvananuts.in",
        email: "info@nirvananuts.in",
      }),
    },
  };
}