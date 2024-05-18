import {fetchRecipes} from "@/app/components/queries.ts";
import {RecipeList} from "@/app/components/recipelistpage/RecipesList.tsx";

export default async function RecipeListPage() {
	console.log("RecipeListPage ", new Date().toLocaleTimeString());

	const recipesPromise = fetchRecipes();

	return <RecipeList recipesPromise={recipesPromise} />

	// return <h1>Rezept-Liste!</h1>

}