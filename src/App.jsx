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
  const [orte, setOrte] = useState([]);
  const [selectedOrt, setSelectedOrt] = useState("Bahnhofstrasse (Mitte)");
  const [daten, setDaten] = useState([]);
  const backgroundColor = eingabe === "Dunkel" ? "#b4b4b4" : "";
  const jahre = ["2021", "2022", "2023", "2024", "2025"];
  const [selectedJahr, setSelectedJahr] = useState("2025");

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
        orte={orte}
        selectedOrt={selectedOrt}
        setSelectedOrt={setSelectedOrt}
        backgroundColor={backgroundColor}
        jahre={jahre}
        selectedJahr={selectedJahr}
        setSelectedJahr={setSelectedJahr}
        wappen={wappen}
      />
      <Sidebar
        eingabe={eingabe}
        backgroundColor={backgroundColor}
        daten={daten}
        selectedJahr={selectedJahr}
        selectedOrt={selectedOrt}
        setSelectedOrt={setSelectedOrt}
      />
      <MainArea
        selectedOrt={selectedOrt}
        daten={daten}
        backgroundColor={backgroundColor}
        selectedJahr={selectedJahr}
      />
      <Footer backgroundColor={backgroundColor} />
    </div>
  );
}
