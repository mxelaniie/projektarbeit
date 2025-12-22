import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { MainArea } from "./MainArea.jsx";

export function App() {
  const [hintergrundEingabe, setHintergrundEingabe] = useState("");
  const [orte, setOrte] = useState([]);
  const [selectedOrt, setSelectedOrt] = useState("Bahnhofstrasse (Mitte)");
  const [selectedJahr, setSelectedJahr] = useState("2025");
  const [tempCheck, setTempCheck] = useState(false);
  const [monatDaten, setMonatDaten] = useState([]);
  const jahre = ["2021", "2022", "2023", "2024", "2025"];
  const wappen =
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Z%C3%BCrich.png";

  // Orte laden
  useEffect(() => {
    fetch("https://backend-rouge-gamma-83.vercel.app/orte")
      .then((res) => res.json())
      .then((data) => setOrte(data))
      .catch((err) => console.error("Fehler beim Laden der Orte:", err));
  }, []);

  // Monatsdaten laden
  useEffect(() => {
    fetch(
      `https://backend-rouge-gamma-83.vercel.app/analyse/kinderanteil_monat?analyseort=${selectedOrt}&jahr=${selectedJahr}&tempCheck=${tempCheck}`
    )
      .then((res) => res.json())
      .then((data) => setMonatDaten(data))
      .catch((err) => console.error("Fehler beim Laden der Monatsdaten:", err));
  }, [selectedOrt, selectedJahr, tempCheck]);

  return (
    <div className="app">
      <Header
        hintergrundEingabe={hintergrundEingabe}
        setHintergrundEingabe={setHintergrundEingabe}
        orte={orte}
        selectedOrt={selectedOrt}
        setSelectedOrt={setSelectedOrt}
        jahre={jahre}
        selectedJahr={selectedJahr}
        setSelectedJahr={setSelectedJahr}
        wappen={wappen}
        tempCheck={tempCheck}
        setTempCheck={setTempCheck}
      />
      <Sidebar
        daten={monatDaten}
        selectedJahr={selectedJahr}
        selectedOrt={selectedOrt}
        setSelectedOrt={setSelectedOrt}
      />
      <MainArea
        selectedOrt={selectedOrt}
        daten={monatDaten}
        hintergrundEingabe={hintergrundEingabe}
        selectedJahr={selectedJahr}
        tempCheck={tempCheck}
      />
      <Footer />
    </div>
  );
}
