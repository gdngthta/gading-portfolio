"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { Project, Track } from "@/lib/data";
import VinylRecord from "./VinylRecord";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

/* ── Status colours ─────────────────────────────────────── */
const statusColor: Record<Project["status"], string> = {
  "Active Development": "#D4AF37",
  "In Development":    "#C9C1B3",
  "Prototype":         "#9A9185",
};

/* ── Props ──────────────────────────────────────────────── */
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/* ── Modal root ─────────────────────────────────────────── */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection]     = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReduced = !!useReducedMotion();

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Focus panel on open */
  useEffect(() => { panelRef.current?.focus(); }, []);

  /* Preload all track images so switching is instant */
  useEffect(() => {
    project.tracks.forEach((track) => {
      if (track.image) {
        const img = new Image();
        img.src = track.image;
      }
    });
  }, [project.tracks]);

  const tracks = project.tracks;
  const activeTrack = tracks[activeIndex];
  const isMobileApp = project.platform === "mobile";

  function goTo(index: number) {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < tracks.length - 1;

  return (
    <motion.div
      ref={panelRef}
      tabIndex={-1}
      className="fixed inset-0 flex flex-col outline-none"
      style={{ backgroundColor: "var(--bg-base)", zIndex: 80 }}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 10, scale: prefersReduced ? 1 : 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: prefersReduced ? 0 : 6, scale: prefersReduced ? 1 : 0.99 }}
      transition={{ duration: prefersReduced ? 0.15 : 0.3, ease: "easeOut" }}
    >
      {/* ── Header ───────────────────────────────────────── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5 md:px-8 h-14"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 transition-colors duration-150"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label="Back to Discography"
        >
          <ArrowLeft size={13} />
          <span className="label-caps hidden sm:inline" style={{ fontSize: "0.6rem" }}>
            Back to Discography
          </span>
        </button>

        <div className="hidden md:flex items-center gap-2">
          <span className="font-mono" style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>
            {project.catalogNumber}
          </span>
          <span style={{ color: "var(--border-light)" }}>·</span>
          <span className="font-serif" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400 }}>
            {project.title}
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 transition-colors duration-150"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--text-muted)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
          aria-label="Close album case study"
        >
          <X size={13} />
        </button>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* ── LEFT SLEEVE — desktop only ────────────────── */}
        <motion.aside
          className="hidden md:flex flex-col flex-shrink-0 overflow-y-auto"
          style={{
            width: "220px",
            borderRight: "1px solid var(--border)",
            backgroundColor: "var(--bg-surface)",
          }}
          initial={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReduced ? 0.2 : 0.4, delay: prefersReduced ? 0 : 0.1, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4 p-5">
            {/* Catalog + status */}
            <div>
              <div className="font-mono mb-2" style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>
                {project.catalogNumber}
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: statusColor[project.status] }}
                />
                <span className="label-caps" style={{ fontSize: "0.55rem", color: statusColor[project.status] }}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project title */}
            <h2
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", fontWeight: 300, color: "var(--text-primary)" }}
            >
              {project.title}
            </h2>

            {/* Vinyl */}
            <div className="flex justify-center py-1">
              <VinylRecord size={110} label={project.coverInitial} className="vinyl-spin-slow" />
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.7, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="label-caps px-2 py-1" style={{ fontSize: "0.5rem", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Metadata */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.875rem" }}>
              <div className="label-caps" style={{ fontSize: "0.52rem" }}>
                {project.year} · {project.tracks.length} Tracks · {project.platform === "mobile" ? "Mobile App" : "Web App"}
              </div>
            </div>

            {/* Action links */}
            <div className="flex flex-col gap-2" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.875rem" }}>
              <div className="label-caps mb-1" style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>Links</div>
              <ActionLink href={project.liveDemoUrl} label="Live Demo" accentColor={project.accentColor} />
              <ActionLink href={project.githubUrl} label="GitHub" accentColor={project.accentColor} />
              <ActionLink href={project.caseStudyUrl} label="Case Study / Docs" accentColor={project.accentColor} />
            </div>
          </div>
        </motion.aside>

        {/* ── RIGHT CONTENT ─────────────────────────────── */}
        <div className="flex-1 overflow-y-auto min-w-0">
          <div className="p-5 md:p-6 max-w-5xl mx-auto">

            {/* Mobile project header */}
            <div
              className="md:hidden flex items-start justify-between mb-5 pb-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div>
                <div className="font-mono mb-1" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                  {project.catalogNumber}
                </div>
                <div className="font-serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "var(--text-primary)" }}>
                  {project.title}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: statusColor[project.status] }} />
                <span className="label-caps" style={{ fontSize: "0.52rem", color: statusColor[project.status] }}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Mobile action links */}
            <div className="md:hidden flex flex-wrap gap-2 mb-5 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
              <ActionLinkCompact href={project.liveDemoUrl} label="Live Demo" accentColor={project.accentColor} />
              <ActionLinkCompact href={project.githubUrl} label="GitHub" accentColor={project.accentColor} />
              <ActionLinkCompact href={project.caseStudyUrl} label="Case Study" accentColor={project.accentColor} />
            </div>

            {/* ══════════════════════════════════════════════════
                MAIN CONTENT — branches on project platform
            ══════════════════════════════════════════════════ */}

            {isMobileApp ? (
              /* ── MOBILE APP layout ────────────────────────
                 Left: phone stage (album sleeve style)
                 Right: track info + tracklist
              ──────────────────────────────────────────────── */
              <MobileAppContent
                project={project}
                tracks={tracks}
                activeTrack={activeTrack}
                activeIndex={activeIndex}
                direction={direction}
                prefersReduced={prefersReduced}
                goTo={goTo}
                canPrev={canPrev}
                canNext={canNext}
              />
            ) : (
              /* ── WEB/DESKTOP layout ───────────────────────
                 Wide screenshot + track info grid below
              ──────────────────────────────────────────────── */
              <>
                {/* Screenshot */}
                <div className="mb-6 md:mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: prefersReduced ? 0 : direction > 0 ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: prefersReduced ? 0 : direction > 0 ? -20 : 20 }}
                      transition={{ duration: prefersReduced ? 0.15 : 0.28, ease: "easeOut" }}
                      style={{ height: "clamp(180px, 45vh, 400px)", overflow: "hidden" }}
                    >
                      <ScreenshotPlaceholder
                        trackNumber={activeTrack.number}
                        trackTitle={activeTrack.title}
                        projectTitle={project.title}
                        accentColor={project.accentColor}
                        platform={project.platform}
                        screenshotFormat={activeTrack.screenshotFormat}
                        image={activeTrack.image}
                        alt={activeTrack.alt}
                        caption={activeTrack.caption}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Track info + Tracklist */}
                <div className="grid lg:grid-cols-[1fr_220px] gap-8 lg:gap-12">

                  {/* Active track info */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`info-${activeIndex}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                          Track {activeTrack.number}
                        </span>
                        <span style={{ color: "var(--border-light)", fontSize: "0.6rem" }}>—</span>
                        <span className="label-caps" style={{ fontSize: "0.55rem", color: project.accentColor, opacity: 0.8 }}>
                          {activeTrack.subtitle}
                        </span>
                      </div>
                      <h3 className="font-serif mb-4" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15 }}>
                        {activeTrack.title}
                      </h3>
                      <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "54ch", fontFamily: "var(--font-sans), system-ui, sans-serif", fontWeight: 400 }}>
                        {activeTrack.description}
                      </p>
                      {activeTrack.notes && (
                        <div className="mt-4 pl-4" style={{ borderLeft: `2px solid ${project.accentColor}`, opacity: 0.8 }}>
                          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.65, fontFamily: "var(--font-sans), system-ui, sans-serif", fontStyle: "italic" }}>
                            {activeTrack.notes}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Tracklist + prev/next */}
                  <div>
                    <div className="label-caps mb-3" style={{ fontSize: "0.55rem", color: "var(--text-muted)" }}>
                      Tracklist
                    </div>
                    <ol className="space-y-0.5">
                      {tracks.map((track, i) => (
                        <TrackItem
                          key={track.number}
                          track={track}
                          isActive={i === activeIndex}
                          accentColor={project.accentColor}
                          onClick={() => goTo(i)}
                        />
                      ))}
                    </ol>
                    <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                      <button
                        onClick={() => canPrev && goTo(activeIndex - 1)}
                        disabled={!canPrev}
                        className="flex items-center gap-1.5 transition-colors duration-150"
                        style={{ color: canPrev ? "var(--text-secondary)" : "var(--text-muted)", opacity: canPrev ? 1 : 0.4, cursor: canPrev ? "pointer" : "not-allowed" }}
                        onMouseEnter={(e) => canPrev && (e.currentTarget.style.color = "var(--text-primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                        aria-label="Previous track"
                      >
                        <ChevronLeft size={13} />
                        <span className="label-caps" style={{ fontSize: "0.55rem" }}>Prev</span>
                      </button>
                      <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                        {String(activeIndex + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => canNext && goTo(activeIndex + 1)}
                        disabled={!canNext}
                        className="flex items-center gap-1.5 transition-colors duration-150"
                        style={{ color: canNext ? "var(--text-secondary)" : "var(--text-muted)", opacity: canNext ? 1 : 0.4, cursor: canNext ? "pointer" : "not-allowed" }}
                        onMouseEnter={(e) => canNext && (e.currentTarget.style.color = "var(--text-primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                        aria-label="Next track"
                      >
                        <span className="label-caps" style={{ fontSize: "0.55rem" }}>Next</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>

                    {/* Mobile tags */}
                    <div className="md:hidden mt-6 pt-5 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid var(--border)" }}>
                      {project.tags.map((tag) => (
                        <span key={tag} className="label-caps px-2 py-1" style={{ fontSize: "0.5rem", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Case Study Notes ─────────────────────────── */}
            <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="label-gold mb-6" style={{ fontSize: "0.55rem" }}>
                Case Study Notes
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-7">
                <div>
                  <div className="label-caps mb-2" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>Problem</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                    {project.problem}
                  </p>
                </div>
                <div>
                  <div className="label-caps mb-2" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>Solution</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="mb-7">
                <div className="label-caps mb-2" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>My Role</div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  {project.myRole}
                </p>
              </div>

              <div className="mb-7">
                <div className="label-caps mb-3" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>Key Features</div>
                <div className="flex flex-wrap gap-2">
                  {project.keyFeatures.map((f) => (
                    <span key={f} className="label-caps px-2.5 py-1" style={{ fontSize: "0.55rem", border: `1px solid ${project.accentColor}35`, color: "var(--text-secondary)" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="label-caps mb-2" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>Current Status</div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.7, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                    {project.currentStatus}
                  </p>
                  {project.statusNote && (
                    <p className="mt-2 pl-3" style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.6, fontStyle: "italic", borderLeft: `2px solid ${project.accentColor}50`, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                      {project.statusNote}
                    </p>
                  )}
                </div>
                <div>
                  <div className="label-caps mb-2" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>Next Improvements</div>
                  <ul className="space-y-1.5">
                    {project.nextImprovements.map((item) => (
                      <li key={item} className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                        <span style={{ color: project.accentColor, opacity: 0.6, flexShrink: 0, marginTop: "0.1em" }}>—</span>
                        <span style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MOBILE APP LAYOUT COMPONENTS
   Used when project.platform === "mobile"
══════════════════════════════════════════════════════════════ */

interface MobileAppContentProps {
  project: Project;
  tracks: Track[];
  activeTrack: Track;
  activeIndex: number;
  direction: number;
  prefersReduced: boolean;
  goTo: (i: number) => void;
  canPrev: boolean;
  canNext: boolean;
}

function MobileAppContent({
  project,
  tracks,
  activeTrack,
  activeIndex,
  direction,
  prefersReduced,
  goTo,
  canPrev,
  canNext,
}: MobileAppContentProps) {
  const ac = project.accentColor;

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-5 md:gap-6">

      {/* ── Phone stage ─────────────────────────────────── */}
      <div className="flex justify-center md:justify-start md:flex-shrink-0">
        <MobileAlbumStage
          project={project}
          activeTrack={activeTrack}
          activeIndex={activeIndex}
          direction={direction}
          prefersReduced={prefersReduced}
        />
      </div>

      {/* ── Track panel ─────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Active track info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mtrack-${activeIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                Track {activeTrack.number}
              </span>
              <span style={{ color: "var(--border-light)", fontSize: "0.6rem" }}>—</span>
              <span className="label-caps" style={{ fontSize: "0.52rem", color: ac, opacity: 0.8 }}>
                {activeTrack.subtitle}
              </span>
            </div>

            <h3
              className="font-serif mb-3"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15 }}
            >
              {activeTrack.title}
            </h3>

            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
              {activeTrack.description}
            </p>

            {activeTrack.notes && (
              <div className="mt-3 pl-3" style={{ borderLeft: `2px solid ${ac}50`, marginTop: "0.75rem" }}>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.6, fontStyle: "italic", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  {activeTrack.notes}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tracklist */}
        <div className="mt-5 pt-4 flex-1" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="label-caps mb-3" style={{ fontSize: "0.52rem", color: "var(--text-muted)" }}>
            Tracklist
          </div>
          <ol className="space-y-0.5">
            {tracks.map((track, i) => (
              <TrackItem
                key={track.number}
                track={track}
                isActive={i === activeIndex}
                accentColor={ac}
                onClick={() => goTo(i)}
              />
            ))}
          </ol>

          {/* Prev / Next */}
          <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => canPrev && goTo(activeIndex - 1)}
              disabled={!canPrev}
              className="flex items-center gap-1.5 transition-colors duration-150"
              style={{ color: canPrev ? "var(--text-secondary)" : "var(--text-muted)", opacity: canPrev ? 1 : 0.4, cursor: canPrev ? "pointer" : "not-allowed" }}
              onMouseEnter={(e) => canPrev && (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              aria-label="Previous track"
            >
              <ChevronLeft size={13} />
              <span className="label-caps" style={{ fontSize: "0.55rem" }}>Prev</span>
            </button>

            <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
            </span>

            <button
              onClick={() => canNext && goTo(activeIndex + 1)}
              disabled={!canNext}
              className="flex items-center gap-1.5 transition-colors duration-150"
              style={{ color: canNext ? "var(--text-secondary)" : "var(--text-muted)", opacity: canNext ? 1 : 0.4, cursor: canNext ? "pointer" : "not-allowed" }}
              onMouseEnter={(e) => canNext && (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              aria-label="Next track"
            >
              <span className="label-caps" style={{ fontSize: "0.55rem" }}>Next</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Mobile tags (mobile viewport only) */}
          <div className="md:hidden mt-5 pt-4 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid var(--border)" }}>
            {project.tags.map((tag) => (
              <span key={tag} className="label-caps px-2 py-1" style={{ fontSize: "0.5rem", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Album stage: phone mockup with decorations ─────────── */
function MobileAlbumStage({
  project,
  activeTrack,
  activeIndex,
  prefersReduced,
}: {
  project: Project;
  activeTrack: Track;
  activeIndex: number;
  direction?: number;
  prefersReduced: boolean;
}) {
  const ac = project.accentColor;
  // Phone physical dimensions
  const PHONE_W = 200; // px — width of phone inside stage
  // Height derived from 9:19.5 ratio ≈ 433px — we set via aspectRatio in CSS

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        width: 272,
        minHeight: 480,
        backgroundColor: "#080706",
        border: `1px solid ${ac}22`,
        flexShrink: 0,
      }}
    >
      {/* ── Corner brackets ──────────────────────────── */}
      <div className="absolute" style={{ top: 10, left: 10, width: 14, height: 14, borderTop: `1px solid ${ac}`, borderLeft: `1px solid ${ac}`, opacity: 0.3 }} />
      <div className="absolute" style={{ bottom: 10, right: 10, width: 14, height: 14, borderBottom: `1px solid ${ac}`, borderRight: `1px solid ${ac}`, opacity: 0.3 }} />

      {/* ── Top label row ─────────────────────────────── */}
      <div className="absolute flex items-center justify-between" style={{ top: 13, left: 14, right: 14 }}>
        <span className="label-caps" style={{ fontSize: "0.38rem", color: ac, opacity: 0.42, letterSpacing: "0.14em" }}>
          {project.catalogNumber}
        </span>
        <span className="label-caps" style={{ fontSize: "0.38rem", color: ac, opacity: 0.42, letterSpacing: "0.12em" }}>
          MOBILE APP
        </span>
      </div>

      {/* ── Status sub-label ──────────────────────────── */}
      <div className="absolute" style={{ top: "1.65rem", left: 14 }}>
        <span className="label-caps" style={{ fontSize: "0.34rem", color: ac, opacity: 0.26, letterSpacing: "0.1em" }}>
          {project.status.toUpperCase()}
        </span>
      </div>

      {/* ── Faint background UI grid lines ────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[0.22, 0.32, 0.72, 0.82].map((p, i) => (
          <div key={i} style={{ position: "absolute", top: `${p * 100}%`, left: "6%", right: "6%", height: 1, backgroundColor: ac, opacity: 0.022 }} />
        ))}
      </div>

      {/* ── Ghost phone (decorative offset duplicate) ─── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: PHONE_W + 14,
          aspectRatio: "9/19.5",
          border: `1px solid ${ac}`,
          borderRadius: 20,
          opacity: 0.055,
          transform: "translate(13px, 9px)",
          pointerEvents: "none",
          flexShrink: 0,
        }}
      />

      {/* ── Main phone ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReduced ? 0 : -6 }}
          transition={{ duration: prefersReduced ? 0.15 : 0.28, ease: "easeOut" }}
          style={{
            position: "relative",
            width: PHONE_W,
            aspectRatio: "9/19.5",
            borderRadius: 18,
            overflow: "hidden",
            border: `1.5px solid ${ac}48`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 0 0 1px ${ac}18`,
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          {activeTrack.image ? (
            <MobilePhoneImage
              src={activeTrack.image}
              alt={activeTrack.alt ?? `${project.title} — ${activeTrack.title}`}
            />
          ) : (
            <MobilePhonePlaceholder track={activeTrack} project={project} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom track indicator ─────────────────────── */}
      <div className="absolute" style={{ bottom: 20, left: 14, right: 14 }}>
        <div className="label-caps" style={{ fontSize: "0.34rem", color: ac, opacity: 0.28, letterSpacing: "0.1em", marginBottom: 2 }}>
          {activeTrack.title}
        </div>
        <div className="font-mono" style={{ fontSize: "0.36rem", color: ac, opacity: 0.38, letterSpacing: "0.08em" }}>
          TRACK {activeTrack.number}
        </div>
      </div>

      {/* ── Vinyl groove decoration (bottom-right) ──────── */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{ bottom: -30, right: -30, width: 90, height: 90, opacity: 0.1 }}
      >
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          {[48, 40, 32, 24, 16].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={ac} strokeWidth="0.9" />
          ))}
          <circle cx="50" cy="50" r="5" fill="none" stroke={ac} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="1.8" fill={ac} />
        </svg>
      </div>
    </div>
  );
}

