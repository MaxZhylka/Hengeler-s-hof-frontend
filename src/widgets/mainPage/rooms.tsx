import { RoomCarousel } from "@/features/mainPage/roomCarousel";
import { getTranslations } from "next-intl/server";
import { loadRoomSlider, Slider } from "@/entities/api/slider.service";
import { Feature, PriceItem } from "@/entities/api/adminSettings.service";

export async function Rooms({
  features,
  priceList,
}: {
  features: Feature[];
  priceList: PriceItem[];
}) {
  const t = await getTranslations("Rooms");
  const roomsSlider: Slider = await loadRoomSlider();
  return (
    <section className="w-full relative flex items-center flex-col gap-[12px] justify-center">
      <div className="w-9/10 lg:w-3/4 flex flex-col ">
        <span className="flex flex-col h-fit lg:flex-row justify-between itelg-center lg:gap-[24px]">
          <h2 className="text-[24px] leading-none md:text-[64px] inter text-nowrap font-light content-center text-[var(--primary-text)]">
            {t("title")}
          </h2>
          <p className="text-[14px] md:text-[16px] w-full lg:w-1/2 text-justify content-center inter font-light text-[var(--primary-text)]">
            {t("description")}
          </p>
        </span>
      </div>
      <RoomCarousel features={features} priceList={priceList} slides={roomsSlider.slides} />
    </section>
  );
}
