import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import locations from "./data/hystreet_locations.json";

export const Sidebar = ({
  daten,
  selectedJahr,
  selectedOrt,
  setSelectedOrt,
}) => {
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

  if (!daten || daten.length === 0) {
    return (
      <aside style={{ backgroundColor: "#b4b4b4", padding: "10px" }}>
        <div>Keine Daten vorhanden</div>
      </aside>
    );
  }

  // Initialisierung der Variablen
  let monatMitHoechstemKinderanteil = daten[0];
  let monatMitDenMeistenKindern = daten[0];
  let monatMitDenMeistenErwachsenen = daten[0];
  let summeShare = 0;
  let gesamtKinder = 0;
  let gesamtErwachsene = 0;

  // Schleife über alle Monate
  daten.forEach((monat) => {
    // Höchster Kinderanteil
    if (monat.share > monatMitHoechstemKinderanteil.share) {
      monatMitHoechstemKinderanteil = monat;
    }

    // Monat mit den meisten Kindern
    if (monat.child > monatMitDenMeistenKindern.child) {
      monatMitDenMeistenKindern = monat;
    }

    // Monat mit den meisten Erwachsenen
    if (monat.adult > monatMitDenMeistenErwachsenen.adult) {
      monatMitDenMeistenErwachsenen = monat;
    }

    // Summe für Durchschnitt
    summeShare += monat.share;

    // Gesamtzahlen
    gesamtKinder += monat.child;
    gesamtErwachsene += monat.adult;
  });

  const durchschnittlicherKinderanteil = summeShare / daten.length;

  return (
    <aside
      style={{
        backgroundColor: "#c3c3c3ff",
        padding: "10px",
        minWidth: "250px",
      }}
    >
      <h4>
        {selectedOrt} - {selectedJahr}
      </h4>
      <ul>
        <li>
          Höchster Kinderanteil:{" "}
          {monthNames[monatMitHoechstemKinderanteil.month - 1]} (
          {(monatMitHoechstemKinderanteil.share * 100).toFixed(2)}%)
        </li>
        <li>
          Durchschnittlicher Kinderanteil:{" "}
          {(durchschnittlicherKinderanteil * 100).toFixed(2)}%
        </li>
        <li>
          Monat mit den meisten Kindern:{" "}
          {monthNames[monatMitDenMeistenKindern.month - 1]} (
          {monatMitDenMeistenKindern.child})
        </li>
        <li>
          Monat mit den meisten Erwachsenen:{" "}
          {monthNames[monatMitDenMeistenErwachsenen.month - 1]} (
          {monatMitDenMeistenErwachsenen.adult})
        </li>
        <li>Gesamtanzahl Kinder im Jahr: {gesamtKinder}</li>
        <li>Gesamtanzahl Erwachsene im Jahr: {gesamtErwachsene}</li>
      </ul>

      <div style={{ height: "420px", width: "100%" }}>
        <MapContainer
          center={[47.372, 8.54]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          <GeoJSON
            data={locations}
            style={{ color: "blue" }}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(feature.properties.name, {
                sticky: true,
                direction: "top",
              });
              layer.on("click", () => setSelectedOrt(feature.properties.name));
            }}
          />
        </MapContainer>
      </div>
    </aside>
  );
};

export default Sidebar;
