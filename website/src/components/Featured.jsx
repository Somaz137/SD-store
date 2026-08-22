import ResponsiveImage from "./ResponsiveImage";
import { PRODUCTS, WHATSAPP_URL } from "../content";

export default function Featured() {
  return (
    <section id="featured" className="section featured">
      <div className="section-head">
        <div className="section-heading">
          <span className="kicker">Featured</span>
          <h2>The three we keep restocking</h2>
        </div>
        <a href="#fragrances" className="view-all">
          View all
        </a>
      </div>
      <div className="product-grid">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="product-card">
            <div className="product-image">
              <ResponsiveImage
                prefix={p.image}
                alt={p.name}
                sizes="(min-width: 861px) 33vw, 100vw"
              />
              <span className="product-badge">{p.badge}</span>
            </div>
            <div className="product-body">
              <h3>{p.name}</h3>
              <p className="product-notes">{p.notes}</p>
              <div className="product-price">
                <span className="price">{p.price}</span>
                <span className="size">{p.size}</span>
              </div>
              <a href={WHATSAPP_URL} className="button button-outline">
                Order on WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
