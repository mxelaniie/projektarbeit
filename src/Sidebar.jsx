export const Sidebar = ({ eingabe, message, selectedOrt }) => {
  return (
    <aside style={{ backgroundColor: eingabe }}>
      <div>{message}</div>
      <div>Ausgewaehlter Ort: {selectedOrt}</div>
    </aside>
  );
};
