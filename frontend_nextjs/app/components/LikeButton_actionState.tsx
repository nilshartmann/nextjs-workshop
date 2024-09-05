"use client";
import { RecipeDto } from "@/app/components/api-types.ts";
import { useActionState } from "react";
import { handleIncreaseLike } from "@/app/components/recipify-actions.ts";

type LikesWidgetProps = {
  recipe: RecipeDto;
};

export function LikesWidget_withAction({ recipe }: LikesWidgetProps) {
  const [state, action, isPending] = useActionState(handleIncreaseLike, {
    recipeId: recipe.id,
    likes: recipe.likes,
  });

  return (
    <form action={action}>
      <button type={"submit"} disabled={isPending}>
        {state.likes}
      </button>
    </form>
  );
}
