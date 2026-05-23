import { useState, useEffect } from "react";
import { getTravelers, createTraveler, deleteTraveler } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import { C } from "../../theme";

const TravelersModal = ({ tour, onClose, toast }) => {
  const { token } = useAuth();
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ full_name: "", cin: "", email: "", phone: "" });

  const fetchTravelers = async () => {
    setLoading(true);
    try {
      const d = await getTravelers(tour.id, token);
      setTravelers(d.data);
    } catch (e) {
      toast("Erreur de chargement des voyageurs", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTravelers();
  }, [tour.id]);

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createTraveler(tour.id, form, token);
      toast("Voyageur ajouté !", "success");
      setForm({ full_name: "", cin: "", email: "", phone: "" });
      fetchTravelers();
    } catch (e) {
      toast(e.message || "Erreur lors de l'ajout", "error");
    }
    setSaving(false);
  };

  const handleDelete = async (travelerId) => {
    try {
      await deleteTraveler(tour.id, travelerId, token);
      toast("Voyageur supprimé !", "success");
      fetchTravelers();
    } catch (e) {
      toast("Erreur lors de la suppression", "error");
    }
  };

  const isFull = travelers.length >= tour.capacity;

  return (
    <Modal title="Gestion des voyageurs" onClose={onClose}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h4 style={{ margin: 0, color: C.ink }}>{tour.name}</h4>
        <Badge>{travelers.length} / {tour.capacity} voyageurs</Badge>
      </div>

      {loading ? <Spinner /> : (
        <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 20 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.sandDark}`, textAlign: "left" }}>
                <th style={{ padding: 8 }}>Nom complet</th>
                <th style={{ padding: 8 }}>CIN</th>
                <th style={{ padding: 8 }}>Email</th>
                <th style={{ padding: 8 }}>Téléphone</th>
                <th style={{ padding: 8 }}></th>
              </tr>
            </thead>
            <tbody>
              {travelers.length === 0 ? (
                <tr><td colSpan="5" style={{ padding: 8, color: C.inkLight }}>Aucun voyageur.</td></tr>
              ) : (
                travelers.map(t => (
                  <tr key={t.id} style={{ borderBottom: `1px solid ${C.sandLight}` }}>
                    <td style={{ padding: 8 }}>{t.full_name}</td>
                    <td style={{ padding: 8 }}>{t.cin}</td>
                    <td style={{ padding: 8 }}>{t.email}</td>
                    <td style={{ padding: 8 }}>{t.phone}</td>
                    <td style={{ padding: 8 }}>
                      <Button variant="outline" size="sm" style={{ color: "red", borderColor: "red" }} onClick={() => handleDelete(t.id)}>
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ borderTop: `1.5px solid ${C.sandDark}`, paddingTop: 16 }}>
        {isFull ? (
          <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>Ce circuit est complet</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Input label="Nom complet" value={form.full_name} onChange={setField("full_name")} required />
            <Input label="CIN" value={form.cin} onChange={setField("cin")} required />
            <Input label="Email" type="email" value={form.email} onChange={setField("email")} required />
            <Input label="Téléphone" value={form.phone} onChange={setField("phone")} required />
            <Button type="submit" disabled={saving} variant="teal">
              {saving ? "Ajout…" : "Ajouter le voyageur"}
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default TravelersModal;
