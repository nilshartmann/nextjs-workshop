import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

type RecipeListProps = {
  recipesPromise: Promise<PageResponseRecipeDto>;
};

export async function RecipeList({ recipesPromise }: RecipeListProps) {
  const result = await recipesPromise;
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.content.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}
