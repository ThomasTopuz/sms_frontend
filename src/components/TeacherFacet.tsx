import React from 'react'
import Person from '../models/Person';

interface props {
    teacher: Person
}
const TeacherFacet: React.FC<props> = ({ teacher }) => {
    return (
        <div className="box p-shadow-4">
            <div className="p-3">
                <p>{teacher.name} {teacher.surname}, {teacher.age}</p>
                <p>{teacher.email}</p>
            </div>
        </div>
    )
}
export default TeacherFacet;
