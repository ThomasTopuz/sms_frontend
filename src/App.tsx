import React from "react";
import "./App.css";
import Navbar from "./components/common/Navbar";
import SchoolClassesPage from "./pages/SchoolClass/SchoolClassesPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SchoolClassDetails from "./pages/SchoolClass/SchoolClassDetails";
import TeachersPage from "./pages/Teacher/TeachersPage";
import TeacherDetails from "./pages/Teacher/TeacherDetails";
import StudentsPage from "./pages/Student/StudentsPage";
import StudentDetails from "./pages/Student/StudentDetails";

const App: React.FC = () => (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/schoolclass/:id">
                <SchoolClassDetails />
            </Route>
            <Route exact path="/teacher/:id">
                <TeacherDetails />
            </Route>

            <Route exact path="/student/:id">
                <StudentDetails />
            </Route>
            <Route exact path="/students">
                <StudentsPage />
            </Route>
            <Route exact path="/teachers">
                <TeachersPage />
            </Route>
            <Route exact path="/">
                <SchoolClassesPage />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default App;
