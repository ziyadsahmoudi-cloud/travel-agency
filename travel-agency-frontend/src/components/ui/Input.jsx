import { C } from "../../theme";

const Input = ({ label, error, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {label && (
      <label style={{
        fontSize: 12, fontWeight: 600, color: C.inkMid,
        letterSpacing: "0.05em", textTransform: "uppercase",
      }}>
        {label}
      </label>
    )}
    <input
      {...props}
      style={{
        fontFamily: "'Crimson Pro', Georgia, serif",
        fontSize: 15, color: C.ink,
        background: C.white,
        border: `1.5px solid ${error ? C.danger : C.sandDark}`,
        borderRadius: 6, padding: "9px 13px",
        outline: "none", width: "100%", boxSizing: "border-box",
      }}
    />
    {error && <span style={{ fontSize: 12, color: C.danger }}>{error}</span>}
  </div>
);

export default Input;
