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
      <div
        id="Elternelement"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: backgroundColor,
          width: "100%",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              flex: 1,
              padding: "0 20px",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#444",
                marginBottom: "6px",
              }}
            >
              Fokusfrage:
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "",
                color: "#444",
                marginBottom: "6px",
                lineHeight: "1.3",
                maxWidth: "900px",
              }}
            >
              Wann ist der Anteil der Kinder im Vergleich zu den erwachsenen
              Fussgängern am grössten an der Bahnhofstrasse Mitte?
            </div>
          </div>
          <img src={zuerich} width={400} height={70} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "10px 20px",
            backgroundColor: backgroundColor,
            border: "px solid black",
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
          Design wählen:
          <select
            value={eingabe}
            onChange={(e) => seteingabe(e.target.value)}
            style={{ padding: "5px" }}
          >
            <option value="Standard">Standard</option>
            <option value="Grau">Grau</option>
            <option value="FH">FH</option>
          </select>
        </div>
      </div>
    </header>
  );
};
