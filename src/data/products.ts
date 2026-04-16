import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export interface SizeOption {
  label: string;
  price: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  category: "Clothing" | "Shoes" | "Bags";
  gender?: "Men" | "Women";
  image: string;
  sizes: SizeOption[];
}

export const products: Product[] = [
  // ── Clothing / Women ──────────────────────────────────────────────
  {
    id: 1, name: "Classic Trench Coat", price: "$289", category: "Clothing", gender: "Women", image: product1,
    sizes: [{ label: "XS", price: "$289" }, { label: "S", price: "$289" }, { label: "M", price: "$299" }, { label: "L", price: "$299" }, { label: "XL", price: "$309" }],
  },
  {
    id: 2, name: "Olive Linen Blazer", price: "$245", category: "Clothing", gender: "Women", image: product4,
    sizes: [{ label: "XS", price: "$245" }, { label: "S", price: "$245" }, { label: "M", price: "$255" }, { label: "L", price: "$255" }, { label: "XL", price: "$265" }],
  },
  {
    id: 3, name: "Tailored Wide-Leg Trousers", price: "$175", category: "Clothing", gender: "Women", image: product1,
    sizes: [{ label: "XS", price: "$175" }, { label: "S", price: "$175" }, { label: "M", price: "$185" }, { label: "L", price: "$185" }, { label: "XL", price: "$195" }],
  },
  {
    id: 4, name: "Relaxed Cotton Shirt", price: "$95", category: "Clothing", gender: "Women", image: product4,
    sizes: [{ label: "XS", price: "$95" }, { label: "S", price: "$95" }, { label: "M", price: "$100" }, { label: "L", price: "$100" }, { label: "XL", price: "$105" }],
  },
  {
    id: 5, name: "Merino Wool Sweater", price: "$165", category: "Clothing", gender: "Women", image: product1,
    sizes: [{ label: "XS", price: "$165" }, { label: "S", price: "$165" }, { label: "M", price: "$175" }, { label: "L", price: "$175" }, { label: "XL", price: "$185" }],
  },
  {
    id: 6, name: "Silk Slip Dress", price: "$215", category: "Clothing", gender: "Women", image: product4,
    sizes: [{ label: "XS", price: "$215" }, { label: "S", price: "$215" }, { label: "M", price: "$225" }, { label: "L", price: "$225" }, { label: "XL", price: "$235" }],
  },

  // ── Clothing / Men ────────────────────────────────────────────────
  {
    id: 19, name: "Slim Fit Chinos", price: "$115", category: "Clothing", gender: "Men", image: product4,
    sizes: [{ label: "28", price: "$115" }, { label: "30", price: "$115" }, { label: "32", price: "$120" }, { label: "34", price: "$120" }, { label: "36", price: "$125" }],
  },
  {
    id: 20, name: "Oxford Button-Down Shirt", price: "$95", category: "Clothing", gender: "Men", image: product1,
    sizes: [{ label: "XS", price: "$95" }, { label: "S", price: "$95" }, { label: "M", price: "$100" }, { label: "L", price: "$100" }, { label: "XL", price: "$105" }],
  },
  {
    id: 21, name: "Wool Overcoat", price: "$375", category: "Clothing", gender: "Men", image: product4,
    sizes: [{ label: "S", price: "$375" }, { label: "M", price: "$385" }, { label: "L", price: "$385" }, { label: "XL", price: "$395" }, { label: "XXL", price: "$405" }],
  },
  {
    id: 22, name: "Linen Blazer", price: "$255", category: "Clothing", gender: "Men", image: product1,
    sizes: [{ label: "S", price: "$255" }, { label: "M", price: "$265" }, { label: "L", price: "$265" }, { label: "XL", price: "$275" }, { label: "XXL", price: "$285" }],
  },
  {
    id: 23, name: "Merino Crewneck", price: "$145", category: "Clothing", gender: "Men", image: product4,
    sizes: [{ label: "S", price: "$145" }, { label: "M", price: "$155" }, { label: "L", price: "$155" }, { label: "XL", price: "$165" }, { label: "XXL", price: "$175" }],
  },
  {
    id: 24, name: "Tapered Cargo Trousers", price: "$135", category: "Clothing", gender: "Men", image: product1,
    sizes: [{ label: "28", price: "$135" }, { label: "30", price: "$135" }, { label: "32", price: "$140" }, { label: "34", price: "$140" }, { label: "36", price: "$145" }],
  },

  // ── Shoes / Women ─────────────────────────────────────────────────
  {
    id: 7, name: "White Penny Loafers", price: "$195", category: "Shoes", gender: "Women", image: product3,
    sizes: [{ label: "US 5", price: "$195" }, { label: "US 6", price: "$195" }, { label: "US 7", price: "$195" }, { label: "US 8", price: "$205" }, { label: "US 9", price: "$205" }],
  },
  {
    id: 8, name: "Suede Chelsea Boots", price: "$265", category: "Shoes", gender: "Women", image: product3,
    sizes: [{ label: "US 5", price: "$265" }, { label: "US 6", price: "$265" }, { label: "US 7", price: "$265" }, { label: "US 8", price: "$275" }, { label: "US 9", price: "$275" }],
  },
  {
    id: 9, name: "Leather Mules", price: "$185", category: "Shoes", gender: "Women", image: product3,
    sizes: [{ label: "US 5", price: "$185" }, { label: "US 6", price: "$185" }, { label: "US 7", price: "$185" }, { label: "US 8", price: "$195" }, { label: "US 9", price: "$195" }],
  },
  {
    id: 10, name: "Block Heel Sandals", price: "$155", category: "Shoes", gender: "Women", image: product3,
    sizes: [{ label: "US 5", price: "$155" }, { label: "US 6", price: "$155" }, { label: "US 7", price: "$155" }, { label: "US 8", price: "$165" }, { label: "US 9", price: "$165" }],
  },
  {
    id: 11, name: "Pointed-Toe Flats", price: "$145", category: "Shoes", gender: "Women", image: product3,
    sizes: [{ label: "US 5", price: "$145" }, { label: "US 6", price: "$145" }, { label: "US 7", price: "$145" }, { label: "US 8", price: "$155" }, { label: "US 9", price: "$155" }],
  },
  {
    id: 12, name: "Strappy Heeled Sandals", price: "$175", category: "Shoes", gender: "Women", image: product3,
    sizes: [{ label: "US 5", price: "$175" }, { label: "US 6", price: "$175" }, { label: "US 7", price: "$175" }, { label: "US 8", price: "$185" }, { label: "US 9", price: "$185" }],
  },

  // ── Shoes / Men ───────────────────────────────────────────────────
  {
    id: 25, name: "Derby Leather Shoes", price: "$225", category: "Shoes", gender: "Men", image: product3,
    sizes: [{ label: "US 7", price: "$225" }, { label: "US 8", price: "$225" }, { label: "US 9", price: "$235" }, { label: "US 10", price: "$235" }, { label: "US 11", price: "$245" }, { label: "US 12", price: "$245" }],
  },
  {
    id: 26, name: "Suede Desert Boots", price: "$195", category: "Shoes", gender: "Men", image: product3,
    sizes: [{ label: "US 7", price: "$195" }, { label: "US 8", price: "$195" }, { label: "US 9", price: "$205" }, { label: "US 10", price: "$205" }, { label: "US 11", price: "$215" }, { label: "US 12", price: "$215" }],
  },
  {
    id: 27, name: "Canvas Low-Tops", price: "$115", category: "Shoes", gender: "Men", image: product3,
    sizes: [{ label: "US 7", price: "$115" }, { label: "US 8", price: "$115" }, { label: "US 9", price: "$125" }, { label: "US 10", price: "$125" }, { label: "US 11", price: "$135" }, { label: "US 12", price: "$135" }],
  },
  {
    id: 28, name: "Leather Loafers", price: "$185", category: "Shoes", gender: "Men", image: product3,
    sizes: [{ label: "US 7", price: "$185" }, { label: "US 8", price: "$185" }, { label: "US 9", price: "$195" }, { label: "US 10", price: "$195" }, { label: "US 11", price: "$205" }, { label: "US 12", price: "$205" }],
  },
  {
    id: 29, name: "Chelsea Boots", price: "$255", category: "Shoes", gender: "Men", image: product3,
    sizes: [{ label: "US 7", price: "$255" }, { label: "US 8", price: "$255" }, { label: "US 9", price: "$265" }, { label: "US 10", price: "$265" }, { label: "US 11", price: "$275" }, { label: "US 12", price: "$275" }],
  },
  {
    id: 30, name: "Slip-On Sneakers", price: "$135", category: "Shoes", gender: "Men", image: product3,
    sizes: [{ label: "US 7", price: "$135" }, { label: "US 8", price: "$135" }, { label: "US 9", price: "$145" }, { label: "US 10", price: "$145" }, { label: "US 11", price: "$155" }, { label: "US 12", price: "$155" }],
  },

  // ── Bags (no gender split) ────────────────────────────────────────
  {
    id: 13, name: "Leather Crossbody", price: "$175", category: "Bags", image: product2,
    sizes: [{ label: "Mini", price: "$155" }, { label: "Small", price: "$175" }, { label: "Medium", price: "$205" }],
  },
  {
    id: 14, name: "Structured Tote", price: "$225", category: "Bags", image: product2,
    sizes: [{ label: "Small", price: "$205" }, { label: "Medium", price: "$225" }, { label: "Large", price: "$255" }],
  },
  {
    id: 15, name: "Mini Shoulder Bag", price: "$145", category: "Bags", image: product2,
    sizes: [{ label: "Mini", price: "$145" }, { label: "Small", price: "$165" }],
  },
  {
    id: 16, name: "Raffia Basket Bag", price: "$115", category: "Bags", image: product2,
    sizes: [{ label: "Small", price: "$115" }, { label: "Medium", price: "$135" }, { label: "Large", price: "$155" }],
  },
  {
    id: 17, name: "Suede Clutch", price: "$135", category: "Bags", image: product2,
    sizes: [{ label: "Mini", price: "$120" }, { label: "Standard", price: "$135" }],
  },
  {
    id: 18, name: "Canvas Weekend Tote", price: "$95", category: "Bags", image: product2,
    sizes: [{ label: "Medium", price: "$95" }, { label: "Large", price: "$115" }],
  },
];
