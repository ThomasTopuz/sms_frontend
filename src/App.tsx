import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SchoolClassesPage from "./pages/SchoolClassesPage";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import SchoolClassDetails from "./pages/SchoolClassDetails";

function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar />
        <Switch>
          <Route exact path="/schoolclass/details/:id">
            <SchoolClassDetails />
          </Route>
          <Route exact path="/">
            <SchoolClassesPage />
          </Route>
          <Route exact path="/students">
            <p>students</p>
          </Route>
          <Route exact path="/teachers">
            <p>teachers</p>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