/* ── Phone image with error fallback ────────────────────── */
function MobilePhoneImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "#0a0908", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="label-caps" style={{ fontSize: "0.4rem", color: "var(--text-muted)", opacity: 0.4 }}>
          Screenshot unavailable
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

/* ── Placeholder inside phone when no image ─────────────── */
function MobilePhonePlaceholder({ track, project }: { track: Track; project: Project }) {
  const ac = project.accentColor;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0908",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "20px 16px",
      }}
    >
      {/* Faint phone screen lines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[20, 28, 36, 44, 52, 60, 68, 76].map((pct) => (
          <div key={pct} style={{ position: "absolute", top: `${pct}%`, left: "8%", right: "8%", height: 1, backgroundColor: ac, opacity: 0.06 }} />
        ))}
      </div>

      {/* Label */}
      <div className="label-caps" style={{ fontSize: "0.38rem", color: ac, opacity: 0.5, textAlign: "center", letterSpacing: "0.12em", position: "relative", zIndex: 1 }}>
        {project.title}
      </div>
      <div
        className="font-serif text-center"
        style={{ fontSize: "0.82rem", fontWeight: 400, color: "var(--text-secondary)", opacity: 0.55, lineHeight: 1.3, position: "relative", zIndex: 1 }}
      >
        {track.title}
      </div>
      <div className="label-caps" style={{ fontSize: "0.32rem", color: ac, opacity: 0.28, marginTop: 4, position: "relative", zIndex: 1 }}>
        Screenshot pending
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
══════════════════════════════════════════════════════════════ */

