import GenderLanding from "@/components/GenderLanding";
import clothingImg from "@/assets/category-clothing.jpg";
import product1 from "@/assets/product-1.jpg";
import product4 from "@/assets/product-4.jpg";

const Clothing = () => (
  <GenderLanding
    heading="Clothing"
    heroImage={clothingImg}
    cards={[
      { label: "Women", href: "/clothing/women", image: product1, description: "Timeless pieces crafted for everyday elegance" },
      { label: "Men",   href: "/clothing/men",   image: product4, description: "Sharp, refined essentials for the modern man" },
    ]}
  />
);

export default Clothing;
