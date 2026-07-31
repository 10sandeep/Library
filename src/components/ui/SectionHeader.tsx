interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false,
  centered = true,
}: Props) {
  const accent     = "#ff9f08";
  const titleColor = dark ? "#ffffff" : "#1a1a1a";
  const eyeColor   = dark ? "rgba(255,159,8,0.95)" : "#730068";
  const descColor  = dark ? "rgba(255,255,255,0.65)" : "#555555";

  return (
    <div style={{ marginBottom: 48, textAlign: centered ? "center" : "left" }}>
      {/* Eyebrow */}
      {eyebrow && (
        <div
          className="flex items-center gap-3"
          style={{ justifyContent: centered ? "center" : "flex-start", marginBottom: 16 }}
        >
          <span
            aria-hidden="true"
            style={{ display: "inline-block", width: 32, height: 1.5, background: accent, flexShrink: 0 }}
          />
          <span
            style={{
              color: eyeColor,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase" as const,
            }}
          >
            {eyebrow}
          </span>
          <span
            aria-hidden="true"
            style={{ display: "inline-block", width: 32, height: 1.5, background: accent, flexShrink: 0 }}
          />
        </div>
      )}

      {/* Title */}
      <h2
        style={{
          color: titleColor,
          fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: "-0.4px",
          margin: 0,
        }}
      >
        {title}
      </h2>

      {/* Orange accent bar */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          justifyContent: centered ? "center" : "flex-start",
          marginTop: 16,
        }}
      >
        <span
          style={{
            display: "block",
            width: 56,
            height: 3,
            background: accent,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Description */}
      {description && (
        <p
          style={{
            color: descColor,
            fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
            lineHeight: 1.8,
            maxWidth: "48rem",
            marginTop: 16,
            marginLeft: centered ? "auto" : 0,
            marginRight: centered ? "auto" : 0,
            marginBottom: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
