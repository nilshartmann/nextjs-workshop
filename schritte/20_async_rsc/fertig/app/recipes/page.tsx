import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import { fetchRecipes } from "@/app/components/queries.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

export default async function RecipeListPage() {
  const result = fetchRecipes();

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        <RecipeList recipesPromise={result} />
      </div>
    </div>
  );
}

type RecipeListProps = {
  recipesPromise: Promise<PageResponseRecipeDto>;
};

async function RecipeList({ recipesPromise }: RecipeListProps) {
  const result = await recipesPromise;
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.content.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}
