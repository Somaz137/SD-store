import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Fragrances from "./components/Fragrances";
import Featured from "./components/Featured";
import WhyUs from "./components/WhyUs";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Fragrances />
        <Featured />
        <WhyUs />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

export default App;
