import { useState } from "react";
import logo from "../assets/generated/sd-logo-400.png";
import { NAV_LINKS, WHATSAPP_URL } from "../content";
import { useCart } from "../cart/CartContext";
import { linkHandler } from "../router";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();

  const handleLogoClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    linkHandler("/")(e);
  };

  return (
    <header className="header">
      <div className="header-bar">
        <a
          href="/"
          className="header-brand"
          aria-label="SD Store, back to top"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="SD Store" className="header-logo" />
        </a>

        <span className="header-wordmark">SD Store</span>

        <nav className="header-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href={WHATSAPP_URL} className="pill-button header-cta">
            <span className="pill-dot" />
            Order on WhatsApp
          </a>

          <a
            href="/cart"
            className="header-cart"
            aria-label={`Cart, ${totalCount} item${totalCount === 1 ? "" : "s"}`}
            onClick={linkHandler("/cart")}
          >
            Cart
            {totalCount > 0 && (
              <span className="header-cart-badge">{totalCount}</span>
            )}
          </a>

          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile"
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          href="/cart"
          className="mobile-nav-cart"
          onClick={(e) => {
            setOpen(false);
            linkHandler("/cart")(e);
          }}
        >
          Cart{totalCount > 0 ? ` (${totalCount})` : ""}
        </a>
        <a
          href={WHATSAPP_URL}
          className="pill-button mobile-nav-cta"
          onClick={() => setOpen(false)}
        >
          Order on WhatsApp
        </a>
      </nav>
    </header>
  );
}
