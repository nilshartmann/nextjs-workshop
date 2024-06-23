import { Ingredient } from "../api-types.ts";
import { AddFeedbackForm } from "@/app/components/recipepage/FeedbackForm.tsx";

type IngredientListProps = {
  ingredients: Ingredient[];
  servings?: number;
  recipeId?: string;
};
export default function IngredientList({
  ingredients,
  servings = 4,
  recipeId,
}: IngredientListProps) {
  return (
    <>
      {ingredients.map((i) => {
        return (
          <div
            className={
              "mb-4 me-4 ms-4 border-b border-dotted border-gray-300 pb-4"
            }
            key={i.name}
          >
            <i className="fa-regular fa-circle-check me-2 text-orange_2"></i>
            <span className={"font-inter text-gray-500"}>
              {(i.amount / 4) * servings} {i.unit} {i.name}
            </span>
          </div>
        );
      })}
      {/*{!!recipeId && <AddFeedbackForm recipeId={recipeId} />}*/}
    </>
  );
}
