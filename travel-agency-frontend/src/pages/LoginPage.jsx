import { useState } from "react";
import { login as apiLogin } from "../api/client";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { C } from "../theme";

const LoginPage = ({ onSuccess, onBrowse }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiLogin(email, password);
      login(data.data, data.authorization.token);
      onSuccess();
    } catch (e) {
      setError(e.message || "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div style={{
      minHeight: "100vh", background: C.ink,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <button
        onClick={onBrowse}
        style={{
          position: "fixed", top: 20, left: 20,
          background: "rgba(255,255,255,0.1)", color: C.white,
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 6, padding: "7px 15px",
          cursor: "pointer", fontSize: 13,
          fontFamily: "'Crimson Pro', Georgia, serif",
        }}
      >
        ← Parcourir les voyages
      </button>

      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 13, letterSpacing: "0.25em", color: C.gold, textTransform: "uppercase", marginBottom: 10 }}>
            Bon retour
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 42, color: C.white, margin: 0, lineHeight: 1.1,
          }}>
            Travel<br />Agency
          </h1>
          <div style={{ width: 40, height: 2, background: C.gold, margin: "16px auto 0" }} />
        </div>

        <div style={{
          background: C.white, borderRadius: 12,
          padding: 32, display: "flex", flexDirection: "column", gap: 18,
        }}>
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKey}
          />
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKey}
          />
          {error && <p style={{ margin: 0, fontSize: 13, color: C.danger }}>{error}</p>}
          <Button onClick={submit} disabled={loading} size="lg" fullWidth>
            {loading ? "Connexion en cours…" : "Se connecter"}
          </Button>
          <p style={{ margin: 0, fontSize: 12, color: C.inkLight, textAlign: "center" }}>
            Identifiants par défaut : admin@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
