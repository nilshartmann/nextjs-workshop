import {fetchFeedback, fetchRecipe} from "@/app/components/queries.ts";
import {notFound} from "next/navigation";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";

type Props ={
	params: {
		recipeId: string
	}
}

export default async function RecipePage({params}: Props) {
	console.log("RecipeId", params.recipeId);

	// IDEE: wir starten hier schon den Netzwerk-Request
	//       - dann kann der Server schon die Daten laden
	//       - waehrend Next/React schon mit dem Rendern der RecipeList
	//         anfaengt
	//       - (Next.js sorgt dafür, dass ein fetch-Request zur
	//         selben URL nur einmal ausgeführt wird)
	fetchFeedback(params.recipeId);

	const recipe = await fetchRecipe(params.recipeId);

	if (!recipe) {
		notFound();
	}

	return <RecipePageContent recipe={recipe.recipe} />
}