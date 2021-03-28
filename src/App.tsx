import React from "react";
import "./App.css"; 
import Navbar from "./components/Navbar";
import './assets/css/argon-design-system-react.min.css';
import "./assets/vendor/nucleo/css/nucleo.css";
import SchoolClassesPage from "./pages/SchoolClassesPage";

function App() {
  return (
    <div>
      <Navbar />
      <SchoolClassesPage />
    </div>
  );
}

export default App;
