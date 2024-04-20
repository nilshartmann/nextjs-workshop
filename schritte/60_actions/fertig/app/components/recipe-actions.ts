"use server";

import { revalidateTag } from "next/cache";
import { saveLike } from "@/app/components/queries.ts";

export async function increaseLikes(recipeId: string) {
  const result = saveLike(recipeId);

  revalidateTag("recipes");
  revalidateTag(`recipes/${recipeId}`);

  return result;
}
