import { fetchRecipe } from "@/app/components/queries.ts";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";
import { notFound } from "next/navigation";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};

//
//  UNVERÄNDERT ZUR VORHERIGEN ÜBUNG!
//
//     DU MUSST `RecipePageContent` anpassen
//       - und ggf. überlegen, wo Du den Request für die Bewertungn startest!

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await fetchRecipe(params.recipeId);

  if (!recipe) {
    notFound();
  }

  return <RecipePageContent recipe={recipe.recipe} />;
}
