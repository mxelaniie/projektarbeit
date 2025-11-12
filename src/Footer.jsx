export const Footer = ({ setCount, eingabe }) => {
  return (
    <footer style={{ backgroundColor: eingabe }}>
      <button onClick={() => setCount(0)}>Reset</button>
    </footer>
  );
};
