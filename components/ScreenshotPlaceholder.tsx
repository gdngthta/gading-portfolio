"use client";

import { useState } from "react";
import type { ScreenshotFormat } from "@/lib/data";

interface ScreenshotPlaceholderProps {
  trackNumber: string;
  trackTitle: string;
  projectTitle: string;
  accentColor: string;
  platform: "web" | "mobile";
  /** Explicit format override — falls back to platform when omitted */
  screenshotFormat?: ScreenshotFormat;
  /** Path to a real screenshot, relative to /public */
  image?: string;
  /** Alt text for the screenshot image */
  alt?: string;
  /** Short caption shown over the image */
  caption?: string;
}

export default function ScreenshotPlaceholder({
  trackNumber,
  trackTitle,
  projectTitle,
  accentColor,
  platform,
  screenshotFormat,
  image,
  alt,
  caption,
}: ScreenshotPlaceholderProps) {
  const [loadError, setLoadError] = useState(false);

  // Derive effective display format
  const fmt: ScreenshotFormat =
    screenshotFormat ?? (platform === "mobile" ? "mobile-app" : "web-desktop");
  const isMobile = fmt === "mobile-app";

  /* ── Real image ─────────────────────────────────────────────────── */
  if (image && !loadError) {
    /* Mobile-app: image inside centred phone frame */
    if (isMobile) {
      return (
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ backgroundColor: "#080706" }}
        >
          {/* Phone frame */}
          <div
            style={{
              position: "relative",
              height: "88%",
              aspectRatio: "9/19.5",
              borderRadius: "14px",
              overflow: "hidden",
              border: `1.5px solid ${accentColor}55`,
              boxShadow: `0 4px 24px rgba(0,0,0,0.7), 0 0 0 1px ${accentColor}15`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={alt ?? `${projectTitle} — ${trackTitle}`}
              onError={() => setLoadError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {caption && (
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center px-4 py-2"
              style={{ backgroundColor: "rgba(8,7,6,0.88)", borderTop: "1px solid var(--border)" }}
            >
              <span className="label-caps" style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>
                {caption}
              </span>
            </div>
          )}
        </div>
      );
    }

    /* Web / desktop / architecture / product-catalog: fill container */
    return (
      <div
        className="relative w-full h-full overflow-hidden"
        style={{ backgroundColor: "#080706" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt ?? `${projectTitle} — ${trackTitle}`}
          onError={() => setLoadError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {caption && (
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center px-4 py-2"
            style={{ backgroundColor: "rgba(8,7,6,0.82)", borderTop: "1px solid var(--border)" }}
          >
            <span className="label-caps" style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>
              {caption}
            </span>
          </div>
        )}
      </div>
    );
  }

  /* ── Placeholder labels ─────────────────────────────────────────── */
  const topLabel =
    fmt === "architecture"
      ? "Architecture Diagram"
      : fmt === "product-catalog"
      ? "Product Asset"
      : isMobile
      ? "Mobile Screenshot"
      : "Screenshot Slot";

  const bottomNote =
    fmt === "product-catalog"
      ? "GTW RECORDS · PRODUCT PHOTO PENDING"
      : fmt === "architecture"
      ? "GTW RECORDS · DIAGRAM PENDING"
      : "GTW RECORDS · SCREENSHOT PENDING";

  /* ── Styled placeholder ─────────────────────────────────────────── */
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: "#080706", border: "1px solid var(--border)" }}
    >
      {/* Film-negative corner marks */}
      {(["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map(
        (pos, i) => {
          const isRight  = pos.includes("right");
          const isBottom = pos.includes("bottom");
          return (
            <div
              key={i}
              className={`absolute ${pos} w-5 h-5`}
              style={{
                borderTop:    !isBottom ? `1px solid ${accentColor}` : undefined,
                borderBottom:  isBottom ? `1px solid ${accentColor}` : undefined,
                borderLeft:   !isRight  ? `1px solid ${accentColor}` : undefined,
                borderRight:   isRight  ? `1px solid ${accentColor}` : undefined,
                opacity: 0.4,
              }}
            />
          );
        }
      )}

      {/* Top label strip */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span
          className="label-caps"
          style={{ fontSize: "0.5rem", color: "var(--text-muted)", opacity: 0.7 }}
        >
          {topLabel}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: "0.5rem", color: "var(--text-muted)", opacity: 0.5 }}
        >
          {isMobile ? "MOBILE · " : "WEB · "}TRACK {trackNumber}
        </span>
      </div>

      {/* Large watermark numeral */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-serif select-none"
          style={{
            fontSize: "clamp(5rem, 18vw, 12rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: accentColor,
            opacity: 0.04,
            lineHeight: 1,
          }}
        >
          {trackNumber}
        </span>
      </div>

      {/* Format-appropriate wireframe */}
      <WireframeLines fmt={fmt} accentColor={accentColor} />

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8">
        <div
          className="label-caps mb-1"
          style={{ fontSize: "0.55rem", color: accentColor, opacity: 0.6 }}
        >
          {projectTitle}
        </div>
        <div
          className="font-serif text-center"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
            fontWeight: 400,
            color: "var(--text-secondary)",
            opacity: 0.7,
            maxWidth: "28ch",
            lineHeight: 1.3,
          }}
        >
          {trackTitle}
        </div>
        {fmt === "product-catalog" && (
          <div
            className="label-caps mt-1"
            style={{ fontSize: "0.45rem", color: accentColor, opacity: 0.45 }}
          >
            Product asset pending
          </div>
        )}
      </div>

      {/* Bottom strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="font-mono"
          style={{ fontSize: "0.45rem", color: "var(--text-muted)", opacity: 0.4 }}
        >
          {bottomNote}
        </span>
        <div
          className="w-3 h-3 rounded-full"
          style={{ border: `1px solid ${accentColor}`, opacity: 0.3 }}
        />
      </div>
    </div>
  );
}

/* ── Format-specific wireframe lines ───────────────────────────────── */
function WireframeLines({ fmt, accentColor }: { fmt: ScreenshotFormat; accentColor: string }) {
  if (fmt === "mobile-app") {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          style={{
            width: "28%",
            aspectRatio: "9/19.5",
            border: `1px solid ${accentColor}`,
            borderRadius: "10px",
            opacity: 0.07,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Camera notch */}
          <div
            style={{
              position: "absolute", top: "3%", left: "50%", transform: "translateX(-50%)",
              width: "20%", height: "1.5%", borderRadius: "2px",
              backgroundColor: accentColor, opacity: 0.6,
            }}
          />
          {/* Screen lines */}
          {[18, 26, 34, 42, 50, 58, 66, 74].map((pct, i) => (
            <div
              key={pct}
              style={{
                position: "absolute", top: `${pct}%`, left: "10%", right: "10%",
                height: "1px", backgroundColor: accentColor,
                opacity: Math.max(0.1, 0.5 - i * 0.05),
              }}
            />
          ))}
          {/* Home bar */}
          <div
            style={{
              position: "absolute", bottom: "3%", left: "50%", transform: "translateX(-50%)",
              width: "30%", height: "1.5%", borderRadius: "2px",
              backgroundColor: accentColor, opacity: 0.5,
            }}
          />
        </div>
      </div>
    );
  }

  if (fmt === "architecture") {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute" style={{ top: "22%", left: "15%", width: "20%", height: "14%", border: `1px solid ${accentColor}`, opacity: 0.05 }} />
        <div className="absolute" style={{ top: "22%", left: "42%", width: "16%", height: "14%", border: `1px solid ${accentColor}`, opacity: 0.05 }} />
        <div className="absolute" style={{ top: "22%", left: "65%", width: "18%", height: "14%", border: `1px solid ${accentColor}`, opacity: 0.04 }} />
        <div className="absolute" style={{ top: "36%", left: "23%", width: "1px", height: "10%", backgroundColor: accentColor, opacity: 0.04 }} />
        <div className="absolute" style={{ top: "36%", left: "50%", width: "1px", height: "10%", backgroundColor: accentColor, opacity: 0.04 }} />
        <div className="absolute" style={{ top: "47%", left: "28%", width: "44%", height: "12%", border: `1px solid ${accentColor}`, opacity: 0.06 }} />
        <div className="absolute" style={{ top: "70%", left: "18%", width: "64%", height: "1px", backgroundColor: accentColor, opacity: 0.04 }} />
        <div className="absolute" style={{ top: "74%", left: "18%", width: "50%", height: "1px", backgroundColor: accentColor, opacity: 0.03 }} />
      </div>
    );
  }

  /* web-desktop and product-catalog */
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute top-8 left-6 right-6 h-px"
        style={{ backgroundColor: accentColor, opacity: 0.06 }}
      />
      <div
        className="absolute"
        style={{ top: "22%", left: "8%", width: "35%", height: "2px", backgroundColor: accentColor, opacity: 0.05 }}
      />
      <div
        className="absolute"
        style={{ top: "30%", left: "8%", width: "55%", height: "1px", backgroundColor: accentColor, opacity: 0.04 }}
      />
      <div
        className="absolute"
        style={{ top: "37%", left: "8%", width: "45%", height: "1px", backgroundColor: accentColor, opacity: 0.04 }}
      />
      <div
        className="absolute"
        style={{ top: "45%", left: "8%", width: "27%", height: "28%", border: `1px solid ${accentColor}`, opacity: 0.05 }}
      />
      <div
        className="absolute"
        style={{ top: "45%", left: "40%", width: "27%", height: "28%", border: `1px solid ${accentColor}`, opacity: 0.04 }}
      />
      <div
        className="absolute"
        style={{ top: "45%", left: "72%", width: "20%", height: "28%", border: `1px solid ${accentColor}`, opacity: 0.03 }}
      />
    </div>
  );
}
