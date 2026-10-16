import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import HowWorks from "../../components/home/HowWorks";
import Footer from "../../components/home/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero />

      <Features />

      <HowWorks />

      <Footer />
    </main>
  );
};

export default Home;