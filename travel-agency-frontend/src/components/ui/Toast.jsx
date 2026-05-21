import { useEffect } from "react";
import { C } from "../../theme";

const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9999,
      background: type === "error" ? C.danger : C.teal,
      color: C.white, borderRadius: 8,
      padding: "13px 20px", fontSize: 14, fontWeight: 500,
      boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      display: "flex", alignItems: "center", gap: 10, maxWidth: 360,
    }}>
      <span style={{ flex: 1 }}>{msg}</span>
      <span onClick={onClose} style={{ cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</span>
    </div>
  );
};

export default Toast;
