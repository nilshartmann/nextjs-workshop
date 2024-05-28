import { fetchRecipes } from "@/app/components/queries.ts";
import { RecipeList } from "@/app/components/recipelistpage/RecipeList.tsx";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";

type RecipeListPageProps = {
  searchParams: {
    page?: string;
    orderBy?: "likes" | "time";
  };
};

export default async function RecipeListPage({
  searchParams,
}: RecipeListPageProps) {
  const page = parseInt(searchParams.page || "0");
  const orderBy = searchParams.orderBy;

  const recipes = fetchRecipes(page, orderBy);

  return (
    <div>
      <RecipeListNavBar />
      <RecipeList recipesPromise={recipes} />
    </div>
  );
}
