"use server";

import { revalidateTag } from "next/cache";
import { saveLikeToDb } from "@/app/components/queries.ts";

export async function increaseLikes(recipeId: string) {
  console.log("Increase Like", recipeId);

  const result = saveLikeToDb(recipeId);

  revalidateTag("recipes");
  revalidateTag(`recipes/${recipeId}`);

  return result;
}
