import { useState, useEffect } from "react";
import { getTravels, createTravel, updateTravel } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import Pagination from "../../components/ui/Pagination";
import Badge from "../../components/ui/Badge";
import { C } from "../../theme";

const EMPTY_FORM = { name: "", description: "", number_of_days: "", is_public: true };

const AdminTravels = ({ toast }) => {
  const { token, isAdmin } = useAuth();
  const [travels, setTravels] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "create" | { edit: travel }
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetch_ = async (p = 1) => {
    setLoading(true);
    try {
      const d = await getTravels(p, token);
      setTravels(d.data);
      setMeta(d.meta);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { fetch_(page); }, [page]);

  const openCreate = () => { setForm(EMPTY_FORM); setModal("create"); };
  const openEdit = (t) => {
    setForm({ name: t.name, description: t.description || "", number_of_days: t.number_of_days, is_public: true });
    setModal({ edit: t });
  };

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = async () => {
    setSaving(true);
    try {
      const payload = { ...form, number_of_days: Number(form.number_of_days) };
      if (modal === "create") {
        await createTravel(payload, token);
        toast("Travel created successfully!", "success");
      } else {
        await updateTravel(modal.edit.slug, payload, token);
        toast("Travel updated!", "success");
      }
      setModal(null);
      setPage(1);
      fetch_(1);
    } catch (e) {
      toast(e.message || "Error saving travel.", "error");
    }
    setSaving(false);
  };

  return (
    <div>
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
          <Button onClick={openCreate} variant="teal">+ New Travel</Button>
        </div>
      )}

      {loading ? <Spinner /> : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {travels.length === 0 && <p style={{ color: C.inkLight }}>No travels yet.</p>}
            {travels.map((t) => (
              <div key={t.id} style={{
                background: C.white, border: `1.5px solid ${C.sandDark}`,
                borderRadius: 10, padding: "16px 20px",
                display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: 12, flexWrap: "wrap",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, margin: 0, color: C.ink }}>
                      {t.name}
                    </h4>
                    <Badge>{t.number_of_days}d</Badge>
                  </div>
                  <span style={{ fontSize: 12, color: C.inkLight }}>/{t.slug}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => openEdit(t)}>Edit</Button>
              </div>
            ))}
          </div>
          <Pagination meta={meta} onPage={setPage} />
        </>
      )}

      {modal && (
        <Modal title={modal === "create" ? "New Travel" : "Edit Travel"} onClose={() => setModal(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Name" value={form.name} onChange={setField("name")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.inkMid, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Description
              </label>
              <textarea
                value={form.description}
                onChange={setField("description")}
                rows={4}
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 15,
                  color: C.ink, background: C.white,
                  border: `1.5px solid ${C.sandDark}`,
                  borderRadius: 6, padding: "9px 13px",
                  resize: "vertical", outline: "none",
                }}
              />
            </div>
            <Input label="Number of days" type="number" value={form.number_of_days} onChange={setField("number_of_days")} />
            {isAdmin && (
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, cursor: "pointer" }}>
                <input type="checkbox" checked={form.is_public} onChange={setField("is_public")} />
                <span>Public (visible to all)</span>
              </label>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <Button onClick={submit} disabled={saving} variant="teal">
                {saving ? "Saving…" : "Save Travel"}
              </Button>
              <Button onClick={() => setModal(null)} variant="outline">Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminTravels;
