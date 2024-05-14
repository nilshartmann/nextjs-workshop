import Link from "next/link";
import { Button } from "@/app/components/Button.tsx";

export default function LandingPage() {
  console.log("Rendering LandingPage at ", new Date().toLocaleTimeString());
  return (
    <div>
      <Button>
        <Link href={"/recipes"}>Let me in!</Link>
      </Button>
    </div>
  );
}
