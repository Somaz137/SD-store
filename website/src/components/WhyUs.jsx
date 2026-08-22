import ResponsiveImage from "./ResponsiveImage";
import { WHY_STATS } from "../content";

export default function WhyUs() {
  return (
    <section id="gifting" className="why">
      <div className="why-text">
        <span className="kicker">Why SD Store</span>
        <h2>Luxury you can actually wear every day</h2>
        <p>
          Every bottle is chosen by hand and tested for wear before it
          reaches the shelf. Small batches, honest prices, and packaging
          that is ready to be given as a gift.
        </p>
        <div className="why-stats">
          {WHY_STATS.map((s) => (
            <div key={s.label} className="why-stat">
              <span className="why-stat-value">{s.value}</span>
              <span className="why-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="why-image">
        <ResponsiveImage
          prefix="curved"
          alt="Aura of Dreams bottle"
          sizes="(min-width: 861px) 50vw, 100vw"
        />
        <div className="why-image-scrim" />
        <div className="why-image-overlay">
          <span className="kicker">Why SD Store</span>
          <h2>Luxury you can actually wear every day</h2>
          <p>Cash on delivery · Gift wrapped free · 2 to 4 day delivery</p>
        </div>
      </div>
    </section>
  );
}
