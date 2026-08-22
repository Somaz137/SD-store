import ResponsiveImage from "./ResponsiveImage";
import { WHATSAPP_URL } from "../content";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <ResponsiveImage
        prefix="hero"
        alt="SD Store fragrances"
        className="hero-image"
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-scrim" />
      <div className="hero-content">
        <span className="kicker">Handpicked · Small batch</span>
        <h1 className="hero-title">
          A scent that stays
          <br />
          <em>long after you leave</em>
        </h1>
        <p className="hero-copy">
          Affordable luxury fragrance, curated bottle by bottle. Delivered
          nationwide, cash on delivery.
        </p>
        <div className="hero-actions">
          <a href={WHATSAPP_URL} className="button button-primary">
            Order on WhatsApp
          </a>
          <a href="#featured" className="button button-ghost">
            Browse best sellers
          </a>
        </div>
      </div>
    </section>
  );
}
