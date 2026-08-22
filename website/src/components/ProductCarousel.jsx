import { useEffect, useState } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { useCart } from "../cart/CartContext";

const AUTO_ADVANCE_MS = 5000;

export default function ProductCarousel({ id, kicker, title, intro, products }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [addedIndex, setAddedIndex] = useState(-1);
  const { addToCart } = useCart();

  const count = products.length;
  const product = products[index];
  const justAdded = addedIndex === index;

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

  const handleAdd = () => {
    addToCart(product);
    setAddedIndex(index);
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
              onClick={handleAdd}
            >
              {justAdded ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>
        </article>

        <button
          type="button"
          className="carousel-arrow carousel-arrow-next"
          aria-label="Next product"
          onClick={() => goTo(index + 1)}
        >
          &#8250;
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
