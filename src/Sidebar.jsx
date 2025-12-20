export const Sidebar = ({ selectedOrt, backgroundColor }) => {
  return (
    <aside style={{ backgroundColor: backgroundColor }}>
      <div>Ausgewählter Ort: {selectedOrt}</div>
    </aside>
  );
};
