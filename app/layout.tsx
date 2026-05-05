import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Tequila Lounge | Latin Food and Cocktails in Vancouver",
    template: "%s | Tequila Lounge"
  },
  description:
    "Tequila Lounge is a Latin restaurant and bar in Vancouver serving weekend lunch, dinner, cocktails, tequila, and private events.",
  openGraph: {
    title: "Tequila Lounge",
    description: "Latin food and cocktails in Vancouver.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,800&family=Geist:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        <main className="page-transition">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
