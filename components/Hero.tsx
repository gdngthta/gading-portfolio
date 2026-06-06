"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import VinylRecord from "./VinylRecord";

const ease = "easeOut" as const;

/** Fade-up entrance helper. Pass reduced=true for a bare opacity-only fade. */
function fadeUp(delay = 0, reduced = false) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.25 : 0.7, delay: reduced ? 0 : delay, ease },
  };
}

const tracks = [
  { num: "01", title: "CourseFlow",        active: true  },
  { num: "02", title: "Satori Rattan Web", active: false },
  { num: "03", title: "BudgetBite",        active: false },
];

export default function Hero() {
  const [photoError, setPhotoError] = useState(false);
  const prefersReduced = !!useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center"
      style={{ paddingTop: "4rem" }}
    >
      {/* Left vertical rule */}
      <div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px hidden md:block"
        style={{ backgroundColor: "var(--border)", opacity: 0.4 }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 w-full py-20 md:py-0">
        <div className="grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-center">

          {/* ── LEFT — text ── */}
          <div className="order-2 md:order-1 flex flex-col justify-center md:py-28">

            <motion.div {...fadeUp(0, prefersReduced)} className="flex items-center gap-3 mb-6">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--gold)" }}
              />
              <span className="label-gold">Now Playing</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1, prefersReduced)}
              className="font-serif leading-[1.05] mb-3"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "var(--text-primary)",
                fontWeight: 300,
              }}
            >
              Gading
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Tahta Widi</em>
            </motion.h1>

            <motion.hr {...fadeUp(0.18, prefersReduced)} className="rule-gold my-5" />

            <motion.p
              {...fadeUp(0.24, prefersReduced)}
              className="mb-3"
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}
            >
              Software Engineering Student · Universiti Malaya
            </motion.p>

            <motion.p
              {...fadeUp(0.3, prefersReduced)}
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: "40ch",
              }}
            >
              Crafting clean interfaces and useful software — frontend, mobile, and
              everything in between. Open for internship opportunities.
            </motion.p>

            <motion.div
              {...fadeUp(0.38, prefersReduced)}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href="#discography"
                className="px-6 py-2.5 transition-all duration-200"
                style={{
                  border: "1px solid var(--gold-dim)",
                  color: "var(--gold)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--gold)";
                  e.currentTarget.style.color = "var(--bg-base)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--gold)";
                }}
              >
                View Discography
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 transition-all duration-200"
                style={{
                  border: "1px solid var(--text-muted)",
                  color: "var(--text-secondary)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--text-primary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                Get in Touch
              </a>
              {/* Resume download — place PDF at public/resume/Gading-Tahta-Widi-Resume.pdf */}
              <a
                href="/resume/Gading-Tahta-Widi-Resume.pdf"
                download
                className="px-6 py-2.5 transition-all duration-200"
                style={{
                  border: "1px solid var(--border-light)",
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--text-secondary)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
                aria-label="Download resume PDF"
              >
                Download CV
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — composed scene ── */}
          <div className="order-1 md:order-2 relative flex flex-col items-center md:items-start gap-3 md:py-28">

            {/* Vinyl disc peeking behind the right edge — desktop only */}
            <motion.div
              className="absolute hidden md:block pointer-events-none"
              style={{ right: "-90px", top: "48px", zIndex: 0 }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 0.45, x: 0 }}
              transition={{ duration: prefersReduced ? 0.3 : 1.2, delay: prefersReduced ? 0 : 0.5, ease }}
            >
              <VinylRecord size={210} spin label="" />
            </motion.div>

            {/* ── Artist / Profile card ── */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20, x: prefersReduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: prefersReduced ? 0.25 : 0.85, delay: prefersReduced ? 0 : 0.12, ease }}
              className="relative w-full"
              style={{
                zIndex: 10,
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
                boxShadow:
                  "0 24px 48px -8px rgba(0,0,0,0.55), " +
                  "8px 8px 0 0 #0f0d0c, " +
                  "8px 8px 0 1px var(--border)",
              }}
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="label-caps" style={{ fontSize: "0.56rem" }}>Portfolio</span>
                <span className="label-caps" style={{ fontSize: "0.56rem" }}>Vol. 01</span>
              </div>

              {/* Photo placeholder — loads from /gading/profile-placeholder.png */}
              <div className="px-3 pt-3">
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "4/5",
                    backgroundColor: "#0f0d0c",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {/* Gold corner brackets */}
                  {(["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r",
                     "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"] as const
                  ).map((cls, i) => (
                    <div
                      key={i}
                      className={`absolute w-4 h-4 ${cls}`}
                      style={{ borderColor: "var(--gold-dim)", zIndex: 2 }}
                    />
                  ))}

                  {/* Artist Profile label */}
                  <div className="absolute top-4 inset-x-0 flex justify-center" style={{ zIndex: 2 }}>
                    <span className="label-caps" style={{ fontSize: "0.5rem", color: "var(--text-muted)", opacity: 0.65 }}>
                      Artist Profile
                    </span>
                  </div>

                  {/* Photo with silhouette fallback */}
                  {!photoError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/gading/profile-placeholder.png"
                      alt="Gading Tahta Widi"
                      onError={() => setPhotoError(true)}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="54" height="66" viewBox="0 0 54 66" style={{ opacity: 0.1 }} aria-hidden="true">
                          <circle cx="27" cy="19" r="15" fill="var(--text-secondary)" />
                          <path d="M2 62 Q2 42 27 42 Q52 42 52 62" fill="var(--text-secondary)" />
                        </svg>
                      </div>
                      <div className="absolute bottom-3 inset-x-0 flex justify-center" style={{ zIndex: 2 }}>
                        <span className="label-caps" style={{ fontSize: "0.44rem", color: "var(--text-muted)", opacity: 0.4 }}>
                          Photo · Coming Soon
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-4 py-3">
                <div
                  className="font-serif mb-0.5"
                  style={{ fontSize: "1.05rem", color: "var(--text-primary)", fontWeight: 500 }}
                >
                  Gading Tahta Widi
                </div>
                <div className="label-caps" style={{ fontSize: "0.5rem" }}>
                  Pressed in 2026
                </div>
              </div>
            </motion.div>

            {/* ── Now Playing panel ── */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0.25 : 0.65, delay: prefersReduced ? 0 : 0.38, ease }}
              className="relative w-full"
              style={{
                zIndex: 10,
                backgroundColor: "var(--bg-raised)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: "var(--gold)" }} />
                  <span className="label-gold" style={{ fontSize: "0.58rem" }}>Now Playing</span>
                </div>
                <div className="flex items-end gap-[3px]" style={{ height: "13px" }} aria-hidden="true">
                  {[0, 0.18, 0.07, 0.28, 0.13].map((d, i) => (
                    <div key={i} className="eq-bar" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              </div>

              {/* Track list */}
              <div className="py-1.5">
                {tracks.map((track) => (
                  <TrackRow key={track.num} {...track} />
                ))}
              </div>
            </motion.div>

            {/* Orange cat — entrance fade + subtle idle float (disabled when reducedMotion) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.75 }}
              className="self-end pr-1"
              style={{ zIndex: 10, marginTop: "-4px" }}
            >
              <motion.div
                animate={!prefersReduced ? { y: [0, -2, 0] } : {}}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  ease: "easeInOut",
                  delay: 2.5,
                }}
              >
                <OrangeCat />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only, hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReduced ? 0 : 1.3, duration: prefersReduced ? 0.3 : 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="label-caps" style={{ fontSize: "0.55rem" }}>Scroll</span>
        <div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, var(--gold-dim), transparent)" }}
        />
      </motion.div>
    </section>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function TrackRow({ num, title, active }: { num: string; title: string; active: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 transition-colors duration-150"
      style={{
        backgroundColor: active ? "rgba(212,175,55,0.055)" : "transparent",
        borderLeft: `2px solid ${active ? "var(--gold)" : "transparent"}`,
      }}
    >
      <span
        className="font-mono flex-shrink-0"
        style={{
          fontSize: "0.6rem",
          minWidth: "1.4rem",
          color: active ? "var(--gold)" : "var(--text-muted)",
          fontWeight: active ? 600 : 400,
        }}
      >
        {active ? "▶" : num}
      </span>
      <span
        style={{
          fontSize: "0.8rem",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontWeight: active ? 500 : 400,
          color: active ? "var(--text-primary)" : "var(--text-secondary)",
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function OrangeCat() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 28 28"
      aria-label="Orange cat mascot"
      style={{ opacity: 0.62 }}
    >
      <ellipse cx="14" cy="18" rx="7" ry="6" fill="#c4742a" />
      <circle cx="14" cy="11" r="6" fill="#c4742a" />
      <polygon points="9,7 7,2 12,6" fill="#c4742a" />
      <polygon points="19,7 21,2 16,6" fill="#c4742a" />
      <polygon points="9.5,6.5 8,3.5 12,6" fill="#e8956a" />
      <polygon points="18.5,6.5 20,3.5 16,6" fill="#e8956a" />
      <ellipse cx="11.5" cy="11" rx="1.2" ry="1.4" fill="#1a1410" />
      <ellipse cx="16.5" cy="11" rx="1.2" ry="1.4" fill="#1a1410" />
      <ellipse cx="14" cy="13" rx="0.8" ry="0.5" fill="#8a4520" />
      <path d="M21,20 Q26,18 25,24 Q24,26 21,24" fill="none" stroke="#c4742a" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="17" x2="11" y2="21" stroke="#a35e1e" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="14" y1="16" x2="14" y2="21" stroke="#a35e1e" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="18" y1="17" x2="17" y2="21" stroke="#a35e1e" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
