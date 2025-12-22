import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import locations from "./data/hystreet_locations.json"; // von Datenblatt

export const Sidebar = ({
  daten,
  selectedJahr,
  selectedOrt,
  setSelectedOrt,
}) => {
  if (daten.length === 0) {
    return (
      <aside>
        <div>Keine Daten vorhanden</div>
      </aside>
    );
  }

  // Variablen für Berechnungen
  let monatMitHoechstemKinderanteil = daten[0];
  let monatMitDenMeistenKindern = daten[0];
  let monatMitDenMeistenErwachsenen = daten[0];
  let summeAnteil = 0;
  let gesamtKinder = 0;
  let gesamtErwachsene = 0;

  // Schleife über alle Monate
  daten.forEach((monat) => {
    // Höchster Kinderanteil
    if (monat.anteil > monatMitHoechstemKinderanteil.anteil) {
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
    summeAnteil += monat.anteil;

    // Gesamtzahlen
    gesamtKinder += monat.child;
    gesamtErwachsene += monat.adult;
  });

  const durchschnittlicherKinderanteil =
    daten.length > 0 ? summeAnteil / daten.length : 0;

  return (
    <aside>
      <h4>
        {selectedOrt} - {selectedJahr}
      </h4>
      <ul>
        <li>
          Höchster Kinderanteil: {monatMitHoechstemKinderanteil.month_name} -{" "}
          {(monatMitHoechstemKinderanteil.anteil * 100).toFixed(2)}%
        </li>
        <li>
          Durchschnittlicher Kinderanteil:{" "}
          {(durchschnittlicherKinderanteil * 100).toFixed(2)}%
        </li>
        <li>
          Monat mit den meisten Kindern: {monatMitDenMeistenKindern.month_name}{" "}
          - {monatMitDenMeistenKindern.child}
        </li>
        <li>
          Monat mit den meisten Erwachsenen:{" "}
          {monatMitDenMeistenErwachsenen.month_name} -{" "}
          {monatMitDenMeistenErwachsenen.adult}
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
              layer.bindTooltip(feature.properties.name); //Pointer in Leaflet.css definiert
              layer.on("click", () => setSelectedOrt(feature.properties.name));
            }}
          />
        </MapContainer>
      </div>
    </aside>
  );
};

export default Sidebar;
