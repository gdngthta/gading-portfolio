interface VinylRecordProps {
  size?: number;
  spin?: boolean;
  label?: string;
  className?: string;
}

export default function VinylRecord({
  size = 240,
  spin = false,
  label = "GTW",
  className = "",
}: VinylRecordProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${spin ? "vinyl-spin" : ""} ${className}`}
      aria-hidden="true"
    >
      {/* Outer black disc */}
      <circle cx={cx} cy={cy} r={r - 1} fill="#0a0908" stroke="#2c2824" strokeWidth="1" />

      {/* Groove rings */}
      {[0.92, 0.85, 0.78, 0.71, 0.64, 0.57, 0.50, 0.44, 0.38].map((ratio, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={(r - 2) * ratio}
          fill="none"
          stroke="#1a1714"
          strokeWidth="0.6"
        />
      ))}

      {/* Subtle sheen ring */}
      <circle cx={cx} cy={cy} r={(r - 2) * 0.96} fill="none" stroke="#2e2a26" strokeWidth="0.4" opacity="0.6" />

      {/* Center label disc */}
      <circle cx={cx} cy={cy} r={r * 0.28} fill="#1c1917" stroke="#3a3530" strokeWidth="1" />

      {/* Label inner ring */}
      <circle cx={cx} cy={cy} r={r * 0.26} fill="none" stroke="#c4a84f" strokeWidth="0.5" opacity="0.5" />

      {/* Label text */}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#c4a84f"
        fontSize={size * 0.065}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="500"
        letterSpacing="0.15em"
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fill="#8a7d6e"
        fontSize={size * 0.04}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="400"
        letterSpacing="0.1em"
      >
        RECORDS
      </text>

      {/* Spindle hole */}
      <circle cx={cx} cy={cy} r={r * 0.025} fill="#0d0c0b" />
    </svg>
  );
}
