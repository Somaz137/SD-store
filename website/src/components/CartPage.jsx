import ResponsiveImage from "./ResponsiveImage";
import { useCart } from "../cart/CartContext";
import { priceToNumber } from "../cart/priceToNumber";
import { WHATSAPP_NUMBER } from "../content";
import { linkHandler } from "../router";

function formatPKR(amount) {
  return `PKR ${amount.toLocaleString("en-US")}`;
}

function buildWhatsAppUrl(items, totalPrice) {
  const lines = items.map(
    (item) => `- ${item.name} (${item.size}) x${item.qty} — ${item.price} each`
  );
  const message = [
    "Hi SD Store, I would like to order:",
    "",
    ...lines,
    "",
    `Total: ${formatPKR(totalPrice)}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function CartPage() {
  const { items, removeFromCart, setQty, totalCount, totalPrice } = useCart();

  return (
    <main>
      <section className="section cart-section">
        <div className="section-head">
          <div className="section-heading">
            <span className="kicker">Your Cart</span>
            <h2>{totalCount > 0 ? `${totalCount} item${totalCount > 1 ? "s" : ""}` : "Cart"}</h2>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <a
              href="/"
              className="button button-primary"
              onClick={linkHandler("/")}
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <ResponsiveImage
                      prefix={item.image}
                      alt={item.name}
                      sizes="120px"
                    />
                  </div>
                  <div className="cart-item-body">
                    <h3>{item.name}</h3>
                    <span className="size">{item.size}</span>
                    <div className="cart-item-price">{item.price}</div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="cart-qty">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => setQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => setQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    {formatPKR(priceToNumber(item.price) * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-value">{formatPKR(totalPrice)}</span>
              </div>
              <div className="cart-actions">
                <a
                  href="/"
                  className="button button-ghost"
                  onClick={linkHandler("/")}
                >
                  Continue Shopping
                </a>
                <a
                  href={buildWhatsAppUrl(items, totalPrice)}
                  className="button button-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
