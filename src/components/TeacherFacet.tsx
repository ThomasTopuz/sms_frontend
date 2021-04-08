import React from 'react'
import Person from '../models/Person';

interface props {
    teacher: Person
}

const TeacherFacet: React.FC<props> = ({teacher}) => {
    return (
        <div className="rounded bg-white shadow-lg">
            <div className="p-3">
                <p>{teacher.name} {teacher.surname}, {teacher.age}</p>
                <p>{teacher.email}</p>
            </div>
        </div>
    )
}
export default TeacherFacet;
