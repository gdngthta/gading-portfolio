"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";

const statusColor: Record<Project["status"], string> = {
  "Active Development": "#D4AF37",
  "In Development":    "#C9C1B3",
  "Prototype":         "#9A9185",
};

// Per-project sleeve palette (bg + accent independent of modal accentColor)
const sleevePalettes = [
  { bg: "#1a1510", accent: "#c4a84f" }, // CourseFlow — warm gold
  { bg: "#0e1510", accent: "#4f8a5e" }, // Satori Rattan — deep green
  { bg: "#150e1a", accent: "#8a5e9a" }, // BudgetBite — muted purple
];

const SLEEVE = 160; // px
const VINYL  = 152; // px diameter
const VINYL_LEFT = 60; // px from container left → ~52px visible past sleeve right edge (160+152-60=52)
const CONTAINER_W = 260; // accommodates sleeve + max hover peek

interface DiscographyProps {
  onOpenProject: (id: string) => void;
}

export default function Discography({ onOpenProject }: DiscographyProps) {
  return (
    <section id="discography" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <motion.span
            className="label-gold block mb-3"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            02 — Discography
          </motion.span>
          <motion.h2
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--text-primary)",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Selected Releases
          </motion.h2>
        </div>

        <hr className="rule-gold mb-0" />

        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onOpen={() => onOpenProject(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 cursor-pointer"
        style={{ borderBottom: "1px solid var(--border)" }}
        aria-label={`Open ${project.title} case study`}
      >
        {/* Catalog + year */}
        <div className="flex-shrink-0 w-20 hidden md:block">
          <div className="label-caps mb-1" style={{ fontSize: "0.55rem" }}>
            {project.catalogNumber}
          </div>
          <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            {project.year}
          </div>
        </div>

        {/* Album sleeve + vinyl */}
        <div className="flex-shrink-0">
          <AlbumArt
            title={project.title}
            index={index}
            coverInitial={project.coverInitial}
            hovered={hovered}
            platform={project.platform}
            catalogNumber={project.catalogNumber}
          />
        </div>

        {/* Project info */}
        <div className="flex-1 min-w-0">
          <div className="md:hidden label-caps mb-2" style={{ fontSize: "0.55rem" }}>
            {project.catalogNumber} · {project.year}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ backgroundColor: statusColor[project.status] }}
            />
            <span className="label-caps" style={{ fontSize: "0.55rem", color: statusColor[project.status] }}>
              {project.status}
            </span>
          </div>

          <h3
            className="font-serif mb-3 group-hover:text-[var(--gold)] transition-colors duration-200"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "52ch",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="label-caps px-2.5 py-1"
                style={{
                  fontSize: "0.62rem",
                  border: "1px solid var(--border-light)",
                  color: "var(--text-muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tracklist — large desktop only */}
        <div className="flex-shrink-0 hidden lg:flex flex-col w-40">
          <div className="label-caps mb-3" style={{ fontSize: "0.55rem" }}>
            Tracklist
          </div>
          <ol className="space-y-2 flex-1">
            {project.tracks.slice(0, 5).map((track) => (
              <li key={track.number} className="flex items-baseline gap-2.5">
                <span className="font-mono flex-shrink-0" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                  {track.number}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  {track.title}
                </span>
              </li>
            ))}
            {project.tracks.length > 5 && (
              <li className="label-caps" style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>
                + {project.tracks.length - 5} more tracks
              </li>
            )}
          </ol>

          <div
            className="mt-4 pt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="label-caps" style={{ fontSize: "0.55rem", color: "var(--gold)" }}>
              Open Album
            </span>
            <ArrowUpRight size={11} style={{ color: "var(--gold)" }} />
          </div>
        </div>

        {/* Mobile open cue */}
        <div className="lg:hidden self-end">
          <div className="flex items-center gap-1.5" style={{ color: "var(--gold)", opacity: 0.7 }}>
            <span className="label-caps" style={{ fontSize: "0.55rem" }}>Open</span>
            <ArrowUpRight size={11} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function AlbumArt({
  title,
  index,
  coverInitial,
  hovered,
  platform,
  catalogNumber,
}: {
  title: string;
  index: number;
  coverInitial: string;
  hovered: boolean;
  platform: Project["platform"];
  catalogNumber: string;
}) {
  const palette = sleevePalettes[index % sleevePalettes.length];
  const reducedMotion = !!useReducedMotion();
  const isMobile = platform === "mobile";

  return (
    // Container: wide enough for sleeve + max hover peek of vinyl
    <div
      className="relative flex-shrink-0"
      style={{ width: CONTAINER_W, height: SLEEVE }}
    >
      {/* Vinyl record — sits behind sleeve, peeks from the right */}
      <motion.div
        className="absolute"
        style={{
          width: VINYL,
          height: VINYL,
          top: "50%",
          left: VINYL_LEFT,
          borderRadius: "50%",
          backgroundColor: "#050403",
          zIndex: 1,
          translateY: "-50%",
          boxShadow: "0 6px 32px rgba(0,0,0,0.7)",
        }}
        animate={{
          x: !reducedMotion && hovered ? 32 : 0,
          rotate: !reducedMotion && hovered ? 20 : 0,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <VinylDisc accentColor={palette.accent} label={coverInitial} />
      </motion.div>

      {/* Album sleeve — lifts subtly on hover */}
      <motion.div
        className="absolute left-0 top-0 overflow-hidden"
        style={{
          width: SLEEVE,
          height: SLEEVE,
          zIndex: 10,
          backgroundColor: palette.bg,
          border: `1px solid ${hovered ? palette.accent + "55" : "var(--border)"}`,
          transition: "border-color 0.35s ease",
        }}
        animate={{
          y: !reducedMotion && hovered ? -3 : 0,
          boxShadow: hovered
            ? `0 14px 32px rgba(0,0,0,0.6), 0 0 0 1px ${palette.accent}18`
            : "0 2px 8px rgba(0,0,0,0.25)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Subtle horizontal stripe lines */}
        {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{ top: `${pos * 100}%`, height: "1px", backgroundColor: palette.accent, opacity: 0.06 }}
          />
        ))}

        {/* Top-left corner bracket */}
        <div
          className="absolute"
          style={{
            top: 10, left: 10, width: 14, height: 14,
            borderTop: `1px solid ${palette.accent}`,
            borderLeft: `1px solid ${palette.accent}`,
            opacity: hovered ? 0.65 : 0.3,
            transition: "opacity 0.35s ease",
          }}
        />
        {/* Bottom-right corner bracket */}
        <div
          className="absolute"
          style={{
            bottom: 10, right: 10, width: 14, height: 14,
            borderBottom: `1px solid ${palette.accent}`,
            borderRight: `1px solid ${palette.accent}`,
            opacity: hovered ? 0.65 : 0.3,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* Label — top (GTW RECORDS + MOBILE badge for mobile projects) */}
        <div
          className="absolute flex items-center justify-between"
          style={{ top: 12, left: 14, right: 14 }}
        >
          <span
            className="label-caps"
            style={{ fontSize: "0.42rem", color: palette.accent, opacity: 0.5, letterSpacing: "0.15em" }}
          >
            GTW RECORDS
          </span>
          {isMobile && (
            <span
              className="label-caps"
              style={{ fontSize: "0.38rem", color: palette.accent, opacity: 0.45, letterSpacing: "0.12em" }}
            >
              MOBILE
            </span>
          )}
        </div>

        {/* Center — phone mockup for mobile, large italic initial for web */}
        {isMobile ? (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Phone outline */}
            <div
              style={{
                position: "relative",
                width: 46,
                height: 82,
                border: `1.5px solid ${palette.accent}`,
                borderRadius: 9,
                opacity: hovered ? 0.52 : 0.28,
                transition: "opacity 0.35s ease",
              }}
            >
              {/* Camera pill */}
              <div
                style={{
                  position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)",
                  width: 8, height: 2, borderRadius: 1,
                  backgroundColor: palette.accent, opacity: 0.8,
                }}
              />
              {/* Screen suggestion lines */}
              {[14, 22, 30, 38, 46, 54, 62].map((topPx) => (
                <div
                  key={topPx}
                  style={{
                    position: "absolute", top: topPx, left: 5, right: 5,
                    height: 1, backgroundColor: palette.accent, opacity: 0.28,
                  }}
                />
              ))}
              {/* Home bar */}
              <div
                style={{
                  position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
                  width: 14, height: 2, borderRadius: 1,
                  backgroundColor: palette.accent, opacity: 0.7,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif select-none"
              style={{
                fontSize: "5rem",
                fontWeight: 300,
                fontStyle: "italic",
                color: palette.accent,
                opacity: hovered ? 0.6 : 0.38,
                lineHeight: 1,
                transition: "opacity 0.35s ease",
              }}
            >
              {coverInitial}
            </span>
          </div>
        )}

        {/* Title strip — bottom (mobile shows PROTOTYPE + catalog number) */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-1.5"
          style={{ borderTop: `1px solid ${palette.accent}22` }}
        >
          <div
            className="label-caps truncate"
            style={{ fontSize: "0.4rem", color: palette.accent, opacity: 0.45, letterSpacing: "0.12em" }}
          >
            {title}
          </div>
          {isMobile && (
            <div
              className="label-caps"
              style={{ fontSize: "0.35rem", color: palette.accent, opacity: 0.3, letterSpacing: "0.1em", marginTop: 1 }}
            >
              PROTOTYPE · {catalogNumber}
            </div>
          )}
        </div>

        {/* Inner shadow on right edge — creates sleeve depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset -4px 0 10px rgba(0,0,0,0.35)" }}
        />
      </motion.div>

      {/* Stacked sleeve shadow (decorative second sleeve edge) */}
      <div
        className="absolute"
        style={{
          top: 3, left: 3, width: SLEEVE, height: SLEEVE,
          zIndex: 0,
          border: `1px solid ${palette.accent}18`,
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}

function VinylDisc({ accentColor, label }: { accentColor: string; label: string }) {
  const rings = [46, 41, 36, 31, 26, 21, 16];
  const gradId = `vGrad-${label.replace(/\s/g, "")}`;
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Main disc — warm mid-dark, clearly above page bg (#0d0c0b) */}
      <circle cx="50" cy="50" r="50" fill="#1c1712" />
      {/* Subtle radial gradient — lighter centre to darker edge */}
      <circle cx="50" cy="50" r="50" fill={`url(#${gradId})`} />
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a2218" stopOpacity="0.5" />
          <stop offset="80%" stopColor="#0d0b08" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#060503" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      {/* Outer rim — accent-tinted highlight ring for silhouette */}
      <circle cx="50" cy="50" r="49.4" fill="none" stroke={accentColor} strokeWidth="0.8" opacity={0.28} />
      <circle cx="50" cy="50" r="48" fill="none" stroke={accentColor} strokeWidth="0.4" opacity={0.12} />
      {/* Groove rings */}
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="50" cy="50" r={r}
          fill="none"
          stroke={accentColor}
          strokeWidth="0.5"
          opacity={Math.max(0.04, 0.22 - i * 0.022)}
        />
      ))}
      {/* Subtle light streak (top-left highlight) */}
      <ellipse cx="34" cy="28" rx="10" ry="5" fill={accentColor} opacity={0.025} transform="rotate(-35 34 28)" />
      {/* Center label background */}
      <circle cx="50" cy="50" r="13.5" fill="#0d0b09" />
      <circle cx="50" cy="50" r="13" fill="none" stroke={accentColor} strokeWidth="0.8" opacity={0.42} />
      {/* Label initial */}
      <text
        x="50" y="54.5"
        textAnchor="middle"
        fontSize={label.length > 1 ? "7" : "9"}
        fill={accentColor}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        opacity={0.9}
      >
        {label}
      </text>
      {/* Spindle hole */}
      <circle cx="50" cy="50" r="2.2" fill="#000" />
    </svg>
  );
}
