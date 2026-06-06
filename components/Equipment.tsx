"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Equipment() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.span
          className="label-gold block mb-3"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          04 — Equipment
        </motion.span>
        <motion.h2
          className="font-serif mb-16"
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
          Studio Setup
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: gi * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Category header */}
              <div
                className="flex items-center gap-3 mb-5 pb-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div
                  className="w-1 h-4 flex-shrink-0"
                  style={{ backgroundColor: "var(--gold)" }}
                />
                <span className="label-caps" style={{ color: "var(--text-secondary)" }}>
                  {group.category}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.07 + si * 0.04 }}
                    className="px-3 py-1.5 transition-colors duration-150"
                    style={{
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      border: "1px solid var(--border-light)",
                      color: "var(--text-secondary)",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold-dim)";
                      e.currentTarget.style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-light)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
