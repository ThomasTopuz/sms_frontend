import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SchoolClassesPage from "./pages/SchoolClassesPage";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import SchoolClassDetails from "./pages/SchoolClassDetails";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Switch>

          <Route exact path="/schoolclass/details/:id">
            <SchoolClassDetails />
          </Route>
          <Route exact path="/">
            <SchoolClassesPage />
          </Route>

          <Route exact path="/students">
            <p>ciao</p>
          </Route>
        </Switch>
      </BrowserRouter>,
    </div>
  );
}

export default App;
