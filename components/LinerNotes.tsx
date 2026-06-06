"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LinerNotes() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.span
          className="label-gold block mb-12"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          03 — Liner Notes
        </motion.span>

        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-20 items-start">
          {/* Left — photo card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Photo placeholder */}
            <div
              className="relative w-full aspect-[3/4] max-w-[240px] mx-auto md:mx-0"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Corner brackets */}
              {[
                "top-2 left-2 border-t border-l",
                "top-2 right-2 border-t border-r",
                "bottom-2 left-2 border-b border-l",
                "bottom-2 right-2 border-b border-r",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 ${cls}`}
                  style={{ borderColor: "var(--gold-dim)" }}
                />
              ))}

              {/* Profile photo — same source as Hero card */}
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
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    style={{ opacity: 0.2 }}
                    aria-hidden="true"
                  >
                    <circle cx="20" cy="14" r="8" fill="var(--text-secondary)" />
                    <path d="M4 36 Q4 26 20 26 Q36 26 36 36" fill="var(--text-secondary)" />
                  </svg>
                  <span
                    className="label-caps text-center"
                    style={{ fontSize: "0.5rem", color: "var(--text-muted)", maxWidth: "12ch" }}
                  >
                    Photo coming soon
                  </span>
                </div>
              )}
            </div>

            {/* Label info */}
            <div style={{ maxWidth: "240px" }}>
              <div
                className="font-serif mb-0.5"
                style={{ color: "var(--text-primary)", fontSize: "1rem", fontWeight: 500 }}
              >
                Gading Tahta Widi
              </div>
              <div className="label-caps" style={{ fontSize: "0.55rem" }}>
                Software Engineering · Universiti Malaya
              </div>
              <div
                className="font-mono mt-2"
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                Kuala Lumpur, Malaysia
              </div>
            </div>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="font-serif mb-6"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "var(--text-primary)",
                lineHeight: 1.15,
              }}
            >
              About the{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Artist</em>
            </h2>

            <div
              className="space-y-5"
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontWeight: 400,
                maxWidth: "56ch",
              }}
            >
              <p>
                I&apos;m a Computer Science student at Universiti Malaya, specializing in
                Software Engineering, with a focus on building thoughtful, user-centered
                products. My work sits at the intersection of clean UI engineering and
                practical product thinking.
              </p>
              <p>
                I care deeply about how software feels — the small interactions,
                the load states, the moments that make a product feel considered.
                Whether it&apos;s a Kanban board for students or a business site for a
                furniture brand, I try to bring the same attention to detail.
              </p>
              <p>
                Currently seeking internship opportunities in frontend, mobile, or
                software engineering. I learn fast, ship carefully, and collaborate well.
              </p>
            </div>

            {/* Credentials */}
            <div
              className="mt-10 pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {[
                { label: "Degree", value: "B.Sc. Computer Science (Software Engineering)" },
                { label: "University", value: "Universiti Malaya" },
                { label: "Status", value: "Seeking Internship" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="label-caps mb-1.5">
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
