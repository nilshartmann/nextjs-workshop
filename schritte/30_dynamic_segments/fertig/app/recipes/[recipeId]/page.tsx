import { fetchRecipe } from "@/app/components/queries.ts";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";
import { notFound } from "next/navigation";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await fetchRecipe(params.recipeId);

  if (!recipe) {
    notFound();
  }

  return <RecipePageContent recipe={recipe.recipe} />;
}
