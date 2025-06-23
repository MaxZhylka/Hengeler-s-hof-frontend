"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import clsx from "clsx";

export default function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("AdminSettings");
  const pathname = usePathname();
  return (
    <main className="inter flex flex-col items-center my-5 gap-3">
      <nav className="rounded bg-[var(--section-bg)] border-1 border-[var(--section-border)] pt-[10px] px-[20px] flex flex-col gap-[10px] w-9/10 lg:w-3/4">
        <span className="text-[24px] font-bold">{t("adminPanel")}</span>
        <div className="flex gap-[20px]">
          <Link href={"./events"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("events") && "after:scale-x-100")}>
            {t("events")}
          </Link>
          <Link href={"./contacts"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("contacts") && "after:scale-x-100")}>
            {t("contacts")}
          </Link>
          <Link href={"./pallets"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("pallets") && "after:scale-x-100")}>
            {t("palettes")}
          </Link>
          <Link href={"./settings"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("settings") && "after:scale-x-100")}>
            {t("settings")}
          </Link>
          <Link href={"./mainpage"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("mainpage") && "after:scale-x-100")}>
            {t("mainpage")}
          </Link>
        </div>
      </nav>
      {children}
    </main>
  );
}
