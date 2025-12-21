export const Footer = ({ backgroundColor}) => {
  return (
    <footer
      style={{
        backgroundColor: backgroundColor,
        textAlign: "center",
        padding: "20px",
      }}
    >
      <span>
        Modul: 3050 WebDev & interaktive DataVis <br />
        Datenquelle: https://data.stadt-zuerich.ch/dataset/hystreet_fussgaengerfrequenzen <br />
        Autoren: Alina Portmann, Melanie Schiefermüller <br />
        @2025
      </span>
    </footer>
  );
};
