import { Link } from "react-router-dom";
import clothingImg from "@/assets/category-clothing.jpg";
import shoesImg from "@/assets/category-shoes.jpg";
import bagsImg from "@/assets/category-bags.jpg";

const categories = [
  { name: "Clothing", href: "/clothing", image: clothingImg, count: "6 items" },
  { name: "Shoes",    href: "/shoes",    image: shoesImg,    count: "6 items" },
  { name: "Bags",     href: "/bags",     image: bagsImg,     count: "6 items" },
];

const Categories = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-amber-600 font-body font-medium mb-2">
          Collections
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-900 mb-3">
          Shop by Category
        </h2>
        <p className="text-stone-500 font-body">
          Find your style across our curated collections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.href}
            className="group relative overflow-hidden aspect-[3/4] block"
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              width={800}
              height={1024}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/50 transition-colors duration-500" />
            {/* amber left-border accent on hover */}
            <div className="absolute inset-y-0 left-0 w-1 bg-amber-500 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
            <div className="absolute bottom-8 left-8">
              <h3 className="font-heading text-2xl font-semibold text-stone-50 mb-1">
                {cat.name}
              </h3>
              <p className="text-sm text-amber-400 font-body font-medium">{cat.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
