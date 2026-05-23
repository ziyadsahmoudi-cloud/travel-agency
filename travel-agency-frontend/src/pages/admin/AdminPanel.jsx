import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminTravels from "./AdminTravels";
import AdminTours from "./AdminTours";
import AdminUsers from "./AdminUsers";
import { C } from "../../theme";

const TABS = [
  { id: "travels", label: "Voyages", adminOnly: false },
  { id: "tours", label: "Circuits", adminOnly: false },
  { id: "users", label: "Utilisateurs", adminOnly: true },
];

const AdminPanel = ({ toast }) => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("travels");

  const visibleTabs = TABS.filter((t) => !t.adminOnly || isAdmin);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px 80px" }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: 6 }}>
          Gestion
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, margin: 0, color: C.ink }}>
          Panneau d'administration
        </h2>
        <p style={{ color: C.inkMid, marginTop: 6 }}>
          Connecté en tant que <strong>{user?.name}</strong>
          {" · "}
          <span style={{ color: C.teal, fontWeight: 600 }}>
            {user?.role?.map((r) => r.name).join(", ")}
          </span>
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: `2px solid ${C.sandDark}`, marginBottom: 28 }}>
        {visibleTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 16, fontWeight: 600,
              color: activeTab === t.id ? C.gold : C.inkMid,
              borderBottom: activeTab === t.id ? `2px solid ${C.gold}` : "2px solid transparent",
              padding: "8px 18px", marginBottom: -2,
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "travels" && <AdminTravels toast={toast} />}
      {activeTab === "tours" && <AdminTours toast={toast} />}
      {activeTab === "users" && isAdmin && <AdminUsers toast={toast} />}
    </div>
  );
};

export default AdminPanel;
