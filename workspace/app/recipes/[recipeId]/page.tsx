import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};
export default async function RecipePage(props: RecipePageProps) {
  console.log("RecipePage", Date.now());

  // const x = await fetchFromApi(
  //   getEndpointConfig("get", "/api/recipes/{recipeId}"),
  //   {
  //     path: {
  //       recipeId: "fasdfasdf",
  //     },
  //     query: {},
  //   },
  // );

  // const feedbackPromise = fetchFeedback(props.params.recipeId);

  // TanStack Query (React Query)

  // 1000

  // if (!result) {
  //   notFound();
  //   // return <h1>Rezept nicht vorhanden!</h1>;
  // }

  return <RecipePageContent recipeId={props.params.recipeId} />;

  // return <RecipePageContent recipe={result.recipe} />; // 2000
}
