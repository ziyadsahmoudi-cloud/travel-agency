import { C } from "../theme";

const TourCard = ({ tour }) => (
  <div style={{
    background: C.white,
    border: `1.5px solid ${C.sandDark}`,
    borderRadius: 10, padding: "18px 24px",
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap", gap: 12,
  }}>
    <div>
      <h4 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 18, margin: "0 0 6px", color: C.ink,
      }}>
        {tour.name}
      </h4>
      <span style={{ fontSize: 13, color: C.inkMid }}>
        📅 {tour.start_date} → {tour.end_date}
      </span>
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 26, fontWeight: 700, color: C.teal,
      }}>
        €{Number(tour.price).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <div style={{ fontSize: 11, color: C.inkLight, marginTop: 2 }}>per person</div>
    </div>
  </div>
);

export default TourCard;
