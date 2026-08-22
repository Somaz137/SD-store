import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import NewArrivals from "./components/NewArrivals";
import BestSellers from "./components/BestSellers";
import WhyUs from "./components/WhyUs";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import { useRoute } from "./router";

function App() {
  const path = useRoute();

  return (
    <>
      <Header />
      {path === "/cart" ? (
        <CartPage />
      ) : (
        <main>
          <Hero />
          <Marquee />
          <NewArrivals />
          <BestSellers />
          <WhyUs />
          <Faq />
        </main>
      )}
      <Footer />
    </>
  );
}

export default App;
