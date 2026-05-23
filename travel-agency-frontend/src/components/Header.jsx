import { useAuth } from "../context/AuthContext";
import { C } from "../theme";

const Header = ({ page, onNavigate }) => {
  const { user, logout, isEditor } = useAuth();

  const navItems = [
    { id: "travels", label: "Voyages" },
    ...(isEditor ? [{ id: "admin", label: "Administration" }] : []),
  ];

  const handleLogout = async () => {
    await logout();
    onNavigate("travels");
  };

  return (
    <header style={{
      background: C.ink, padding: "0 32px",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 64,
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div
        onClick={() => onNavigate("travels")}
        style={{ cursor: "pointer" }}
      >
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 22, color: C.white,
        }}>
          Travel<span style={{ color: C.gold }}>Agency</span>
        </span>
      </div>

      <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => onNavigate(n.id)}
            style={{
              background: page === n.id ? "rgba(200,146,26,0.2)" : "transparent",
              color: page === n.id ? C.gold : "rgba(255,255,255,0.7)",
              border: "none", cursor: "pointer",
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 15, fontWeight: 600,
              padding: "8px 14px", borderRadius: 6,
              transition: "all 0.15s",
            }}
          >
            {n.label}
          </button>
        ))}

        {user ? (
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 14, padding: "7px 14px",
              borderRadius: 6, marginLeft: 8,
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <button
            onClick={() => onNavigate("login")}
            style={{
              background: C.gold, color: C.white, border: "none",
              cursor: "pointer",
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 15, fontWeight: 600,
              padding: "8px 18px", borderRadius: 6, marginLeft: 8,
            }}
          >
            Se connecter
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
