export const Footer = ({ backgroundColor, wappen }) => {
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
        Autoren: Alina Portmann, Melanie Schiefermüller <br />
        @2025
      </span>
    </footer>
  );
};
