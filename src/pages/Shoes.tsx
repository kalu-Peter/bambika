import GenderLanding from "@/components/GenderLanding";
import shoesImg from "@/assets/category-shoes.jpg";
import product3 from "@/assets/product-3.jpg";

const Shoes = () => (
  <GenderLanding
    heading="Shoes"
    heroImage={shoesImg}
    cards={[
      { label: "Women", href: "/shoes/women", image: product3, description: "Step into style with our curated women's footwear" },
      { label: "Men",   href: "/shoes/men",   image: product3, description: "From boardroom to weekend — footwear that works" },
    ]}
  />
);

export default Shoes;
