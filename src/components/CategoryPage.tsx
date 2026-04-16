import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/products";

interface CategoryPageProps {
  category: Product["category"];
  gender?: Product["gender"];
  heading: string;
  description: string;
  heroImage: string;
}

const CategoryPage = ({ category, gender, heading, description, heroImage }: CategoryPageProps) => {
  const items = products.filter(
    (p) => p.category === category && (gender ? p.gender === gender : true)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="relative h-64 md:h-96 overflow-hidden mt-[73px]">
        <img
          src={heroImage}
          alt={heading}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-primary-foreground mb-3">
            {heading}
          </h1>
          <p className="text-primary-foreground/80 font-body text-sm md:text-base">
            {description}
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <p className="text-sm text-muted-foreground font-body mb-10">
          {items.length} items
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default CategoryPage;
