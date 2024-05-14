"use server";

import { saveLike } from "@/app/components/queries.ts";
import { revalidatePath } from "next/cache";

export async function increaseLikes(formData: FormData) {
  const recipeId = formData.get("recipeId") as string;
  console.log("recipeId", recipeId);
  console.log("INCREASE LIKES", recipeId, Date.now());

  const result = await saveLike(recipeId);

  revalidatePath("/recipes");
  revalidatePath("/recipes/" + recipeId);

  return result;
}
