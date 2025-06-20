"use client";

import React, { useState, useRef, useCallback, CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

type ImagePickerProps = {
  onPreviewsChange: (previews: string[]) => void;
  initialPreviews?: string[];
  maxFiles?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export function ImagePicker({
  onPreviewsChange,
  initialPreviews = [],
  maxFiles = 3,
  width = 130,
  height = 80,
  className = "",
}: ImagePickerProps) {
  const [previews, setPreviews] = useState<string[]>(initialPreviews);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceIndexRef = useRef<number | null>(null);

  const updatePreviews = (newPreviews: string[]) => {
    setPreviews(newPreviews);
    onPreviewsChange(newPreviews);
  };

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (!accepted.length) return;
      const newUrls = accepted.map((file) => URL.createObjectURL(file));

      if (replaceIndexRef.current !== null) {
        const updated = [...previews];
        updated[replaceIndexRef.current] = newUrls[0];
        updatePreviews(updated);
        replaceIndexRef.current = null;
      } else {
        const combined = [...previews, ...newUrls].slice(0, maxFiles);
        updatePreviews(combined);
      }
    },
    [previews, maxFiles]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    noClick: true,
    multiple: true,
    maxFiles,
  });

  const triggerReplace = (index: number) => {
    replaceIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    updatePreviews(updated);
  };

  const boxStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}%` : width,
    height: typeof height === "number" ? `${height}vw` : height,
    border: "2px dashed var(--section-border)",
    background: "var(--section-bg)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
    cursor: "pointer",
    position: "relative",
  };

  return (
    <div className={`flex flex-wrap gap-3 items-center ${className}`} {...getRootProps()}>
      {previews.length < maxFiles && (
        <div style={boxStyle} onClick={open}>
          <input {...getInputProps()} />
          <span style={{ fontSize: 24, color: "var(--section-border)", userSelect: "none" }}>
            +
          </span>
        </div>
      )}

      {previews.map((src, idx) => (
        <div key={idx} style={{ ...boxStyle, border: "1px solid var(--section-border)" }}>
          <img
            src={src}
            alt={`preview-${idx}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onClick={() => triggerReplace(idx)}
          />
          <CloseIcon
            fontSize="small"
            onClick={(e) => {
              e.stopPropagation();
              removeImage(idx);
            }}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>
      ))}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files?.length) return;
          onDrop([e.target.files[0]]);
          e.target.value = ""; // Сброс
        }}
      />
    </div>
  );
}
