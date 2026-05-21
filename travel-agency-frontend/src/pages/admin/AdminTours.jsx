import { useState, useEffect } from "react";
import { getTravels, getTours, createTour } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import TourCard from "../../components/TourCard";
import { C } from "../../theme";

const EMPTY_FORM = { name: "", start_date: "", end_date: "", price: "" };

const AdminTours = ({ toast }) => {
  const { token, isAdmin } = useAuth();
  const [travels, setTravels] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Load all travels for the dropdown (fetch all pages)
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const d = await getTravels(1, token);
        setTravels(d.data);
      } catch (_) {}
    };
    fetchAll();
  }, [token]);

  const fetchTours = async (slug) => {
    if (!slug) return;
    setLoading(true);
    try {
      const d = await getTours(slug, {}, 1, token);
      setTours(d.data);
    } catch (_) {}
    setLoading(false);
  };

  const handleSelectTravel = (e) => {
    const slug = e.target.value;
    setSelectedSlug(slug);
    setTours([]);
    fetchTours(slug);
  };

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async () => {
    if (!selectedSlug) return;
    setSaving(true);
    try {
      await createTour(selectedSlug, { ...form, price: Number(form.price) }, token);
      toast("Tour created successfully!", "success");
      setModal(false);
      setForm(EMPTY_FORM);
      fetchTours(selectedSlug);
    } catch (e) {
      toast(e.message || "Error creating tour.", "error");
    }
    setSaving(false);
  };

  return (
    <div>
      {/* Travel selector + action */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <Select label="Select travel" value={selectedSlug} onChange={handleSelectTravel}>
            <option value="">— Choose a travel —</option>
            {travels.map((t) => (
              <option key={t.id} value={t.slug}>{t.name}</option>
            ))}
          </Select>
        </div>
        {isAdmin && selectedSlug && (
          <Button onClick={() => setModal(true)} variant="teal">+ New Tour</Button>
        )}
      </div>

      {/* Tours list */}
      {loading ? <Spinner /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {!selectedSlug && (
            <p style={{ color: C.inkLight }}>Select a travel to see its tours.</p>
          )}
          {selectedSlug && tours.length === 0 && !loading && (
            <p style={{ color: C.inkLight }}>No tours for this travel yet.</p>
          )}
          {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      )}

      {/* Create tour modal */}
      {modal && (
        <Modal title="New Tour" onClose={() => setModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Tour name" value={form.name} onChange={setField("name")} />
            <Input label="Start date" type="date" value={form.start_date} onChange={setField("start_date")} />
            <Input label="End date" type="date" value={form.end_date} onChange={setField("end_date")} />
            <Input label="Price (€)" type="number" step="0.01" value={form.price} onChange={setField("price")} />
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <Button onClick={submit} disabled={saving} variant="teal">
                {saving ? "Creating…" : "Create Tour"}
              </Button>
              <Button onClick={() => setModal(false)} variant="outline">Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminTours;
