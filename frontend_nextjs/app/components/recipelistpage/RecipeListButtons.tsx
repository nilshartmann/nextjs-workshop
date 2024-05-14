"use client";
import { Button, CheckLabel } from "@/app/components/Button.tsx";
import Link from "next/link";
import { MouseEventHandler, ReactNode, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useRecipeListSearchParams } from "@/app/components/recipelistpage/useRecipeListSearchParams.tsx";

export function FilterButton() {
  const [showOnlyBookmarked, buildHref] = useRecipeListSearchParams(
    (s) => s.showOnlyBookmarked || false,
  );

  return (
    <Button checked={showOnlyBookmarked}>
      <Link
        href={buildHref("/recipes", (s) => ({
          ...s,
          page: 0,
          showOnlyBookmarked: !showOnlyBookmarked,
        }))}
      >
        <CheckLabel
          checked={showOnlyBookmarked}
          enabled={true}
          style={"square"}
        >
          Show only bookmarked
        </CheckLabel>
      </Link>
    </Button>
  );
}

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "likes" | "time";
};
export function OrderButton({ orderBy, children }: OrderButtonProps) {
  const [currentOrderBy, buildHref] = useRecipeListSearchParams(
    (s) => s.orderBy,
  );

  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const checked = orderBy === currentOrderBy;
  const href = buildHref("/recipes", (s) => ({
    ...s,
    orderBy,
  }));

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Button checked={checked}>
      <CheckLabel checked={checked}>
        {checked ? (
          children
        ) : pending ? (
          <p className={"text-4xl font-bold text-white"}>WARTEN...</p>
        ) : (
          <Link href={href} onClick={handleClick}>
            {children}
          </Link>
        )}
      </CheckLabel>
    </Button>
  );
}
