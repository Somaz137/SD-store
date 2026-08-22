import { MARQUEE_ITEMS } from "../content";

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
