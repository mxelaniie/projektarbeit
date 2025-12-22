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
  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  // Orte laden
  useEffect(() => {
    fetch("http://localhost:8000/orte")
      .then((res) => res.json())
      .then((data) => setOrte(data))
      .catch((err) => console.error("Fehler beim Laden der Orte:", err));
  }, []);

  // Monatsdaten laden
  useEffect(() => {
    fetch(
      `http://localhost:8000/analyse/kinderanteil_monat?analyseort=${selectedOrt}&jahr=${selectedJahr}&tempCheck=${tempCheck}`
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
        monthNames={monthNames}
      />
      <MainArea
        selectedOrt={selectedOrt}
        daten={monatDaten}
        hintergrundEingabe={hintergrundEingabe}
        selectedJahr={selectedJahr}
        tempCheck={tempCheck}
        monthNames={monthNames}
      />
      <Footer />
    </div>
  );
}
