export const Sidebar = ({ eingabe, message, selectedOrt }) => {
  return (
    <aside style={{ backgroundColor: eingabe }}>
      <div>{message}</div>
      <div>Ausgewählter Ort: {selectedOrt}</div>
    </aside>
  );
};
