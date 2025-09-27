import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import Hero from "./components/Hero";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Header />
      <Hero/>
    </div>
  );
}
