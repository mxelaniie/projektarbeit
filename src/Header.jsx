export const Header = ({
  hintergrundEingabe,
  setHintergrundEingabe,
  orte,
  selectedOrt,
  setSelectedOrt,
  jahre,
  selectedJahr,
  setSelectedJahr,
  wappen,
  setTempCheck,
  tempCheck,
}) => {
  return (
    <header className="header">
      <div>
        <img src={wappen} height={80} width={70} />
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
          <div className="checkbox" onClick={() => setTempCheck(!tempCheck)}>
            Durchschnittstemperatur anzeigen:
            <div className={`checkbox-box ${tempCheck ? ".checked" : ""}`}>
              {tempCheck ? "X" : ""}
            </div>
          </div>
          Design wählen:
          <select
            value={hintergrundEingabe}
            onChange={(e) => setHintergrundEingabe(e.target.value)}
          >
            <option value="Standard">Standard</option>
            <option value="Dunkel">Dunkel</option>
          </select>
        </div>
      </div>

      <div>
        <img src={wappen} height={80} width={70} />
      </div>
    </header>
  );
};
