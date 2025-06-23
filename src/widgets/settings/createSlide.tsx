"use client";
import { Slide } from "./../mainPage/slide";

import React, { useState } from "react";
import clsx from "clsx";
import {
    Button
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ImagePicker } from "@/widgets/ImagePicker";

export function CreateSlide({selectedSlide}:{ selectedSlide?: Slide | null }) {
    const t = useTranslations("AdminSlides");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [images, setImages] = useState<string[]>([]);
    const inputBaseClass =
        "bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg h-[30px]";
    const [currentLang, setCurrentLang] = useState<"uk" | "en" | "de">("uk");
    const [slideText, setSlideText] = useState({
        uk: "",
        en: "",
        de: "",
    });
    const handleLangChange = (lang: "uk" | "en" | "de") => {
        setCurrentLang(lang);
    };
    const handleTextChange = (text: string) => {
        setSlideText((prev) => ({
            ...prev,
            [currentLang]: text,
        }));
    };
    return (
        <div className={clsx("relative h-fit rounded bg-[var(--section-bg)] py-[10px] px-5  flex flex-col gap-4", selectedSlide ? "w-full" : "w-[45%] border border-[var(--section-border)]")}>
            <span className="text-[20px] font-medium">{t("createSlide")}</span>
            <div className="flex justify-between">
                <div className="flex flex-col gap-2 w-1/3">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-[16px]">
                            {t("name")}
                        </label>
                        <div className={clsx(inputBaseClass, "px-2")}>
                            <input
                                id="name"
                                name="name"
                                className="bg-transparent outline-none h-full w-full"
                            />
                        </div>
                    </div>
                    <label className="text-[16px] font-medium">{t("chooseImage")}</label>
                    <ImagePicker
                        maxFiles={1}
                        width={100}
                        height={8}
                        onPreviewsChange={(newPreviews) => setImages(newPreviews)}
                    />
                </div>
                <div className="flex flex-col gap-2 w-[65%]">
                    <div className="flex justify-between items-center">
                        <label className="text-[16px] font-medium">{t("slideText")}</label>
                        <div className="flex gap-2">
                            {(["uk", "en", "de"] as const).map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => handleLangChange(lang)}
                                    className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${currentLang === lang
                                        ? "bg-[var(--section-bg)] border-[var(--accent)] text-[var(--primary-text)]"
                                        : "bg-transparent text-[var(--section-border)]"
                                        }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <textarea
                        rows={4}
                        className="bg-[var(--section-bg)] border border-[var(--section-border)] h-full rounded p-2 outline-none resize-none"
                        placeholder={`${t("slideTextPlaceholder")} (${currentLang.toUpperCase()})`}
                        value={slideText[currentLang]}
                        onChange={(e) => handleTextChange(e.target.value)}
                    />
                </div>
            </div>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "var(--accent)",
                    "&:hover": { backgroundColor: "var(--accent)" },
                    alignSelf: "start",
                }}
            >
                {t("save")}
            </Button>
            <pre className="text-xs mt-2">{JSON.stringify(slideText, null, 2)}</pre>

        </div>
    );
}