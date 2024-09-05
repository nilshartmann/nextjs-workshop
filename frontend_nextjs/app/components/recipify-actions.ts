"use server";

import { increaseLikes } from "@/app/components/material/recipe-actions.ts";

type HandleIncreaseLikeActionState = {
  recipeId: string;
  likes: number;
};

export async function handleIncreaseLike({
  recipeId,
}: HandleIncreaseLikeActionState) {
  // Likes in DB o.ä. speichern
  const { newLikes: likes } = await increaseLikes(recipeId);

  // Aktualisierte Daten (!) zum Client
  return {
    recipeId,
    likes,
  };
}
