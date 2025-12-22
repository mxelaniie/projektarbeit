import React from "react";
import { VegaEmbed } from "react-vega";

export const MainArea = ({
  selectedOrt,
  daten,
  selectedJahr,
  tempCheck,
  hintergrundEingabe,
  monthNames,
}) => {
  const Spec = {
    data: { values: daten },
    layer: [
      // Balken für Kinderanteil
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
            field: "anteil",
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
              field: "anteil",
              type: "quantitative",
              title: "Kinderanteil",
              format: ".2%",
            },
            { field: "temperature", type: "nominal", title: "Temperatur" },
          ],
        },
      },
      // Temperatur als Text oberhalb der Balken
      tempCheck
        ? {
            mark: { type: "text", dy: -10, color: "blue", fontWeight: "bold" },
            encoding: {
              x: { field: "month_name", type: "ordinal", sort: monthNames },
              y: { field: "anteil", type: "quantitative" },
              text: { field: "temperature", type: "nominal" },
            },
          }
        : null,
    ].filter(Boolean),
    width: 900,
    height: 400,
  };

  return (
    <main
      style={{
        backgroundColor:
          hintergrundEingabe === "Dunkel" ? "lightgrey" : "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h3>
        Kinderanteil an Fußgängern in {selectedOrt} {selectedJahr}
      </h3>
      <VegaEmbed spec={Spec} options={{ mode: "vega-lite" }} />
    </main>
  );
};

export default MainArea;
