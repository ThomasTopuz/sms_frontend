import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SchoolClassesPage from "./pages/SchoolClassesPage";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import SchoolClassDetails from "./pages/SchoolClassDetails";
import TeachersPage from "./pages/TeachersPage";

function App() {
    return (
        <BrowserRouter>

            <Navbar/>
            <Switch>
                <Route exact path="/schoolclasses/:id">
                    <SchoolClassDetails/>
                </Route>
                <Route exact path="/">
                    <SchoolClassesPage/>
                </Route>
                <Route exact path="/students">
                    <p>students</p>
                </Route>
                <Route exact path="/teachers">
                    <TeachersPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
