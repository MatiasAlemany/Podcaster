import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/nav";

const poppins = Poppins({
  variable: "--font-poppins-sans",
  weight: ["600"],
  subsets: ["latin"],
  style: ["italic"]
});

const poppinsText = Poppins({
  variable: "--font-poppins-mono",
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"]
});

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Top #100 Itunes Podcast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppinsText.variable} font-mono antialiased`}
      >
        <Nav/>
        {children}
      </body>
    </html>
  );
}
