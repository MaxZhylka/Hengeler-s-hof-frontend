"use client";

import React, { useState } from "react";
import clsx from "clsx";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ClickAwayListener,
} from "@mui/material";
import { useTranslations } from "next-intl";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { CalendarToday } from "@mui/icons-material";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { ImagePicker } from "@/widgets/ImagePicker";

type EventType = "oneday" | "multiday";

export default function AdminEvents() {
  const t = useTranslations("AdminEvents");
  const [selectedEventType, setSelectedEventType] =
    useState<EventType>("multiday");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string[]>([]);
  const [onedayBeginDate, setOnedayBeginDate] = useState<Date>();
  const [onedayEndDate, setOnedayEndDate] = useState<Date>();
  const [onedayTime, setOnedayTime] = useState<string>("");
  const [multidayBeginDate, setMultidayBeginDate] = useState<Date>();
  const [multidayEndDate, setMultidayEndDate] = useState<Date>();
  const [multidayTime, setMultidayTime] = useState<string>("");
  const [pickerOpen, setPickerOpen] = useState<{
    mode: EventType;
    field: "begin" | "end" | "time";
  } | null>(null);
  const inputBaseClass =
    "bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg h-[30px]";
  const disabledStyle = "opacity-50 pointer-events-none select-none";
  const formatDate = (d?: Date) =>
    d ? d.toLocaleDateString("default") : "";
  const handleDaySelect: SelectSingleEventHandler = (date) => {
    if (!pickerOpen) return;
    const { mode, field } = pickerOpen;
    if (mode === "oneday") {
      if (field === "begin") setOnedayBeginDate(date || undefined);
      if (field === "end") setOnedayEndDate(date || undefined);
    } else {
      if (field === "begin") setMultidayBeginDate(date || undefined);
      if (field === "end") setMultidayEndDate(date || undefined);
    }
    setPickerOpen(null);
  };
  const [currentLang, setCurrentLang] = useState<"uk" | "en" | "de">("uk");
  const [eventText, setEventText] = useState({
    uk: "",
    en: "",
    de: "",
  });
  const handleLangChange = (lang: "uk" | "en" | "de") => {
    setCurrentLang(lang);
  };
  const handleTextChange = (text: string) => {
    setEventText((prev) => ({
      ...prev,
      [currentLang]: text,
    }));
  };

  return (
    <div className="relative w-2/5 rounded bg-[var(--section-bg)] py-[10px] px-5 border border-[var(--section-border)] flex flex-col gap-4">
      <span className="text-[20px] font-medium">{t("createEvent")}</span>

      <div className="flex flex-col w-[48%]">
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

      <FormControl>
        <RadioGroup
          name="eventType"
          value={selectedEventType}
          onChange={(e) =>
            setSelectedEventType(e.target.value as EventType)
          }
        >
          <FormControlLabel
            value="multiday"
            control={<Radio sx={{ "&.Mui-checked": { color: "var(--accent)" } }} />}
            label={t("multiDay")}
          />
          <div className={selectedEventType !== "multiday" ? disabledStyle : undefined}>
            <div className="flex justify-between gap-4 mb-2">
              <div className="flex flex-col w-[48%]">
                <label htmlFor="multiday-begin" className="text-[16px]">
                  {t("begin")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="multiday-begin"
                    name="multidayBegin"
                    readOnly
                    className="bg-transparent outline-none h-full flex-grow"
                    value={formatDate(multidayBeginDate)}
                  />
                  <CalendarToday
                    onClick={() =>
                      setPickerOpen({ mode: "multiday", field: "begin" })
                    }
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[48%]">
                <label htmlFor="multiday-end" className="text-[16px]">
                  {t("end")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="multiday-end"
                    name="multidayEnd"
                    readOnly
                    className="bg-transparent outline-none h-full flex-grow"
                    value={formatDate(multidayEndDate)}
                  />
                  <CalendarToday
                    onClick={() =>
                      setPickerOpen({ mode: "multiday", field: "end" })
                    }
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="multiday-time" className="text-[16px] mb-1">
                {t("time")}
              </label>
              <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                <input
                  id="multiday-time"
                  name="multidayTime"
                  className="bg-transparent outline-none h-full flex-grow"
                  onChange={(e) => setMultidayTime(e.target.value)}
                  value={multidayTime}
                />
                <AccessTimeIcon
                  onClick={() =>
                    setPickerOpen({ mode: "multiday", field: "time" })
                  }
                  sx={{ cursor: "pointer", ml: 1 }}
                  fontSize="small"
                />
              </div>
            </div>
          </div>

          <FormControlLabel
            value="oneday"
            control={<Radio sx={{ "&.Mui-checked": { color: "var(--accent)" } }} />}
            label={t("oneDay")}
          />
          <div className={selectedEventType !== "oneday" ? disabledStyle : undefined}>
            <div className="flex justify-between gap-4 mb-2">
              <div className="flex flex-col w-[48%]">
                <label htmlFor="oneday-begin" className="text-[16px]">
                  {t("begin")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="oneday-begin"
                    name="onedayBegin"
                    readOnly
                    className="bg-transparent outline-none h-full flex-grow"
                    value={formatDate(onedayBeginDate)}
                  />
                  <CalendarToday
                    onClick={() =>
                      setPickerOpen({ mode: "oneday", field: "begin" })
                    }
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[48%]">
                <label htmlFor="oneday-time" className="text-[16px]">
                  {t("time")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="oneday-time"
                    name="onedayTime"
                    onChange={(e) => setOnedayTime(e.target.value)}
                    className="bg-transparent outline-none h-full flex-grow"
                    value={onedayTime}
                  />
                  <AccessTimeIcon
                    onClick={() =>
                      setPickerOpen({ mode: "oneday", field: "time" })
                    }
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </RadioGroup>
      </FormControl>
      <label className="text-[16px] font-medium">{t("chooseImage")}</label>
      <ImagePicker
        maxFiles={10}
        width={32.5}
        height={8}
        onPreviewsChange={(newPreviews) => setImages(newPreviews)}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-[16px] font-medium">{t("eventText")}</label>
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
          className="bg-[var(--section-bg)] border border-[var(--section-border)] rounded p-2 outline-none resize-none"
          placeholder={`${t("eventTextPlaceholder")} (${currentLang.toUpperCase()})`}
          value={eventText[currentLang]}
          onChange={(e) => handleTextChange(e.target.value)}
        />

        <pre className="text-xs mt-2">{JSON.stringify(eventText, null, 2)}</pre>
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

      {pickerOpen && (
        <ClickAwayListener onClickAway={() => setPickerOpen(null)}>
          <div className="absolute p-5 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg">
            {pickerOpen.field === "time" ? (
              <input
                type="time"
                autoFocus
                className="outline-none"
                value={
                  pickerOpen.mode === "oneday"
                    ? onedayTime
                    : multidayTime
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (pickerOpen.mode === "oneday") setOnedayTime(val);
                  else setMultidayTime(val);
                }}
                onBlur={() => setPickerOpen(null)}
              />
            ) : (
              <DayPicker
                mode="single"
                selected={
                  pickerOpen.mode === "oneday"
                    ? pickerOpen.field === "begin"
                      ? onedayBeginDate
                      : onedayEndDate
                    : pickerOpen.field === "begin"
                      ? multidayBeginDate
                      : multidayEndDate
                }
                onSelect={handleDaySelect}
              />
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
