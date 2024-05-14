import { RecipeBanner } from "./RecipeBanner.tsx";
import { CookingTime } from "./CookingTime.tsx";
import { Instructions } from "./Instructions.tsx";
import IngredientsSection from "@/app/components/recipepage/IngredientsSection.tsx";
import { fetchRecipe } from "@/app/components/queries.ts";
import { Sidebar } from "@/app/components/Sidebar.tsx";
import { H2 } from "@/app/components/Heading.tsx";
import FeedbackListLoader from "@/app/components/recipepage/FeedbackListLoader.tsx";

type RecipePageContentProps = {
  // recipe: DetailedRecipeDto;
  recipeId: string;
};

export default async function RecipePageContent({
  recipeId,
}: RecipePageContentProps) {
  const result = await fetchRecipe(recipeId);
  if (!result) {
    return null;
  }

  const recipe = result.recipe;

  return (
    <div className={"mb-20"}>
      <RecipeBanner recipe={recipe} />
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <CookingTime
            cookTime={recipe.cookTime}
            preparationTime={recipe.preparationTime}
          />
          <IngredientsSection ingredients={recipe.ingredients} />
          <Instructions recipe={recipe} />
        </div>
        <div className={"md:w-1/3"}>
          <Sidebar>
            <H2>Feedback</H2>
            <FeedbackListLoader recipeId={recipe.id} />
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
