"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink, ArrowUpRight, GitFork } from "lucide-react";

const links = [
  {
    label: "Email",
    value: "gadingtahta09@gmail.com",
    href: "mailto:gadingtahta09@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/gdngthta",
    href: "https://github.com/gdngthta",
    icon: GitFork,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gadingtahtawidi",
    href: "https://linkedin.com/in/gadingtahtawidi",
    icon: ExternalLink,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
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
          05 — Encore
        </motion.span>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-serif mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Let&apos;s Make{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Something</em>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: "44ch",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontWeight: 400,
              }}
            >
              I&apos;m open to internship opportunities in frontend, mobile, or
              software engineering. If you&apos;re working on something interesting,
              I&apos;d love to hear about it.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="mailto:gadingtahta09@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 transition-all duration-200"
                style={{
                  border: "1px solid var(--gold-dim)",
                  color: "var(--gold)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
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
                Send a Message
                <ArrowUpRight size={13} />
              </a>
              {/* Resume download — place PDF at public/resume/Gading-Tahta-Widi-Resume.pdf */}
              <a
                href="/resume/Gading-Tahta-Widi-Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 transition-all duration-200"
                style={{
                  border: "1px solid var(--border-light)",
                  color: "var(--text-muted)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
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
                aria-label="Download resume as PDF"
              >
                Download CV
                <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* Right — contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
            {links.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-between py-5 group transition-colors duration-150"
                style={{
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <Icon
                    size={15}
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <div>
                    <div className="label-caps mb-1">
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-mono), monospace",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  size={13}
                  style={{ color: "var(--text-muted)", flexShrink: 0 }}
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
