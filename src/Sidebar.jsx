export const Sidebar = ({ backgroundColor, daten = [] }) => {
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

  if (daten.length === 0) {
    return (
      <aside style={{ backgroundColor: backgroundColor, padding: "10px" }}>
        <div>Keine Daten vorhanden</div>
      </aside>
    );
  }

  // Aggregation pro Monat
  const Monat = (d) => parseInt(d.timestamp.substring(5, 7));
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

  // Monat mit höchstem Kinderanteil
  const maxKinderMonat = agg.reduce((max, curr) => {
    const maxShare = max.child / (max.child + max.adult);
    const currShare = curr.child / (curr.child + curr.adult);
    return currShare > maxShare ? curr : max;
  });

  return (
    <aside
      style={{
        backgroundColor: backgroundColor,
        padding: "10px",
        width: "250px",
      }}
    >
      <h5>Zahlen pro Monat:</h5>
      <ul>
        {agg.map((d) => (
          <li key={d.month_name}>
            {d.month_name}: Kinder {d.child}, Erwachsene {d.adult}
          </li>
        ))}
      </ul>
      <div>Monat mit höchstem Kinderanteil: {maxKinderMonat.month_name}</div>
    </aside>
  );
};

export default Sidebar;
