export const Header = ({
  Checkbox,
  setCheckbox,
  eingabe,
  seteingabe,
  wappen,
  orte,
  selectedOrt,
  setSelectedOrt,
}) => {
  return (
    <header>
      <div className="App">
        <div
          id="Elternelement"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            border: Checkbox ? "2px solid black" : "",
            justifyContent: "left",
            backgroundColor: eingabe,
            fontFamily: "Arial, sans-serif",
            alignItems: "center",
          }}
        >
          <img src={wappen} width={50} height={50} />
          <div>Passanten Zürich</div>
          <input
            type="text"
            id="text"
            placeholder="Hintergrund wählen (blue)"
            onChange={(event) => seteingabe(event.target.value)}
          />
          <input
            type="checkbox"
            id="Checkbox"
            onClick={() => setCheckbox(!Checkbox)}
          />
          <p> Rahmen </p>
          <select
            value={selectedOrt} // Wert Dropdown = ausgewählter Ort
            onChange={(e) => setSelectedOrt(e.target.value)}
          >
            {orte.map((ort) => (
              <option key={ort}>{ort}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
