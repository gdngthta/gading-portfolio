import VinylRecord from "./VinylRecord";

export default function Footer() {
  return (
    <footer
      className="py-10 mt-0"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <VinylRecord size={36} label="" />
            <div>
              <div
                className="font-serif"
                style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}
              >
                GTW Records
              </div>
              <div className="label-caps" style={{ fontSize: "0.5rem" }}>
                Gading Tahta Widi · Software Engineering
              </div>
            </div>
          </div>

          {/* Center — catalog */}
          <div className="hidden md:flex items-center gap-6">
            {["GTW-001", "GTW-002", "GTW-003"].map((cat) => (
              <span
                key={cat}
                className="font-mono"
                style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Right */}
          <div
            className="font-mono"
            style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
          >
            © {new Date().getFullYear()} · All Rights Reserved
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            &ldquo;Good software is like good music — you notice the craft only when it&apos;s missing.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
