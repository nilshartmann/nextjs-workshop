import ButtonBar from "../ButtonBar.tsx";
import { NavButtonBar } from "../NavButtonBar.tsx";
import { OrderButton } from "@/app/components/recipelistpage/OrderButton.tsx";

export default function RecipeListNavBar() {
  return (
    <NavButtonBar align={"right"}>
      <ButtonBar>
        <OrderButton orderBy={undefined}>Newest first</OrderButton>
        <OrderButton orderBy={"likes"}>Most liked</OrderButton>
        <OrderButton orderBy={"time"}>Shortest time</OrderButton>
      </ButtonBar>
    </NavButtonBar>
  );
}
