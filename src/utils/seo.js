export function generateSEO({ title, description }) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://yourdomain.com/profile",
      siteName: "MyApp",
      images: [
        {
          url: "https://yourdomain.com/og-image.jpg",
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
      images: ["https://yourdomain.com/og-image.jpg"],
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Shivani",
        email: "shivani@email.com",
      }),
    },
  };
}