import { useState } from "react";
import { FAQS } from "../content";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section faq">
      <div className="faq-head">
        <span className="kicker">FAQ</span>
        <h2>Before you order</h2>
        <p>
          Anything else, message us on WhatsApp and we usually reply within
          the hour.
        </p>
      </div>
      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className="faq-item" key={item.q}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-sign">{isOpen ? "–" : "+"}</span>
              </button>
              <div
                className="faq-answer"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="faq-answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
