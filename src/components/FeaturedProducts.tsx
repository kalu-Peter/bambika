import ProductCard from "@/components/ProductCard";
import { products as allProducts } from "@/data/products";

const products = [allProducts[0], allProducts[6], allProducts[12], allProducts[1]];

const FeaturedProducts = () => {
  return (
    <section id="collection" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-14">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-amber-600 font-body font-medium mb-2">
            New Season
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-900 mb-3">
            Featured Picks
          </h2>
          <p className="text-stone-500 font-body">
            Handpicked essentials for the season
          </p>
        </div>
        <a
          href="#"
          className="hidden md:inline-block text-sm font-medium tracking-wide text-stone-900 border-b-2 border-amber-500 pb-0.5 hover:text-amber-600 hover:border-amber-600 transition-colors"
        >
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
