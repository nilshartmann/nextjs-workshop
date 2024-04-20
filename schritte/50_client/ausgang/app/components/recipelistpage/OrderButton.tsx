"use client";
import { Button, CheckLabel } from "@/app/components/Button.tsx";
import Link from "next/link";
import { ReactNode } from "react";

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "likes" | "time";
};
export function OrderButton({ orderBy, children }: OrderButtonProps) {
  // TODO:

  //  Der "OrderButton" soll einen Link rendern, der die (neue) Sortierreihenfolge ("orderBy") und ggf.
  //   die Seite ("page") enthält
  //   - OrderButton muss eine Client Komponente sein!
  //   - Verwende useSearchParams() von "next/navigation", um an die aktuellen Suchparameter zu gelangen
  const currentOrderBy = ""; // todo: "orderBy" Search Param!

  // TODO: Erzeuge die NEUEN Search Parameter:
  //  - "orderBy" muss auf den Wert gesetzt werden, auf den das "orderBy"-Property zeigt
  //    wenn das "orderBy"-Property nicht gesetzt ist, soll "orderBy" natürlich auch nicht als
  //    Search Parameter gesetzt sein, bzw. muss entfernt werden, wenn "orderBy" als Search Parameter aktuell gesetzt ist
  //  - Alle anderen Search Parameter, die sich u.U. schon in der URL befinden sollen unverändert übernommen werden
  //    - Du musst dazu den "new URLSearchParams()" Aufruf anpassen...
  const searchParams = new URLSearchParams();

  const href = `/recipes?${searchParams.toString()}`;
  const checked = orderBy === (currentOrderBy || undefined);

  return (
    <Button checked={checked}>
      <CheckLabel checked={checked}>
        {checked ? children : <Link href={href}>{children}</Link>}
      </CheckLabel>
    </Button>
  );
}
