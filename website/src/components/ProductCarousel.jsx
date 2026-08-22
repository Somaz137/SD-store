import { useEffect, useState } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { useCart } from "../cart/CartContext";

const AUTO_ADVANCE_MS = 10000;

export default function ProductCarousel({ id, kicker, title, intro, products }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  const count = products.length;

  useEffect(() => {
    if (paused || count <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  const goTo = (next) => {
    setIndex(((next % count) + count) % count);
  };

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
  };

  return (
    <section id={id} className="section carousel-section">
      <div className="section-head">
        <div className="section-heading">
          <span className="kicker">{kicker}</span>
          <h2>{title}</h2>
        </div>
        {intro && <p className="section-intro">{intro}</p>}
      </div>

      <div
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <button
          type="button"
          className="carousel-arrow carousel-arrow-prev"
          aria-label="Previous product"
          onClick={() => goTo(index - 1)}
        >
          &#8249;
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {products.map((product) => (
              <div className="carousel-slide" key={product.id}>
                <article className="product-card carousel-card">
                  <div className="product-image">
                    <ResponsiveImage
                      prefix={product.image}
                      alt={product.name}
                      sizes="(min-width: 861px) 50vw, 100vw"
                    />
                    <span className="product-badge">{product.badge}</span>
                  </div>
                  <div className="product-body">
                    <h3>{product.name}</h3>
                    <p className="product-notes">{product.notes}</p>
                    <div className="product-price">
                      <span className="price">{product.price}</span>
                      <span className="size">{product.size}</span>
                    </div>
                    <button
                      type="button"
                      className="button button-outline"
                      onClick={() => handleAdd(product)}
                    >
                      {addedId === product.id ? "Added to Cart ✓" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow-next"
          aria-label="Next product"
          onClick={() => goTo(index + 1)}
        >
          <svg
            className="carousel-arrow-progress"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <circle
              key={index}
              className={`carousel-arrow-progress-ring${
                paused || count <= 1 ? " is-paused" : ""
              }`}
              cx="20"
              cy="20"
              r="18"
              style={{ "--carousel-interval": `${AUTO_ADVANCE_MS}ms` }}
            />
          </svg>
          <span className="carousel-arrow-glyph">&#8250;</span>
        </button>
      </div>

      <div className="carousel-dots">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`carousel-dot${i === index ? " is-active" : ""}`}
            aria-label={`Show ${p.name}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
