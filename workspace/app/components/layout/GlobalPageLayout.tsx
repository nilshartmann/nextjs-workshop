import { ReactNode } from "react";
import Footer from "./Footer";
import { RecipesPageLayout } from "@/app/components/material/RecipesPageLayout.tsx";

type DefaultLayoutProps = {
  children: ReactNode;
};

export function GlobalPageLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={"flex min-h-svh flex-col"}>
      <div className={"container mx-auto h-16"}>
        <div className={"flex h-full items-center justify-between"}>
          {/*<GlobalNavBar />*/}
          {/*<NewsletterRegistration />*/}
        </div>
      </div>
      <RecipesPageLayout>{children}</RecipesPageLayout>

      <Footer />
    </div>
  );
}
