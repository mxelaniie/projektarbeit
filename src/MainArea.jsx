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

  const Monat = (d) => parseInt(d.timestamp.substring(5, 7));

  // Daten aggregieren
  const aggMap = {};
  daten.forEach((d) => {
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
  const agg = Object.values(aggMap).sort((a, b) => a.month_num - b.month_num);

  // Kinderanteil berechnen
  const dataWithShare = agg.map((d) => {
    const total = d.child + d.adult;
    return { month_name: d.month_name, share: total > 0 ? d.child / total : 0 };
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
      <h3>Kinderanteil an Fussgängern in {selectedOrt}</h3>
      <VegaEmbed spec={Spec} options={{ mode: "vega-lite" }} />
    </main>
  );
};

export default MainArea;
