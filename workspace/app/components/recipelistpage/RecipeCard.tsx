import { RecipeDto } from "../api-types.ts";
import { H1 } from "../Heading.tsx";
import Link from "next/link";
import { RecipeCategories } from "@/app/components/RecipeCategories.tsx";

type RecipeCardProps = {
  recipe: RecipeDto;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div
      className={
        "h-full transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl"
      }
    >
      <div className={"flex flex-col justify-between"}>
        <div>
          <Link prefetch={false} href={`/recipes/${recipe.id}`}>
            <div className={"overflow-hidden"}>
              <img
                className="mb-2 h-48 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
                src={`/images/recipes/food_${recipe.id}.png`}
                alt="image1"
              />
            </div>
          </Link>
          <H1 className={"mb-4 mt-4 font-space font-bold"}>
            <Link
              prefetch={true}
              href={`/recipes/${recipe.id}`}
              className={"hover:text-orange_2 hover:underline"}
            >
              {recipe.title}
            </Link>
          </H1>
          <div className={"text mt-2 font-inter text-gray-500"}>
            {recipe.headline}
          </div>
        </div>
        <div className={"mt-4 space-y-2"}>
          <RecipeCategories recipe={recipe} />
        </div>
      </div>
    </div>
  );
}

export { RecipeCard };
