import React from "react";
import "./App.css";
import Navbar from "./components/common/Navbar";
import SchoolClassesPage from "./pages/SchoolClass/SchoolClassesPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SchoolClassDetails from "./pages/SchoolClass/SchoolClassDetails";
import TeachersPage from "./pages/Teacher/TeachersPage";
import TeacherDetails from "./pages/Teacher/TeacherDetails";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/schoolclasses/:id">
                    <SchoolClassDetails />
                </Route>
                <Route exact path="/teachers/:id">
                    <TeacherDetails />
                </Route>
                <Route exact path="/">
                    <SchoolClassesPage />
                </Route>
                <Route exact path="/students">
                    <p>students</p>
                </Route>
                <Route exact path="/teachers">
                    <TeachersPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
