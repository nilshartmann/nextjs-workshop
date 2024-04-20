import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import { fetchRecipes } from "@/app/components/queries.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";
import { OrderButton } from "@/app/components/recipelistpage/OrderButton.tsx";
import ButtonBar from "@/app/components/ButtonBar.tsx";
import RecipeListPaginationBar from "@/app/components/recipelistpage/RecipeListPaginationBar.tsx";

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

  const result = fetchRecipes(page, orderBy);

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        <ButtonBar>
          <OrderButton orderBy={undefined}>Newest first</OrderButton>
          <OrderButton orderBy={"likes"}>Most liked</OrderButton>
          <OrderButton orderBy={"time"}>Shortest time</OrderButton>
        </ButtonBar>

        <RecipeList recipesPromise={result} />

        <RecipeListPaginationBar
          pageCountPromise={result}
          params={searchParams}
        />
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
