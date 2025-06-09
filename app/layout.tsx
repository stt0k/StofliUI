// layout.tsx (o layout.js)
import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Cargar las fuentes de forma global
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", 
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Agregar soporte para PWA
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "StofliUI",
  description: "Librería de componentes UI accesibles y personalizables para React",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
      { rel: "icon", url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "StofliUI",
    description: "Librería de componentes UI accesibles y personalizables para React",
    url: "https://stofli-ui.vercel.app/",
    siteName: "StofliUI",
    images: [
      {
        url: "https://stofli-ui.vercel.app/home.png",
        width: 1200,
        height: 630,
        alt: "StofliUI - Librería de componentes UI para React",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StofliUI",
    description: "Librería de componentes UI accesibles y personalizables para React",
    images: ["https://stofli-ui.vercel.app/home.png"],
    creator: "@stofliui",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "StofliUI",
  },
  applicationName: "StofliUI",
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
