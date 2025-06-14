import type { Metadata } from "next";
import "./../../globals.css";
import Header from "@/widgets/header/ui/header";
import BurgerHeader from "@/widgets/header/ui/burgerHeader";

export const metadata: Metadata = {
  title: "Hengeler's Hof",
  description: "Generated by create next app"
};

export default async function ImageHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header hasImage={true} />
      <BurgerHeader hasImage={true} />
      {children}
    </>
  );
}