/* ── Track item in tracklist ────────────────────────────── */
function TrackItem({
  track,
  isActive,
  accentColor,
  onClick,
}: {
  track: Track;
  isActive: boolean;
  accentColor: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="w-full flex items-center gap-2.5 px-2 py-2 text-left transition-colors duration-150"
        style={{
          backgroundColor: isActive ? `${accentColor}10` : "transparent",
          borderLeft: `2px solid ${isActive ? accentColor : "transparent"}`,
        }}
        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; }}
        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
        aria-pressed={isActive}
        aria-label={`Track ${track.number}: ${track.title}`}
      >
        {/* Number / equalizer */}
        <div className="flex-shrink-0 w-5 flex items-center justify-center">
          {isActive ? (
            <div className="flex items-end gap-[2px]" style={{ height: "11px" }} aria-hidden="true">
              {[0, 0.18, 0.08, 0.25].map((delay, i) => (
                <div key={i} className="eq-bar" style={{ backgroundColor: accentColor, animationDelay: `${delay}s` }} />
              ))}
            </div>
          ) : (
            <span className="font-mono" style={{ fontSize: "0.55rem", color: "var(--text-muted)" }}>
              {track.number}
            </span>
          )}
        </div>

        {/* Title */}
        <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-sans), system-ui, sans-serif", fontWeight: isActive ? 500 : 400, color: isActive ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.3 }}>
          {track.title}
        </span>
      </button>
    </li>
  );
}

