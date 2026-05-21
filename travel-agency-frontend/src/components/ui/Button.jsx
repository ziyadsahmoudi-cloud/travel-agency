import { C } from "../../theme";

const sizes = {
  sm: { fontSize: 13, padding: "6px 14px" },
  md: { fontSize: 15, padding: "10px 22px" },
  lg: { fontSize: 17, padding: "13px 30px" },
};

const variants = {
  primary: { background: C.gold, color: C.white, border: "none" },
  outline: { background: "transparent", color: C.ink, border: `1.5px solid ${C.inkMid}` },
  ghost: { background: "transparent", color: C.inkMid, border: "none", padding: 0 },
  danger: { background: C.danger, color: C.white, border: "none" },
  teal: { background: C.teal, color: C.white, border: "none" },
};

const Button = ({ children, onClick, variant = "primary", size = "md", disabled = false, style = {}, fullWidth = false }) => (
  <button
    onClick={disabled ? undefined : onClick}
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "'Crimson Pro', Georgia, serif",
      fontWeight: 600,
      borderRadius: 6,
      transition: "all 0.15s",
      opacity: disabled ? 0.5 : 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      width: fullWidth ? "100%" : undefined,
      ...sizes[size],
      ...variants[variant],
      ...style,
    }}
  >
    {children}
  </button>
);

export default Button;
