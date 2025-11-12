import React from "react";
import { VegaEmbed } from "react-vega";
import chart1ZH from "./data/chart1_zh.json";
import chart2ZH from "./data/chart2_zh.json";

export const MainArea = ({ count, eingabe }) => {
  return (
    <main style={{ backgroundColor: eingabe }}>
      <div>
        <h2>Anzahl Fussgänger in Bahnhofstrasse (Mitte)</h2>
        <VegaEmbed spec={chart1ZH} options={{ mode: "vega-lite" }} />
        <VegaEmbed spec={chart2ZH} options={{ mode: "vega-lite" }} />
        <h2>Count: {count}</h2>
      </div>
    </main>
  );
};

// {count} === {count: count}
