import Badge from "./ui/Badge";
import { C } from "../theme";

const TravelCard = ({ travel, onClick }) => (
  <div
    onClick={() => onClick(travel)}
    style={{
      background: C.white,
      border: `1.5px solid ${C.sandDark}`,
      borderRadius: 12, overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.18s, box-shadow 0.18s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = "";
    }}
  >
    <div style={{
      background: `linear-gradient(135deg, ${C.teal} 0%, #0D4A47 100%)`,
      padding: "28px 24px 24px",
    }}>
      <Badge color={C.goldLight} bg="rgba(200,146,26,0.25)">
        {travel.number_of_days}j / {travel.number_of_nights}n
      </Badge>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 22, color: C.white,
        margin: "12px 0 0", lineHeight: 1.2,
      }}>
        {travel.name}
      </h3>
    </div>
    <div style={{ padding: "18px 24px 22px" }}>
      <p style={{ fontSize: 14, color: C.inkMid, lineHeight: 1.65, margin: "0 0 16px" }}>
        {travel.description
          ? travel.description.length > 120
            ? travel.description.slice(0, 120) + "…"
            : travel.description
          : "Aucune description disponible."}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: C.inkLight, fontStyle: "italic" }}>/{travel.slug}</span>
        <span style={{ fontSize: 13, color: C.gold, fontWeight: 600 }}>Voir les circuits →</span>
      </div>
    </div>
  </div>
);

export default TravelCard;
