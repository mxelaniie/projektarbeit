export const Sidebar = ({ eingabe, setCount, count }) => {
  return (
    <aside style={{ backgroundColor: eingabe }}>
      <button onClick={() => setCount(count + 1)}>Count</button>
    </aside>
  );
};
