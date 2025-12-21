import React from "react";
import { VegaEmbed } from "react-vega";

export const MainArea = ({
  selectedOrt,
  daten,
  backgroundColor,
  selectedJahr,
  tempCheck,
  temp,
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

  // Kinderanteil aggregieren
  const gefilterteDaten = daten.filter((d) =>
    d.timestamp?.startsWith(selectedJahr)
  );

  const aggMap = {};
  gefilterteDaten.forEach((d) => {
    const month = parseInt(d.timestamp.substring(5, 7));
    aggMap[month] = aggMap[month] || {
      month_num: month,
      month_name: monthNames[month - 1],
      child: 0,
      adult: 0,
    };
    aggMap[month].child += d.child;
    aggMap[month].adult += d.adult;
  });

  const dataWithShare = Object.values(aggMap)
    .sort((a, b) => a.month_num - b.month_num)
    .map((d) => {
      const total = d.child + d.adult;
      return {
        month_name: d.month_name,
        share: total > 0 ? d.child / total : 0,
        child: d.child,
        adult: d.adult,
      };
    });

  // Temperaturdaten vorbereiten
  const tempsForYear =
    tempCheck && temp?.length > 0
      ? temp
          .filter((t) => t.year === Number(selectedJahr))
          .sort((a, b) => a.month - b.month)
      : [];

  // Merge Kinderanteil + Temperatur
  const combinedData = dataWithShare.map((d) => {
    const tempObj = tempsForYear.find(
      (t) => t.month === monthNames.indexOf(d.month_name) + 1
    );
    return {
      ...d,
      temperature: tempObj ? `${tempObj.value.toFixed(1)}°C` : null,
    };
  });

  // Vega-Lite Spec
  const Spec = {
    data: { values: combinedData },
    layer: [
      // Kinderanteil Balken
      {
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
            axis: { format: ".1%" },
          },
          color: { value: "steelblue" },
          tooltip: [
            { field: "month_name", type: "ordinal", title: "Monat" },
            { field: "child", type: "quantitative", title: "Kinder" },
            { field: "adult", type: "quantitative", title: "Erwachsene" },
            {
              field: "share",
              type: "quantitative",
              title: "Kinderanteil",
              format: ".2%",
            },
            { field: "temperature", type: "nominal", title: "Temperatur" },
          ],
        },
      },
      // Temperatur als Text innerhalb des Balkens
      tempCheck
        ? {
            mark: {
              type: "text",
              dy: -10, // Position oberhalb Balken
              color: "blue",
              fontWeight: "bold",
            },
            encoding: {
              x: { field: "month_name", type: "ordinal", sort: monthNames },
              y: { field: "share", type: "quantitative" },
              text: { field: "temperature", type: "nominal" },
            },
          }
        : null,
    ].filter(Boolean),
    width: 900,
    height: 400,
  };

  return (
    <main style={{ backgroundColor, padding: "20px", textAlign: "center" }}>
      <h3>
        Kinderanteil an Fußgängern in {selectedOrt} {selectedJahr}
      </h3>
      <VegaEmbed spec={Spec} options={{ mode: "vega-lite" }} />
    </main>
  );
};

export default MainArea;
