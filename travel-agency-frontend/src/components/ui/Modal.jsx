import { C } from "../../theme";

const Modal = ({ title, onClose, children }) => (
  <div
    onClick={(e) => e.target === e.currentTarget && onClose()}
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(26,22,18,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}
  >
    <div style={{
      background: C.white, borderRadius: 12,
      width: "100%", maxWidth: 520,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      maxHeight: "90vh", overflowY: "auto",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 24px 0",
      }}>
        <h3 style={{
          margin: 0,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 22, color: C.ink,
        }}>
          {title}
        </h3>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.inkLight, lineHeight: 1 }}
        >
          ×
        </button>
      </div>
      <div style={{ padding: "20px 24px 24px" }}>{children}</div>
    </div>
  </div>
);

export default Modal;
