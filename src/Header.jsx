export const Header = ({
  eingabe,
  seteingabe,
  wappen,
  zuerich,
  orte,
  selectedOrt,
  setSelectedOrt,
  backgroundColor,
}) => {
  return (
    <header>
      <div className="header-container" style={{ backgroundColor }}>
        <div className="header-top">
          <img src={wappen} width={60} height={70} />

          <div className="header-title">
            <div className="header-title-main">Fokusfrage:</div>
            <div className="header-title-sub">
              Wann ist der Anteil der Kinder im Vergleich zu den erwachsenen
              Fussgängern am grössten an der Bahnhofstrasse Mitte?
            </div>
          </div>

          <img src={zuerich} width={300} height={70} />
        </div>

        <div className="header-controls" style={{ backgroundColor }}>
          Bitte Ort wählen:
          <select
            value={selectedOrt}
            onChange={(e) => setSelectedOrt(e.target.value)}
          >
            {orte.map((ort) => (
              <option key={ort}>{ort}</option>
            ))}
          </select>
          Design wählen:
          <select value={eingabe} onChange={(e) => seteingabe(e.target.value)}>
            <option value="Standard">Standard</option>
            <option value="Grau">Grau</option>
            <option value="FH">FH</option>
          </select>
        </div>
      </div>
    </header>
  );
};
