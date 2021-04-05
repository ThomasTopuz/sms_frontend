import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BoxedPage from '../components/BoxedPage';
import StudentCard from '../components/StudentCard';
import TeacherFacet from '../components/TeacherFacet';
import BASE_URL from '../config/ApiConfig';
import Person from '../models/Person';
import SchoolClassResponse from '../models/responseTypes/SchoolClass';
import { Button } from 'primereact/button';
import PersonDropdown from '../components/PersonDropdown';

export default function SchoolClassDetails(props) {
    const { id } = useParams<any>(); // catch the url paam
    const [loading, setLoading] = useState<boolean>(true);
    const [schoolClass, setScholClass] = useState<SchoolClassResponse>();
    const [studentList, setStudentList] = useState<Person[]>([]);
    const [studentToAdd, setStudentToAdd] = useState<Person>();

    useEffect(() => {
        // call the api to GET the current schoolclass
        axios.get(`${BASE_URL}/schoolclass/${id}`)
            .then((res: AxiosResponse<SchoolClassResponse>) => {
                setScholClass(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
        axios.get(`${BASE_URL}/student`)
            .then(res => {
                setStudentList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    function removeStudent(id: number): void {
        axios.put(`${BASE_URL}/schoolclass/${schoolClass?.id}/removestudent/${id}`)
            .then((res: AxiosResponse<Person>) => {
                let studentsFiltered: Person[] | undefined = schoolClass?.students.filter(student => student.id !== id);
                let newSchoolClass = { ...schoolClass!, students: studentsFiltered! };
                setScholClass(newSchoolClass);
                setLoading(false);
            }).catch(err => console.log(err));
    }
    function addStudent() {
        console.log(studentToAdd)
        axios.put(`${BASE_URL}/schoolclass/${schoolClass?.id}/addstudent/${studentToAdd?.id}`)
            .then(res => {
                setScholClass(res.data);
            })
            .catch(err => console.log(err));
    }
    return (
        <BoxedPage>
            <h1>{schoolClass?.name}</h1>
            <div className="p-grid">
                <div className="p-col-12 p-md-3">

                    <h3 className="mt-3">Teacher</h3>
                    <div >
                        {schoolClass?.teacher &&
                            <TeacherFacet teacher={schoolClass.teacher} />
                        }
                    </div>
                </div>
                <div className="p-col-12 p-md-9 mt-3">
                    <div className="row justify-content-start align-items-center mb-1">
                        <h3 className="mt-3 mr-1">Students</h3>
                        <PersonDropdown items={studentList} onChange={(student) => setStudentToAdd(student)} />
                        <Button onClick={addStudent} icon="pi pi-user-plus" className="float-right p-button-raised p-button-primary p-button-rounded" />
                    </div>
                    <div>
                        {
                            schoolClass?.students.map((student) => {
                                return <StudentCard key={student.id} onDelete={removeStudent} student={student} />
                            })
                        }
                    </div>
                </div>
            </div>
        </BoxedPage>
    )
}
