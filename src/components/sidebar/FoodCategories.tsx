import { useRouter } from "next/navigation";
import { FoodCategory } from "../../common/types/FoodCategory";

type FoodCategoriesSidebarProps = {
  foodCategories: FoodCategory[];
};

export const FoodCategoriesSidebar = ({
  foodCategories,
}: FoodCategoriesSidebarProps) => {
  const router = useRouter();

  return (
    <div className="min-w-[215px] rounded-lg bg-gray-100 p-7 pb-5">
      <h2 className="mb-4 text-2xl font-bold">All Categories</h2>
      {foodCategories?.map((category) => (
        <div className="flex">
          <div
            className="mb-3 cursor-pointer text-lg font-semibold text-gray-800 hover:text-gray-900"
            key={category.id}
            onClick={() => {
              router.push(`/recipes/category/${category.key}`);
            }}
          >
            {category.name}
          </div>
          <span className="ml-1 font-semibold opacity-50">{`(${category.numberOfRecipes})`}</span>
        </div>
      ))}
    </div>
  );
};
