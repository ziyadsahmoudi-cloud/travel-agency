import { C } from "../../theme";

const Badge = ({ children, color = C.gold, bg = C.goldPale }) => (
  <span style={{
    fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
    color, background: bg,
    padding: "3px 10px", borderRadius: 100,
    textTransform: "uppercase",
    display: "inline-block",
  }}>
    {children}
  </span>
);

export default Badge;
