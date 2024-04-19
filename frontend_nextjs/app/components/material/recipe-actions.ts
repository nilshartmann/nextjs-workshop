"use server";

import {
  fetchFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import { slowDown_IncreaseLikes } from "@/app/demo-config.tsx";
import { revalidateTag } from "next/cache";

export async function increaseLikes(recipeId: string) {
  const result = await fetchFromApi(
    getEndpointConfig("patch", "/api/recipes/{recipeId}/likes"),
    {
      path: {
        recipeId,
      },
      query: {
        slowdown: slowDown_IncreaseLikes,
      },
    },
  );

  // revalidateTag("recipes");
  // revalidateTag(`recipes/${recipeId}`);

  return result;
}
