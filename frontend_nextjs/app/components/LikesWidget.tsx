"use client";
import { RecipeDto } from "@/app/components/api-types.ts";
import { useOptimistic, useState, useTransition } from "react";
import { increaseLikes } from "@/app/components/material/recipe-actions.ts";
import { twMerge } from "tailwind-merge";

type LikesWidgetProps = {
  recipe: RecipeDto;
};

export function LikesWidget({ recipe }: LikesWidgetProps) {
  const [isPending, startTransition] = useTransition();
  const [likes, setLikes] = useState(recipe.likes);
  const [optimisticLikes, increaseOptimistic] = useOptimistic(
    likes,
    (currentLikes, amount: number) => {
      return currentLikes + amount;
    },
  );

  const handleIncreaseLikes = async () => {
    startTransition(async () => {
      increaseOptimistic(1);
      const result = await increaseLikes(recipe.id);
      setLikes(result.newLikes);
    });
  };

  console.log("ispending", isPending, likes, optimisticLikes);

  return (
    <p
      onClick={handleIncreaseLikes}
      className={twMerge(
        "me-2 inline-block rounded border border-orange_2 bg-white p-2 text-[15px] text-orange_2 hover:cursor-pointer hover:bg-orange_2 hover:text-white",
        isPending && "bg-red hover:cursor-default",
      )}
    >
      <i className="fa-regular fa-heart mr-2"></i>
      {optimisticLikes}
    </p>
  );
}
