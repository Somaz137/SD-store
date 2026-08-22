import { FRAGRANCE_TYPES } from "../content";

export default function Fragrances() {
  return (
    <section id="fragrances" className="section fragrances">
      <div className="section-head">
        <div className="section-heading">
          <span className="kicker">Fragrances</span>
          <h2>Four ways to wear a scent</h2>
        </div>
        <p className="section-intro">
          Not sure which suits you? Tell us where you will wear it and we
          will pick.
        </p>
      </div>
      <div className="fragrance-grid">
        {FRAGRANCE_TYPES.map((f) => (
          <div key={f.name} className="fragrance-card">
            <span className="fragrance-tag">{f.tag}</span>
            <h3>{f.name}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
