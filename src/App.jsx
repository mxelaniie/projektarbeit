import { useState } from "react";
import "./App.css";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { MainArea } from "./MainArea.jsx";

export function App() {
  const [Dropdown, setDropdown] = useState("fuchs");
  const [Checkbox, setCheckbox] = useState();
  const [eingabe, seteingabe] = useState("");
  const wappen =
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Z%C3%BCrich.png";
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header
        Dropdown={Dropdown}
        setDropdown={setDropdown}
        Checkbox={Checkbox}
        setCheckbox={setCheckbox}
        eingabe={eingabe}
        seteingabe={seteingabe}
        wappen={wappen}
      />
      <Sidebar eingabe={eingabe} setCount={setCount} count={count} />
      <MainArea eingabe={eingabe} count={count} />
      <Footer eingabe={eingabe} setCount={setCount} />
    </div>
  );
}
