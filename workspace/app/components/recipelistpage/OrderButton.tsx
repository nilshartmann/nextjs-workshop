"use client";
import { Button, CheckLabel } from "@/app/components/Button.tsx";
import Link from "next/link";
import { ReactNode, useTransition } from "react";
import { useSearchParams } from "next/navigation";

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "likes" | "time";
};
export function OrderButton({ orderBy, children }: OrderButtonProps) {
  const params = useSearchParams();
  const currentOrderBy = params.get("orderBy");
  const [isPending, startTransition] = useTransition();

  const searchParams = new URLSearchParams(params);
  if (orderBy) {
    searchParams.set("orderBy", orderBy);
  } else {
    searchParams.delete("orderBy");
  }

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
