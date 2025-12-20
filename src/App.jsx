import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { MainArea } from "./MainArea.jsx";

export function App() {
  const [eingabe, seteingabe] = useState("");
  const wappen =
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Z%C3%BCrich.png";
  const zuerich =
    "https://bahnhofstrasse-zuerich.ch/wp-content/uploads/2024/10/zh_bahnhofstrasse_lucy-459-2-scaled.jpg";
  const [orte, setOrte] = useState([]);
  const [selectedOrt, setSelectedOrt] = useState("Bahnhofstrasse (Mitte)");
  const [daten, setDaten] = useState([]);
  const backgroundColor =
    eingabe === "Grau" ? "#b4b4b4" : eingabe === "FH" ? "#f4d03f" : "";

  // Orte laden
  useEffect(() => {
    fetch("https://backend-rouge-gamma-83.vercel.app/orte")
      .then((res) => res.json())
      .then((data) => setOrte(data));
  }, []);

  // Daten für den ausgewählten Ort laden
  useEffect(() => {
    fetch(
      `https://backend-rouge-gamma-83.vercel.app/analyse/kinder_anteil?analyseort=${selectedOrt}`
    )
      .then((res) => res.json())
      .then((data) => setDaten(data));
  }, [selectedOrt]);

  return (
    <div className="app">
      <Header
        eingabe={eingabe}
        seteingabe={seteingabe}
        wappen={wappen}
        zuerich={zuerich}
        orte={orte}
        selectedOrt={selectedOrt}
        setSelectedOrt={setSelectedOrt}
        backgroundColor={backgroundColor}
      />
      <Sidebar
        eingabe={eingabe}
        selectedOrt={selectedOrt}
        backgroundColor={backgroundColor}
      />
      <MainArea
        eingabe={eingabe}
        selectedOrt={selectedOrt}
        daten={daten}
        backgroundColor={backgroundColor}
      />
      <Footer backgroundColor={backgroundColor} />
    </div>
  );
}
