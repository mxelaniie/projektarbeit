export const Header = ({
  eingabe,
  seteingabe,
  orte,
  selectedOrt,
  setSelectedOrt,
  backgroundColor,
  jahre,
  selectedJahr,
  setSelectedJahr,
  wappen,
}) => {
  return (
    <header className="header" style={{ backgroundColor }}>
      <div className="header-wappen header-wappen-left">
        <img src={wappen} height={80} width={60} />
      </div>

      <div className="header-center">
        <div className="header-title">
          Wann ist der Anteil der Kinder im Vergleich zu den erwachsenen
          Fussgängern am grössten an der {selectedOrt} im Jahr {selectedJahr}?
        </div>

        <div className="header-controls">
          Bitte Ort wählen:
          <select
            value={selectedOrt}
            onChange={(e) => setSelectedOrt(e.target.value)}
          >
            {orte.map((ort) => (
              <option key={ort}>{ort}</option>
            ))}
          </select>
          Bitte Jahr wählen:
          <select
            value={selectedJahr}
            onChange={(e) => setSelectedJahr(e.target.value)}
          >
            {jahre.map((jahr) => (
              <option key={jahr}>{jahr}</option>
            ))}
          </select>
          Design wählen:
          <select value={eingabe} onChange={(e) => seteingabe(e.target.value)}>
            <option value="Standard">Standard</option>
            <option value="Dunkel">Dunkel</option>
          </select>
        </div>
      </div>

      <div className="header-wappen header-wappen-right">
        <img src={wappen} height={80} width={60} />
      </div>
    </header>
  );
};
