import React from "react";
import { VegaEmbed } from "react-vega";

export const MainArea = ({ selectedOrt, daten, backgroundColor }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Monat extrahieren
  const Monat = (d) => parseInt(d.timestamp.substring(5, 7));

  // Daten extrahieren und Monatsnamen hinzufügen
  const selectedData = daten.map((d) => ({
    // map geht jedes Element durch wie eine for Schleife
    month_num: Monat(d),
    month_name: monthNames[Monat(d) - 1],
    child: d.child,
    adult: d.adult,
  }));

  // Aggregation pro Monat
  const aggMap = {};
  selectedData.map((r) => {
    const key = r.month_num;
    aggMap[key] = aggMap[key] || {
      // || gibt ersten truthy Wert zurück, wenn das erste stimmt wird es zurückgegeben, ansonsten das zweite
      month_num: r.month_num, // wenn der Monat schon existiert, wird er nicht überschrieben
      month_name: r.month_name,
      child: 0,
      adult: 0,
    };
    aggMap[key].child += r.child; // Werte aufsummieren
    aggMap[key].adult += r.adult;
    return r;
  });

  const agg = Object.values(aggMap).sort((a, b) => a.month_num - b.month_num);
  // Object.values, weil map kein Array zurückgibt sondern ein Objekt
  // wenn a-b negativ ist, kommt a vor b, wenn positiv b vor a

  // Long-Format für gestapelte Balken (Kinder + Erwachsene)
  const longData = agg.flatMap((d) => [
    { month_name: d.month_name, category: "Kinder", value: d.child },
    { month_name: d.month_name, category: "Erwachsene", value: d.adult },
  ]);

  // Spec für gestapelte Balken
  const Spec = {
    data: { values: longData },
    mark: "bar",
    encoding: {
      x: {
        field: "month_name",
        type: "ordinal",
        sort: monthNames, // sortiert Reihenfolge gemäss Array
        title: "Monat",
      },
      y: {
        field: "value",
        type: "quantitative",
        title: "Anzahl Fussgänger",
      }, // quantitative = numerische Werte
      color: {
        field: "category",
        type: "nominal",
        title: "Kategorie",
        scale: { range: ["steelblue", "orange"] }, // Farben für Kinder/Erwachsene
      },
    },
    width: 820,
    height: 540,
  };

  return (
    <main
      style={{
        backgroundColor: backgroundColor,
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Anteil der Kinder in {selectedOrt}</h2>
      <VegaEmbed spec={Spec} options={{ mode: "vega-lite" }} />
    </main>
  );
};

export default MainArea;
