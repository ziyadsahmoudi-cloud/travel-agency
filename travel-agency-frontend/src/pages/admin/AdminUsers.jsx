import { useState } from "react";
import { createUser } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import { C } from "../../theme";

const EMPTY_FORM = { name: "", email: "", password: "", role: "editor" };

const AdminUsers = ({ toast }) => {
  const { token } = useAuth();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async () => {
    setSaving(true);
    try {
      await createUser(form, token);
      toast("Utilisateur créé avec succès !", "success");
      setModal(false);
      setForm(EMPTY_FORM);
    } catch (e) {
      toast(e.message || "Erreur lors de la création de l'utilisateur.", "error");
    }
    setSaving(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
        <Button onClick={() => setModal(true)} variant="teal">+ Nouvel Utilisateur</Button>
      </div>

      {/* Info card */}
      <div style={{
        background: C.goldPale,
        border: `1.5px solid ${C.goldLight}`,
        borderRadius: 10, padding: "20px 24px",
      }}>
        <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, margin: "0 0 8px", color: C.ink }}>
          Gestion des Utilisateurs
        </h4>
        <p style={{ margin: 0, color: C.inkMid, fontSize: 14, lineHeight: 1.65 }}>
          Créez de nouveaux éditeurs ou administrateurs à l'aide du bouton ci-dessus. Les éditeurs peuvent modifier les voyages.
          Les administrateurs peuvent également créer des voyages, des circuits et des utilisateurs. La liste des utilisateurs n'est pas exposée via
          l'API publique — gérez les comptes ici.
        </p>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { role: "Éditeur", desc: "Peut modifier les voyages existants" },
            { role: "Administrateur", desc: "Peut créer des voyages, des circuits, des utilisateurs — et possède toutes les permissions d'éditeur" },
          ].map(({ role, desc }) => (
            <div key={role} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
                background: C.teal, color: C.white,
                padding: "2px 8px", borderRadius: 100, textTransform: "uppercase",
                whiteSpace: "nowrap", marginTop: 2,
              }}>
                {role}
              </span>
              <span style={{ fontSize: 14, color: C.inkMid }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Create user modal */}
      {modal && (
        <Modal title="Créer un Utilisateur" onClose={() => setModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Nom complet" value={form.name} onChange={setField("name")} />
            <Input label="E-mail" type="email" value={form.email} onChange={setField("email")} />
            <Input label="Mot de passe" type="password" value={form.password} onChange={setField("password")} />
            <Select label="Rôle" value={form.role} onChange={setField("role")}>
              <option value="editor">Éditeur</option>
              <option value="admin">Administrateur</option>
            </Select>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <Button onClick={submit} disabled={saving} variant="teal">
                {saving ? "Création…" : "Créer un Utilisateur"}
              </Button>
              <Button onClick={() => setModal(false)} variant="outline">Annuler</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminUsers;
