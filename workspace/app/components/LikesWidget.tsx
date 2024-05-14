import { RecipeDto } from "@/app/components/api-types.ts";
import { twMerge } from "tailwind-merge";
import { increaseLikes } from "@/app/components/recipe-actions.ts";
import Warte from "@/app/components/recipepage/Warte.tsx";

type LikesWidgetProps = {
  recipe: RecipeDto;
};

export function LikesWidget({ recipe }: LikesWidgetProps) {
  // const [likes, setLikes] = useState(recipe.likes);
  // const [isPending, startTransition] = useTransition();
  // const [optimisticLikes, increaseLikesOptimistic] = useOptimistic(
  //   likes,
  //   (currentLikes, amount: number) => {
  //     return currentLikes + amount;
  //   },
  // );

  // todo:
  //  - Wenn der Aufruf deiner Action funktioniert, kannst Du
  //    eine Transition einfügen?

  // const handleIncreaseLikes = () => {
  //   startTransition(async () => {
  //     increaseLikesOptimistic(1);
  //     const result = await increaseLikes(recipe.id);
  //     setLikes(result.newLikes);
  //   });
  // };

  return (
    <form action={increaseLikes}>
      <button
        type={"submit"}
        className={twMerge(
          "me-2 inline-block rounded border border-orange_2 bg-white p-2 text-[15px] text-orange_2 hover:cursor-pointer hover:bg-orange_2 hover:text-white",
        )}
      >
        <input type={"hidden"} name={"recipeId"} value={recipe.id} />
        <i className="fa-regular fa-heart mr-2"></i>
        {recipe.likes}
      </button>
      <Warte />
    </form>
  );
}
