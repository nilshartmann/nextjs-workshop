"use client";
import { ReactNode, useEffect, useState } from "react";
import { Ingredient } from "@/app/components/api-types.ts";
import { calculateIngredients } from "@/app/components/material/action.tsx";

type IngredientsProps = {
  ingredients: Ingredient[];
};
export default function IngredientsSectionWithServerAction({
  ingredients,
}: IngredientsProps) {
  const [servings, setServings] = useState(4);
  const [ingredientsUi, setIngredientsUi] = useState<ReactNode | null>(null);

  useEffect(() => {
    //🤔 Here we send 'newServings' and 'ingredients' OVER THE NETWORK!
    //     - when just looking at the function invocation, we don't see this...
    //     - would it be better to send only the recipeId and then fetch the ingredients
    //       inside the action on serverside?
    calculateIngredients(servings, ingredients).then(setIngredientsUi);
  }, []);

  const handleChangeServings = async (amount: number) => {
    const newServings = servings + amount;
    //🤔 Here we send 'newServings' and 'ingredients' OVER THE NETWORK!
    //     - when just looking at the function invocation, we don't see this...
    //     - would it be better to send only the recipeId and then fetch the ingredients
    //       inside the action on serverside?
    const ui = await calculateIngredients(newServings, ingredients);
    setServings(newServings);
    setIngredientsUi(ui);
  };

  return (
    <>
      <div className={"mb-8 mt-8 flex items-center justify-between"}>
        <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
        <div
          className={
            "rounded-lg border border-dotted border-gray-500 p-4 text-lg"
          }
        >
          <i
            className={
              "fa-solid fa-circle-plus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
            onClick={() => handleChangeServings(1)}
          />
          <span className={"text-gray-500"}> {servings} servings </span>
          <i
            className={
              "fa-solid fa-circle-minus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
            onClick={() => handleChangeServings(-1)}
          />{" "}
        </div>
      </div>
      {ingredientsUi}
    </>
  );
}
