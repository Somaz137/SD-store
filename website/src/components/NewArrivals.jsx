import ProductCarousel from "./ProductCarousel";
import { NEW_ARRIVALS } from "../content";

export default function NewArrivals() {
  return (
    <ProductCarousel
      id="new-arrivals"
      kicker="New Arrivals"
      title="Just landed"
      intro="Fresh in the store. Use the arrows to browse or let them rotate."
      products={NEW_ARRIVALS}
    />
  );
}
