import { useState, useCallback } from "react";
import { getTours } from "../api/client";
import { useAuth } from "../context/AuthContext";
import TourCard from "../components/TourCard";
import Spinner from "../components/ui/Spinner";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { C } from "../theme";

const INITIAL_FILTERS = { priceFrom: "", priceTo: "", dateFrom: "", dateTo: "", sortPrice: "" };

const ToursPage = ({ travel, onBack }) => {
  const { token } = useAuth();
  const [tours, setTours] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  const fetchTours = useCallback(async (p = 1, f = appliedFilters) => {
    setLoading(true);
    try {
      const data = await getTours(travel.slug, f, p, token);
      setTours(data.data);
      setMeta(data.meta);
    } catch (_) {}
    setLoading(false);
  }, [travel.slug, token, appliedFilters]);

  // Initial load
  useState(() => { fetchTours(1, INITIAL_FILTERS); });

  const applyFilters = () => {
    setAppliedFilters(filters);
    setPage(1);
    fetchTours(1, filters);
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setPage(1);
    fetchTours(1, INITIAL_FILTERS);
  };

  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px 80px" }}>
      <button
        onClick={onBack}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: C.gold, fontSize: 14, fontWeight: 600,
          padding: "0 0 20px", display: "flex", alignItems: "center", gap: 6,
          fontFamily: "'Crimson Pro', Georgia, serif",
        }}
      >
        ← Retour aux voyages
      </button>

      {/* Travel header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: 6 }}>
          {travel.number_of_days} jours · {travel.number_of_nights} nuits
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, margin: 0, color: C.ink }}>
          {travel.name}
        </h2>
        {travel.description && (
          <p style={{ color: C.inkMid, marginTop: 8, maxWidth: 600, lineHeight: 1.65 }}>
            {travel.description}
          </p>
        )}
      </div>

      {/* Filter bar */}
      <div style={{ background: C.sand, borderRadius: 10, padding: "20px 24px", marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.inkMid, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
          Filtrer les circuits
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          <Input label="Prix de (€)" type="number" value={filters.priceFrom} onChange={setFilter("priceFrom")} />
          <Input label="Prix à (€)" type="number" value={filters.priceTo} onChange={setFilter("priceTo")} />
          <Input label="Date de début" type="date" value={filters.dateFrom} onChange={setFilter("dateFrom")} />
          <Input label="Date de fin" type="date" value={filters.dateTo} onChange={setFilter("dateTo")} />
          <Select label="Trier par prix" value={filters.sortPrice} onChange={setFilter("sortPrice")}>
            <option value="">Par défaut</option>
            <option value="asc">Prix ↑</option>
            <option value="desc">Prix ↓</option>
          </Select>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Button onClick={applyFilters} size="sm">Appliquer les filtres</Button>
          <Button onClick={resetFilters} variant="outline" size="sm">Réinitialiser</Button>
        </div>
      </div>

      {/* Tours list */}
      {loading ? <Spinner /> : (
        <>
          {tours.length === 0 && (
            <p style={{ color: C.inkLight, textAlign: "center", padding: "40px 0" }}>
              Aucun circuit ne correspond à vos filtres.
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
          </div>
          <Pagination meta={meta} onPage={(p) => { setPage(p); fetchTours(p); }} />
        </>
      )}
    </div>
  );
};

export default ToursPage;
