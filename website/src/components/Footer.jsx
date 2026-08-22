import logo from "../assets/generated/sd-logo-400.png";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "../content";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="SD Store" className="footer-logo" />
          <p>
            Handpicked fragrance, small batches, honest prices. Shipped
            across Pakistan.
          </p>
        </div>

        <div className="footer-col">
          <span className="kicker">Contact</span>
          <div className="footer-line">
            <span className="footer-label">Call</span>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </div>
          <div className="footer-line">
            <span className="footer-label">WhatsApp</span>
            <a href={WHATSAPP_URL}>{WHATSAPP_DISPLAY}</a>
          </div>
          <div className="footer-line">
            <span className="footer-label">Instagram</span>
            <a href={INSTAGRAM_URL}>{INSTAGRAM_HANDLE}</a>
          </div>
        </div>

        <div className="footer-col">
          <span className="kicker">Order now</span>
          <p>
            Message the bottle name and your address. We reply within the
            hour, 10am–10pm.
          </p>
          <a href={WHATSAPP_URL} className="button button-primary">
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SD Store</span>
        <span>Lahore, Pakistan</span>
      </div>
    </footer>
  );
}
