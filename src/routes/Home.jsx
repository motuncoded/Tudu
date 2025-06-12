import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HeroFeatures from "../components/HeroFeatures";
import HeroNumbers from "../components/HeroNumbers";

function Home() {
  return (
    <div>
      <main className="max-w-7xl mx-auto p-4">
        <Hero />
        <HeroFeatures />
        <HeroNumbers />
        <Footer />
      </main>
    </div>
  );
}

export default Home;
