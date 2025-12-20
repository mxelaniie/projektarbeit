export const Header = ({
  Checkbox,
  setCheckbox,
  eingabe,
  seteingabe,
  wappen,
  zuerich,
  orte,
  selectedOrt,
  setSelectedOrt,
}) => {
  return (
    <header>
      <div
        id="Elternelement"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          border: Checkbox ? "2px solid black" : "",
          backgroundColor: eingabe,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            width: "100%",
          }}
        >
          <img src={wappen} width={60} height={70} />
          <div style={{ fontWeight: "bold", fontSize: "30px" }}>
            Fokusfrage: Wann ist der Anteil der Kinder im Vergleich zu den
            erwachsenen Fussgängern am grössten an der Bahnhofstrasse Mitte?
          </div>
          <img src={zuerich} width={400} height={70} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "10px 20px",
            backgroundColor: "#7db7d6",
            width: "100%",
          }}
        >
          Bitte Ort wählen:
          <select
            value={selectedOrt}
            onChange={(e) => setSelectedOrt(e.target.value)}
            style={{ padding: "5px" }}
          >
            {orte.map((ort) => (
              <option key={ort}>{ort}</option>
            ))}
          </select>
          Hintergrund wählen:
          <input
            type="color"
            value={eingabe}
            onChange={(event) => seteingabe(event.target.value)}
            style={{ padding: "5px" }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              id="Checkbox"
              checked={Checkbox}
              onChange={() => setCheckbox(!Checkbox)}
            />
            Rahmen
          </label>
        </div>
      </div>
    </header>
  );
};
