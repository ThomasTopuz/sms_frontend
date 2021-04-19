import React from 'react'
import Person from '../../models/Person';
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";


interface props {
    teacher: Person
}

const TeacherFacet: React.FC<props> = ({ teacher }) => {
    let history = useHistory();
    function toDetails() {
        history.push(`/teacher/${teacher.id}`);
    }
    return (
        <div className="rounded bg-white shadow-lg">
            <Button onClick={toDetails} icon="pi pi-arrow-right" className="m-1 p-button-drounded p-button-primary p-button-text float-right" />
            <div className="p-3">
                <p className="font-weight-bold">{teacher.name} {teacher.surname}, {teacher.age}</p>
                <p>{teacher.email}</p>
            </div>
        </div>
    )
}
export default TeacherFacet;
