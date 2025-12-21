import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import locations from "./data/hystreet_locations.json";

export const Sidebar = ({
  backgroundColor,
  daten,
  selectedJahr,
  selectedOrt = [],
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

  if (daten.length === 0) {
    return (
      <aside style={{ backgroundColor: backgroundColor, padding: "10px" }}>
        <div>Keine Daten vorhanden</div>
      </aside>
    );
  }

  // Filter nach Jahr
  const gefilterteDaten = daten.filter(
    (d) => parseInt(d.timestamp.substring(0, 4)) === Number(selectedJahr)
  );

  // Aggregation pro Monat
  const aggMap = {};
  gefilterteDaten.forEach((d) => {
    const month = parseInt(d.timestamp.substring(5, 7));
    aggMap[month] = aggMap[month] || { child: 0, adult: 0 };
    aggMap[month].child += Number(d.child);
    aggMap[month].adult += Number(d.adult);
  });

  const aggArray = Object.entries(aggMap).map(([monthNum, value]) => {
    const total = value.child + value.adult;
    const share = total > 0 ? value.child / total : 0;
    return { month: Number(monthNum), ...value, total, share };
  });

  // Höchster Kinderanteil im Jahr
  const monatMitHoechstemKinderanteil = aggArray.reduce(
    (bisher, aktuell) => (aktuell.share > bisher.share ? aktuell : bisher),
    aggArray[0]
  );
  // Durchschnittlicher Kinderanteil im Jahr
  const durchschnittlicherKinderanteil =
    aggArray.reduce((summe, aktuell) => summe + aktuell.share, 0) /
    aggArray.length;

  // Monat mit den meisten Kindern
  const monatMitDenMeistenKindern = aggArray.reduce(
    (bisher, aktuell) => (aktuell.child > bisher.child ? aktuell : bisher),
    aggArray[0]
  );

  // Monat mit den meisten Erwachsenen
  const monatMitDenMeistenErwachsenen = aggArray.reduce(
    (bisher, aktuell) => (aktuell.adult > bisher.adult ? aktuell : bisher),
    aggArray[0]
  );

  // Gesamtanzahl Kinder im Jahr
  const gesamtKinder = aggArray.reduce(
    (summe, aktuell) => summe + aktuell.child,
    0
  );

  // Gesamtanzahl Erwachsene im Jahr
  const gesamtErwachsene = aggArray.reduce(
    (summe, aktuell) => summe + aktuell.adult,
    0
  );

  return (
    <aside style={{ backgroundColor, padding: "10px", minWidth: "250px" }}>
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
            style={{
              color: "blue",
            }}
            onEachFeature={(feature, layer) => {
              // Tooltip beim Hover
              layer.bindTooltip(feature.properties.name, {
                sticky: true,
                direction: "top",
              });

              // Klick auf Polygon → selectedOrt setzen //in React onClick in Leaflet layer.on("event")
              layer.on("click", () => {
                setSelectedOrt(feature.properties.name);
              });
            }}
          />
        </MapContainer>
      </div>
    </aside>
  );
};

export default Sidebar;
