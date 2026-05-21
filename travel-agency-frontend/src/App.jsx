import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useToast } from "./hooks/useToast";
import Header from "./components/Header";
import Toast from "./components/ui/Toast";
import LoginPage from "./pages/LoginPage";
import TravelsPage from "./pages/TravelsPage";
import ToursPage from "./pages/ToursPage";
import AdminPanel from "./pages/admin/AdminPanel";
import { C } from "./theme";

const AppInner = () => {
  const { isEditor } = useAuth();
  const { toast, showToast, clearToast } = useToast();
  const [page, setPage] = useState("travels"); // travels | tours | admin | login
  const [selectedTravel, setSelectedTravel] = useState(null);

  const navigate = (target) => {
    setPage(target);
    if (target !== "tours") setSelectedTravel(null);
  };

  const handleSelectTravel = (travel) => {
    setSelectedTravel(travel);
    setPage("tours");
  };

  // Login page is full-screen (no header)
  if (page === "login") {
    return (
      <LoginPage
        onSuccess={() => navigate("travels")}
        onBrowse={() => navigate("travels")}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.sand, fontFamily: "'Crimson Pro', Georgia, serif" }}>
      <Header page={page} onNavigate={navigate} />

      <main>
        {page === "travels" && (
          <TravelsPage onSelectTravel={handleSelectTravel} />
        )}

        {page === "tours" && selectedTravel && (
          <ToursPage
            travel={selectedTravel}
            onBack={() => navigate("travels")}
          />
        )}

        {page === "admin" && isEditor && (
          <AdminPanel toast={showToast} />
        )}

        {page === "admin" && !isEditor && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.ink }}>
              Access Restricted
            </h3>
            <p style={{ color: C.inkMid }}>Please sign in with an editor or admin account.</p>
            <button
              onClick={() => navigate("login")}
              style={{
                marginTop: 16, background: C.gold, color: C.white,
                border: "none", cursor: "pointer",
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: 15, fontWeight: 600,
                padding: "10px 24px", borderRadius: 6,
              }}
            >
              Sign In
            </button>
          </div>
        )}
      </main>

      {toast && (
        <Toast msg={toast.msg} type={toast.type} onClose={clearToast} />
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppInner />
  </AuthProvider>
);

export default App;
