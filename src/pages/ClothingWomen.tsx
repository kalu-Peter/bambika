import CategoryPage from "@/components/CategoryPage";
import clothingImg from "@/assets/category-clothing.jpg";

const ClothingWomen = () => (
  <CategoryPage
    category="Clothing"
    gender="Women"
    heading="Women's Clothing"
    description="Timeless pieces crafted for everyday elegance"
    heroImage={clothingImg}
  />
);

export default ClothingWomen;
