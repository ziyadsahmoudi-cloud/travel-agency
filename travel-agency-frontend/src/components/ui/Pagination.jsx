import Button from "./Button";
import { C } from "../../theme";

const Pagination = ({ meta, onPage }) => {
  if (!meta || meta.last_page <= 1) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 32 }}>
      <Button
        variant="outline"
        size="sm"
        disabled={meta.current_page === 1}
        onClick={() => onPage(meta.current_page - 1)}
      >
        ← Précédent
      </Button>
      <span style={{ fontSize: 13, color: C.inkMid }}>
        Page {meta.current_page} sur {meta.last_page}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={meta.current_page === meta.last_page}
        onClick={() => onPage(meta.current_page + 1)}
      >
        Suivant →
      </Button>
    </div>
  );
};

export default Pagination;
