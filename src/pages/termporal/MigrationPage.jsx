import { useState } from "react";
import { migrateData } from "../../utils/migrateToFirestore"; // Asegúrate de que la ruta sea correcta

const MigrationPage = () => {
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const handleMigration = async () => {
    setStatus("Iniciando...");
    try {
      const count = await migrateData();
      setStatus(`✅ Migración exitosa: ${count} registros`);
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Migración a Firestore</h1>
      <button onClick={handleMigration} disabled={status.includes("Migración")}>
        Iniciar Migración
      </button>
      <div style={{ marginTop: "1rem" }}>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default MigrationPage;
