import CategoryPage from "@/components/CategoryPage";
import shoesImg from "@/assets/category-shoes.jpg";

const ShoesMen = () => (
  <CategoryPage
    category="Shoes"
    gender="Men"
    heading="Men's Shoes"
    description="From boardroom to weekend — footwear that works"
    heroImage={shoesImg}
  />
);

export default ShoesMen;
