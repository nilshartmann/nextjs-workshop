import Link from "next/link";
import {cookies, headers} from "next/headers";

export default function LandingPage(){

	console.log("LandingPage ", new Date().toLocaleTimeString());

	// /recipes/R1
	// /recipes/[recipeId]

	return <div>
		<h1>Hello World!</h1>
		<Link
			prefetch={false}
			href={"/recipes"}>Rezepte anzeigen</Link>
	</div>

}