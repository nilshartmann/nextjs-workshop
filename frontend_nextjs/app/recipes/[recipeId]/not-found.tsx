import { H2 } from "@/app/components/Heading.tsx";
import Link from "next/link";
import { Button } from "@/app/components/Button.tsx";

export default function RecipeNotFound() {
  return (
    <div>
      <H2>Recipe not found!</H2>
      <p>
        The request recipe could not be found.{" "}
        <Button>
          <Link href={"/recipes"}>Try find another one.</Link>
        </Button>
      </p>
    </div>
  );
}
