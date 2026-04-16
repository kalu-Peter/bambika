import CategoryPage from "@/components/CategoryPage";
import clothingImg from "@/assets/category-clothing.jpg";

const ClothingMen = () => (
  <CategoryPage
    category="Clothing"
    gender="Men"
    heading="Men's Clothing"
    description="Sharp, refined essentials for the modern man"
    heroImage={clothingImg}
  />
);

export default ClothingMen;
