import React from "react";
import { VegaEmbed } from "react-vega";

export const MainArea = ({ selectedOrt, daten, backgroundColor, selectedJahr }) => {
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

  const Jahr = (d) => parseInt(d.timestamp.substring(0, 4));
  const Monat = (d) => parseInt(d.timestamp.substring(5, 7));

  const gefilterteDaten = daten.filter(
    (d) => Jahr(d) === Number(selectedJahr)
  );

  // Daten aggregieren
  const aggMap = {};
  gefilterteDaten.forEach((d) => {
    const key = Monat(d);
    aggMap[key] = aggMap[key] || {
      month_num: key,
      month_name: monthNames[key - 1],
      child: 0,
      adult: 0,
    };
    aggMap[key].child += d.child;
    aggMap[key].adult += d.adult;
  });
  

  // Kinderanteil berechnen
  const dataWithShare = Object.values(aggMap)
    .sort((a, b) => a.month_num - b.month_num)
    .map((d) => {
      const total = d.child + d.adult;
      return { month_name: d.month_name, share: total > 0 ? d.child / total : 0, child: d.child, adult: d.adult };
  });

  const Spec = {
    data: { values: dataWithShare },
    mark: "bar",
    encoding: {
      x: {
        field: "month_name",
        type: "ordinal",
        sort: monthNames,
        title: "Monat",
      },
      y: {
        field: "share",
        type: "quantitative",
        title: "Kinderanteil",
        axis: { format: ".1%" }, //.1 bedeutet eine Nachkommastelle in Prozent
      },
      color: { value: "steelblue" },
      tooltip: [
      { field: "month_name", type: "ordinal", title: "Monat" },
      { field: "child", type: "quantitative", title: "Anzhal Kinder" },
      { field: "adult", type: "quantitative", title: "Anzahl Erwachsene" },
      { field: "share", type: "quantitative", title: "Kinderanteil", format: ".2%" }
    ]
    },
    width: 900,
    height: 400,
  };

  return (
    <main
      style={{
        backgroundColor: backgroundColor,
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h3>Kinderanteil an Fussgängern in {selectedOrt} {selectedJahr}</h3>
      <VegaEmbed spec={Spec} options={{ mode: "vega-lite" }} />
    </main>
  );
};



export default MainArea;
