import { useState, useEffect } from "react";
import { getTravels, getTours, createTour, updateTour, deleteTour } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import TourCard from "../../components/TourCard";
import TravelersModal from "./TravelersModal";
import { C } from "../../theme";

const EMPTY_FORM = { name: "", start_date: "", price: "", capacity: "" };

const AdminTours = ({ toast }) => {
  const { token, isAdmin } = useAuth();
  const [travels, setTravels] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // null | "create" | { edit: tour }
  const [deleteModal, setDeleteModal] = useState(null);
  const [travelersModal, setTravelersModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

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

  const openCreate = () => { setForm(EMPTY_FORM); setModal("create"); };
  const openEdit = (t) => {
    setForm({ name: t.name, start_date: t.start_date, price: t.price, capacity: t.capacity });
    setModal({ edit: t });
  };

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async () => {
    if (!selectedSlug) return;
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), capacity: Number(form.capacity) };
      if (modal === "create") {
        await createTour(selectedSlug, payload, token);
        toast("Tour créé avec succès !", "success");
      } else {
        await updateTour(selectedSlug, modal.edit.id, payload, token);
        toast("Tour modifié avec succès !", "success");
      }
      setModal(null);
      setForm(EMPTY_FORM);
      fetchTours(selectedSlug);
    } catch (e) {
      toast(e.message || "Erreur lors de l'enregistrement.", "error");
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    setSaving(true);
    try {
      await deleteTour(selectedSlug, deleteModal.id, token);
      toast("Tour supprimé avec succès !", "success");
      setDeleteModal(null);
      fetchTours(selectedSlug);
    } catch (e) {
      toast(e.message || "Erreur lors de la suppression.", "error");
    }
    setSaving(false);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <Select label="Sélectionnez un voyage" value={selectedSlug} onChange={handleSelectTravel}>
            <option value="">— Choisir un voyage —</option>
            {travels.map((t) => (
              <option key={t.id} value={t.slug}>{t.name}</option>
            ))}
          </Select>
        </div>
        {isAdmin && selectedSlug && (
          <Button onClick={openCreate} variant="teal">+ Nouveau Tour</Button>
        )}
      </div>

      {loading ? <Spinner /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {!selectedSlug && (
            <p style={{ color: C.inkLight }}>Sélectionnez un voyage pour voir ses circuits.</p>
          )}
          {selectedSlug && tours.length === 0 && !loading && (
            <p style={{ color: C.inkLight }}>Aucun circuit pour l'instant.</p>
          )}
          {tours.map((tour) => (
            <div key={tour.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <TourCard tour={tour} />
              <div style={{ display: "flex", gap: 8, paddingLeft: 12 }}>
                <Button variant="outline" size="sm" onClick={() => setTravelersModal(tour)}>Voyageurs</Button>
                <Button variant="outline" size="sm" onClick={() => openEdit(tour)}>Modifier</Button>
                <Button variant="outline" size="sm" style={{ color: "red", borderColor: "red" }} onClick={() => setDeleteModal(tour)}>Supprimer</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "create" ? "Nouveau Tour" : "Modifier Tour"} onClose={() => setModal(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Nom du circuit" value={form.name} onChange={setField("name")} />
            <Input label="Date de début" type="date" value={form.start_date} onChange={setField("start_date")} />
            
            {modal !== "create" && modal.edit && (
              <p style={{ fontSize: 13, color: C.inkMid }}>
                Du {modal.edit.start_date} au {modal.edit.end_date}
              </p>
            )}

            <Input label="Prix (€)" type="number" step="0.01" value={form.price} onChange={setField("price")} />
            <Input label="Capacité" type="number" value={form.capacity} onChange={setField("capacity")} />
            
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <Button onClick={submit} disabled={saving} variant="teal">
                {saving ? "Enregistrement…" : "Enregistrer"}
              </Button>
              <Button onClick={() => setModal(null)} variant="outline">Annuler</Button>
            </div>
          </div>
        </Modal>
      )}

      {deleteModal && (
        <Modal title="Supprimer le circuit" onClose={() => setDeleteModal(null)}>
          <p>Êtes-vous sûr de vouloir supprimer ce circuit ? Cette action est irréversible.</p>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Button onClick={confirmDelete} disabled={saving} variant="teal" style={{ background: "red", color: "white" }}>
              {saving ? "Suppression…" : "Confirmer"}
            </Button>
            <Button onClick={() => setDeleteModal(null)} variant="outline">Annuler</Button>
          </div>
        </Modal>
      )}

      {travelersModal && (
        <TravelersModal 
          tour={travelersModal} 
          onClose={() => { setTravelersModal(null); fetchTours(selectedSlug); }} 
          toast={toast} 
        />
      )}
    </div>
  );
};

export default AdminTours;
