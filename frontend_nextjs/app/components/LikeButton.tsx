import { RecipeDto } from "@/app/components/api-types.ts";
import { increaseLikes } from "@/app/components/material/recipe-actions.ts";
import { revalidatePath } from "next/cache";

type LikesWidgetProps = {
  recipe: RecipeDto;
};
export default function LikeButton({ recipe }: LikesWidgetProps) {
  async function handleFormSubmit() {
    // Diese Funktion wird auf dem Server (!) ausgeführt
    // Next.js stellt dafür einen (internen) Endpunkt zur Verfügung
    // der automatisch aufgerufen wird, wenn das Formular unten
    // submitted wird.
    "use server";

    // Likes in der Datenbank (oder Microservice o.ä.) speichern
    await increaseLikes(recipe.id);

    // Next.js anweisen die /-Route aus dem Cache zu nehmen,
    // damit die Darstellung aktualisiert wird
    revalidatePath("/");
  }

  return (
    <form action={handleFormSubmit}>
      <button type={"submit"}>{recipe.likes}</button>
    </form>
  );
}
