import { useState, useEffect, useCallback } from "react";
import { getTravels } from "../api/client";
import { useAuth } from "../context/AuthContext";
import TravelCard from "../components/TravelCard";
import Spinner from "../components/ui/Spinner";
import Pagination from "../components/ui/Pagination";
import { C } from "../theme";

const TravelsPage = ({ onSelectTravel }) => {
  const { token } = useAuth();
  const [travels, setTravels] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchTravels = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await getTravels(p, token);
      setTravels(data.data);
      setMeta(data.meta);
    } catch (_) {}
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchTravels(page); }, [page, fetchTravels]);

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, ${C.teal} 0%, #0A3D3B 100%)`,
        padding: "56px 32px 48px", textAlign: "center",
      }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", color: C.goldLight, textTransform: "uppercase", margin: "0 0 12px" }}>
          Curated journeys worldwide
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 52, color: C.white, margin: 0, lineHeight: 1.1,
        }}>
          Discover the World
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, maxWidth: 480, margin: "16px auto 0", lineHeight: 1.65 }}>
          Handcrafted travel experiences with carefully planned tours and transparent pricing.
        </p>
      </div>

      {/* Travels grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: 8 }}>
            Explore the world
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, margin: 0, color: C.ink }}>
            Our Travels
          </h2>
          <p style={{ color: C.inkMid, marginTop: 8 }}>
            Discover curated travel experiences from around the globe.
          </p>
        </div>

        {loading ? <Spinner /> : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {travels.length === 0 && (
                <p style={{ color: C.inkLight }}>No public travels available yet.</p>
              )}
              {travels.map((t) => (
                <TravelCard key={t.id} travel={t} onClick={onSelectTravel} />
              ))}
            </div>
            <Pagination meta={meta} onPage={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default TravelsPage;
