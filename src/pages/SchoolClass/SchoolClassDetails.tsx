import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import BoxedPage from '../../components/common/BoxedPage';
import PersonCard from '../../components/UICards/PersonCard';
import TeacherFacet from '../../components/UICards/TeacherFacet';
import BASE_URL from '../../config/ApiConfig';
import Person from '../../models/Person';
import SchoolClassResponse from '../../models/SchoolClass';
import { Button } from 'primereact/button';
import PersonDropdown from '../../components/PersonDropdown';

export default function SchoolClassDetails(props) {
    const { id } = useParams<any>(); // catch the url paam
    const [loading, setLoading] = useState<boolean>(true);
    const [schoolClass, setScholClass] = useState<SchoolClassResponse>();
    const [studentList, setStudentList] = useState<Person[]>([]);
    const [studentToAdd, setStudentToAdd] = useState<Person>();
    let history = useHistory();

    useEffect(() => {
        // call the api to GET the current schoolclass
        axios.get(`${BASE_URL}/schoolclass/${id}`)
            .then((res: AxiosResponse<SchoolClassResponse>) => {
                setScholClass(res.data);
                setLoading(false);
            })
            .catch(err => history.push("/"));
        axios.get(`${BASE_URL}/student`)
            .then(res => {
                setStudentList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const removeStudent = (id: number): void => {
        axios.put(`${BASE_URL}/schoolclass/${schoolClass?.id}/removestudent/${id}`)
            .then((res: AxiosResponse<Person>) => {
                let studentsFiltered: Person[] | undefined = schoolClass?.students.filter(student => student.id !== id);
                let newSchoolClass = { ...schoolClass!, students: studentsFiltered! };
                setScholClass(newSchoolClass);
                setLoading(false);
            }).catch(err => console.log(err));
    }

    const addStudent = (): void => {
        console.log(studentToAdd)
        axios.put(`${BASE_URL}/schoolclass/${schoolClass?.id}/addstudent/${studentToAdd?.id}`)
            .then(res => {
                setScholClass(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <BoxedPage>
            <div>
                {!loading && <div>
                    <h1>{schoolClass?.name}</h1>
                    <div className="container row justify-content-between">
                        <div className="col-md-3">

                            <h3 className="mt-3 mb-4">Teacher</h3>
                            <div className={"rounded"}>
                                {schoolClass?.teacher &&
                                    <TeacherFacet teacher={schoolClass.teacher} />
                                }
                            </div>
                        </div>
                        <div className=" col-md-8">
                            <div className="container row align-items-center mb-3 justify-content-between">
                                <h3>Students</h3>
                                <div className=" row align-items-center">
                                    <PersonDropdown items={studentList} onChange={(student) => setStudentToAdd(student)} />
                                    <Button onClick={addStudent} icon="pi pi-user-plus"
                                        className="ml-2 p-button-raised p-button-primary p-button-rounded" />
                                </div>
                            </div>
                            <div>
                                {schoolClass!.students.length > 0 ?
                                    <div>
                                        {schoolClass?.students.map((student: Person) => {
                                            return <PersonCard key={student.id} actionButton={{
                                                click: removeStudent,
                                                label: "remove",
                                                icon: "pi pi-user-minus",
                                                className: "p-button-danger",
                                                style: { backgroundColor: 'tomato' }
                                            }} person={student} />
                                        })
                                    }</div> :
                                    <div className="alert alert-primary" role="alert">
                                        No students for this school class
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </BoxedPage>
    )
}
