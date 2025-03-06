import { Metadata } from "next";

const title = "Encrypted Note";
const description = "Secure note storage";

export const siteMetadata: Metadata = {
  title: title,
  description: description,
  generator: title,
  applicationName: title,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Agnivo Neogi",
    "encrypted note",
    "secure note storage",
    "private notes",
    "secure notebook",
    "encrypted notepad",
    "safe note keeping",
    "password-protected notes",
    "secure text storage",
    "confidential notes",
    "end-to-end encryption",
    "encrypted document",
    "privacy-focused notes",
    "secure writing pad",
    "locked notes",
    "note encryption",
  ],
  authors: [{ name: "Agnivo Neogi", url: "https://agnivon.com" }],
  creator: "Agnivo Neogi",
  publisher: "Agnivo Neogi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: title,
    description: description,
    url: process.env.VERCEL_PRODUCTION_URL,
    siteName: title,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    site: "@agnivon",
    creator: "@agnivon",
  },
};
