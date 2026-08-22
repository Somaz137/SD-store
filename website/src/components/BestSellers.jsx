import ProductCarousel from "./ProductCarousel";
import { BESTSELLERS } from "../content";

export default function BestSellers() {
  return (
    <ProductCarousel
      id="featured"
      kicker="Best Sellers"
      title="The three we keep restocking"
      products={BESTSELLERS}
    />
  );
}
