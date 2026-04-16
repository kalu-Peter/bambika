import { useState } from "react";
import { ShoppingBag, Heart, ChevronDown, Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const selected = product.sizes[selectedIndex];

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    const priceNum = parseFloat(selected.price.replace(/[^0-9.]/g, ""));
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      size: selected.label,
      price: selected.price,
      priceNum,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border border-border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground p-2 rounded-full opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:text-red-500"
        >
          <Heart size={15} />
        </button>

        {/* Add to bag — slides up on hover */}
        <button
          aria-label="Add to bag"
          onClick={handleAddToBag}
          className={`absolute bottom-0 left-0 right-0 text-xs font-semibold tracking-widest uppercase py-3 translate-y-full group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 ${
            added
              ? "bg-green-600 text-white"
              : "bg-stone-900/90 text-stone-50 hover:bg-amber-500 hover:text-stone-900"
          }`}
        >
          {added ? (
            <>
              <Check size={14} />
              Added
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              Add to Bag
            </>
          )}
        </button>
      </div>

      {/* Info */}
      <CardContent className="px-4 pt-3 pb-0 flex-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-foreground font-body leading-snug">
          {product.name}
        </h3>
      </CardContent>

      <CardFooter className="px-4 pt-3 pb-4 flex flex-col gap-3 items-stretch">
        {/* Price — updates with size selection */}
        <span className="text-base font-semibold text-foreground font-body">
          {selected.price}
        </span>

        {/* Size dropdown */}
        <div className="relative">
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full appearance-none bg-secondary border border-border text-foreground text-xs font-body rounded-md px-3 py-2 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-foreground transition-colors hover:border-foreground"
          >
            {product.sizes.map((size, i) => (
              <option key={size.label} value={i}>
                {size.label} — {size.price}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
