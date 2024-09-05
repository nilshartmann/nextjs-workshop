import { ReactNode } from "react";

type StaticPageLayoutProps = {
  children: ReactNode;
};

export default function StaticPageLayout({ children }: StaticPageLayoutProps) {
  return <div className={"container mx-auto flex-grow"}>{children}</div>;
}
