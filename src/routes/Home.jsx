import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HeroFeatures from "../components/HeroFeatures";

function Home() {
  return (
    <div>
      <main className="max-w-7xl mx-auto p-4">
        <Hero />
        <HeroFeatures />
      </main>
    </div>
  );
}

export default Home;
