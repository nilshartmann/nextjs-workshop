import Link from "next/link";
import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import { buildUrl } from "@/app/components/material/build-url.ts";
import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import { fetchRecipes } from "@/app/components/queries.ts";
import {
  getValidatedRecipeListSearchParams,
  TRecipePageListParams,
} from "@/app/components/recipelistpage/RecipeListSearchParams.ts";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

type RecipeListPageProps = {
  searchParams: TRecipePageListParams;
};

export default async function RecipeListPage({
  searchParams,
}: RecipeListPageProps) {
  const params = getValidatedRecipeListSearchParams(searchParams);

  const result = fetchRecipes(params.page, params.orderBy, params.showOnlyIds);

  const totalPagesPromise = result.then((r) => r.totalPages);

  return (
    <div className={"flex flex-grow bg-goldgray"}>
      <div className={"container mx-auto pt-2"}>
        <RecipeListNavBar />

        <RecipeList recipesPromise={result} />

        <div className={"mt-8 flex justify-center"}>
          <PaginationBar
            totalPagesPromise={totalPagesPromise}
            currentPage={params.page}
          >
            {(btn) =>
              btn.disabled ? (
                <PageButton state={btn} />
              ) : (
                <Link
                  href={buildUrl("/recipes", { ...params, page: btn.page })}
                >
                  <PageButton state={btn} />
                </Link>
              )
            }
          </PaginationBar>
        </div>
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
    <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.content.map((recipe) => {
        return (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
}
