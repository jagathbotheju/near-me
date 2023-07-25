import { categoryListData } from "../lib/category-list";
import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl my-5">Select your Fav Category</h2>
      <div className="flex gap-2">
        {categoryListData.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
