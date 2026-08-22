import { useState } from "react";
import logo from "../assets/generated/sd-logo-400.png";
import { NAV_LINKS, WHATSAPP_URL } from "../content";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-bar">
        <a href="#top" className="header-brand" aria-label="SD Store, back to top">
          <img src={logo} alt="SD Store" className="header-logo" />
          <span className="header-wordmark">SD</span>
        </a>

        <nav className="header-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href={WHATSAPP_URL} className="pill-button header-cta">
          <span className="pill-dot" />
          Order on WhatsApp
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
