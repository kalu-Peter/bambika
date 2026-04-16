import CategoryPage from "@/components/CategoryPage";
import shoesImg from "@/assets/category-shoes.jpg";

const ShoesWomen = () => (
  <CategoryPage
    category="Shoes"
    gender="Women"
    heading="Women's Shoes"
    description="Step into style with our curated women's footwear"
    heroImage={shoesImg}
  />
);

export default ShoesWomen;
