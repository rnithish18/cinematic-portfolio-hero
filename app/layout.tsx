import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = "Nithish R — Full-Stack Developer & CSE Student";
const DESCRIPTION =
  "Portfolio of Nithish R, a Computer Science & Engineering student at V.S.B. Engineering College building full-stack platforms, an AI-powered farming assistant, and ML-backed tools in Python, JavaScript, and SQL.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Nithish R",
  },
  description: DESCRIPTION,
  keywords: [
    "Nithish R",
    "Nithish R portfolio",
    "Full Stack Developer",
    "Computer Science Engineering student",
    "Python developer",
    "React developer",
    "FastAPI developer",
    "AI Farming Assistant",
    "V.S.B. Engineering College",
  ],
  authors: [{ name: "Nithish R", url: SITE_URL }],
  creator: "Nithish R",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Nithish R — Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Nithish R",
      jobTitle: "Full-Stack Developer",
      description: DESCRIPTION,
      url: SITE_URL,
      sameAs: [
        "https://github.com/rnithish18",
        "https://www.linkedin.com/in/r-nithish-181206n",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "V.S.B. Engineering College",
      },
      knowsAbout: [
        "Python",
        "Java",
        "C++",
        "JavaScript",
        "SQL",
        "FastAPI",
        "React",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Nithish R — Portfolio",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "CreativeWork",
      name: "AI-Powered Personal Farming Assistant",
      description:
        "A voice-enabled, bilingual (English/Tamil) agricultural advisory platform for Indian farmers, built with FastAPI, MongoDB Atlas, and Groq-hosted LLaMA models.",
      creator: { "@id": `${SITE_URL}/#person` },
      url: "https://farming-assistant-fxvg.onrender.com/static/index.html",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
