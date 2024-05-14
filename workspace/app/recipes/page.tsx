import { fetchRecipes } from "@/app/components/queries.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";
import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import RecipeListPaginationBar from "@/app/components/recipelistpage/RecipeListPaginationBar.tsx";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";

type RecipeListPageProps = {
  searchParams: {
    orderBy?: "likes" | "time";
    page?: string;
  };
};

export default async function RecipeListPage({
  searchParams,
}: RecipeListPageProps) {
  console.log("Rendering RecipseListPage at ", new Date().toLocaleTimeString());

  // http://localhost:8100/recipes/18

  const result = fetchRecipes(
    parseInt(searchParams.page || "0") || 0,
    searchParams.orderBy,
  );

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        <RecipeListNavBar />
        <RecipeListPaginationBar
          pageCountPromise={result}
          params={searchParams}
        />
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
