"use server";

import { saveLike } from "@/app/components/queries.ts";

export async function increaseLikes(recipeId: string) {
  console.log("increaseLikes", recipeId);

  const response = await saveLike(recipeId);

  return response;

  // TODO:
  //
  // Implementiere die increaseLikes Server-Action-Funktion
  //   - Die Funktion muss eine Server-Funktion sein!
  //   - Die Funktion muss asynchron sein!
  //   - Zum Hochzählen der Likes kannst Du die fertige Funktion 'saveLike' aufrufen
  //   - Diese liefert ein Promise mit einem Objekt zurück, das so aussieht:
  //       { newLikes: 213 }
  //   - Dieses Objekt kannst Du als Rückgabe-Wert für increaseLikes verwenden
  //
  //   - Musst Du revalidateTag / revalidatePath verwenden,um den Cache zu aktualisieren?
}