/* ── Action link — desktop sleeve ───────────────────────── */
function ActionLink({ href, label, accentColor }: { href?: string; label: string; accentColor: string }) {
  const base: React.CSSProperties = {
    fontSize: "0.58rem",
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    letterSpacing: "0.08em",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    border: "1px solid var(--border)",
    transition: "border-color 0.2s, color 0.2s",
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...base, color: accentColor, borderColor: `${accentColor}40` }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${accentColor}40`; }}
        aria-label={`${label} — opens in new tab`}
      >
        {label}
        <ExternalLink size={10} />
      </a>
    );
  }

  return (
    <div style={{ ...base, color: "var(--text-muted)", opacity: 0.45, cursor: "not-allowed" }} aria-label={`${label} — not yet available`} title="Coming soon">
      {label}
      <span style={{ fontSize: "0.5rem", opacity: 0.7 }}>Soon</span>
    </div>
  );
}

/* ── Action link — mobile compact pill ──────────────────── */
function ActionLinkCompact({ href, label, accentColor }: { href?: string; label: string; accentColor: string }) {
  const base: React.CSSProperties = {
    fontSize: "0.55rem",
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    letterSpacing: "0.08em",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "5px 10px",
    border: "1px solid var(--border)",
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...base, color: accentColor, borderColor: `${accentColor}40` }} aria-label={`${label} — opens in new tab`}>
        {label}
        <ExternalLink size={9} />
      </a>
    );
  }

  return (
    <span style={{ ...base, color: "var(--text-muted)", opacity: 0.4, cursor: "not-allowed" }} title="Coming soon">
      {label}
    </span>
  );
}
