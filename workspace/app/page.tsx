import { Button } from "@/app/components/Button.tsx";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className={"container mx-auto mt-20 flex  h-full justify-center"}>
      <Button size={"lg"}>
        <Link href={"/recipes"}>Los geht's!</Link>
      </Button>
    </div>
  );
}
