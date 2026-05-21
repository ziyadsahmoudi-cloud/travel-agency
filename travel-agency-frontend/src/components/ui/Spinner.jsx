import { C } from "../../theme";

const Spinner = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      border: `3px solid ${C.sandDark}`,
      borderTopColor: C.gold,
      animation: "spin 0.8s linear infinite",
    }} />
  </div>
);

export default Spinner;
