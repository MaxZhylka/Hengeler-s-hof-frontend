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
      <nav className="rounded bg-[var(--section-bg)] text-nowrap border-1 border-[var(--section-border)] pt-[10px] px-[20px] flex flex-col gap-[10px] w-9/10 lg:w-3/4">
        <span className="text-[24px] font-bold">{t("adminPanel")}</span>
        <div className="flex gap-[20px] overflow-scroll scrollbar-hide">
          <Link href={"/admin/events"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("events") && "after:scale-x-100")}>
            {t("events")}
          </Link>
          <Link href={"/admin/contacts"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("contacts") && "after:scale-x-100")}>
            {t("contacts")}
          </Link>
          <Link href={"/admin/settings/room1"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("settings") && "after:scale-x-100")}>
            {t("settings")}
          </Link>
          <Link href={"/admin/slides"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("slides") && "after:scale-x-100")}>
            {t("slides")}
          </Link>
          <Link href={"/admin/sliders"} className={clsx("relative inline-block after:block after:h-[2px] after:bg-[var(--accent)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            , pathname.includes("sliders") && "after:scale-x-100")}>
            {t("Slider")}
          </Link>
        </div>
      </nav>
      {children}
    </main>
  );
}
