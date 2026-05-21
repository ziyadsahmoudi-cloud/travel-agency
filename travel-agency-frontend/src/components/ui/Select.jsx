import { C } from "../../theme";

const Select = ({ label, children, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {label && (
      <label style={{
        fontSize: 12, fontWeight: 600, color: C.inkMid,
        letterSpacing: "0.05em", textTransform: "uppercase",
      }}>
        {label}
      </label>
    )}
    <select
      {...props}
      style={{
        fontFamily: "'Crimson Pro', Georgia, serif",
        fontSize: 15, color: C.ink,
        background: C.white,
        border: `1.5px solid ${C.sandDark}`,
        borderRadius: 6, padding: "9px 13px",
        outline: "none", width: "100%",
      }}
    >
      {children}
    </select>
  </div>
);

export default Select;
