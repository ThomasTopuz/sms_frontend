import React from 'react'
import Person from '../models/Person';
import { Button } from 'primereact/button';

interface props {
    student: Person,
    onDelete: any
}
const StudentCard: React.FC<props> = ({ student, onDelete }) => {
    return (
        <div className=" mb-3 p-grid p-align-center vertical-container">
            <div className="p-shadow-4 w-100">
                <div className="p-col-10 p-md-10 p-lg-10">
                    <p>{student.name} {student.surname}, {student.age}</p>
                    <p>{student.email}</p>
                </div>
                <div className="p-col-2 p-md-2 p-lg-2">
                    <Button onClick={() => onDelete(student.id)} label="Delete" icon="pi pi-trash" className="p-button-danger" />
                </div>
            </div>
        </div>
    );
}
export default StudentCard;
