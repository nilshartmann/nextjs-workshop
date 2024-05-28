import { fetchRecipe } from "@/app/components/queries.ts";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";

type Props = {
  params: {
    recipeId: string;
  };
};

export default async function RecipePage({ params }: Props) {
  console.log("SEARCH PARAMS", params);

  const response = await fetchRecipe(params.recipeId);

  return <RecipePageContent recipe={response?.recipe} />;
}
