export const Header = ({
  Dropdown,
  setDropdown,
  Checkbox,
  setCheckbox,
  eingabe,
  seteingabe,
  wappen,
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
            justifyContent: "space-between",
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
            placeholder="Hintergrundfarbe eingeben"
            onChange={(event) => seteingabe(event.target.value)}
          />
          <input
            type="checkbox"
            id="Checkbox"
            onClick={() => setCheckbox(!Checkbox)}
          />
          <p> Rahmen </p>
          <select
            className="Dropdown"
            id="dropdown"
            onChange={(event) => setDropdown(event.target.value)}
          >
            <option value="fuchs">Fuchs</option>
            <option value="eule">Eule</option>
            <option value="spatz">Spatz</option>
          </select>
        </div>
      </div>
    </header>
  );
};
