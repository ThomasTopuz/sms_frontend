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
import DeleteButton from '../../components/common/DeleteButton';
import EditToggleButton from '../../components/common/EditToggleButton';
import EditSchoolClassForm from '../../components/EditForms/EditSchoolClassForm';

export default function SchoolClassDetails(props) {
    const { id } = useParams<any>(); // catch the url paam
    const [loading, setLoading] = useState<boolean>(true);
    const [schoolClass, setScholClass] = useState<SchoolClassResponse>();
    const [studentList, setStudentList] = useState<Person[]>([]);
    const [studentToAdd, setStudentToAdd] = useState<Person>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

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
            .then((res: AxiosResponse<Person[]>) => {
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

    const deleteSchoolClass = (): void => {
        axios.delete(`${BASE_URL}/schoolclass/${id}`)
            .then((res: AxiosResponse<SchoolClassResponse>) => history.push("/"))
            .catch(err => console.log(err));
    }

    const filterStudents = (studentList: Person[]): void => {
        // filter students to avoid in dropdown students that are already in this class
        const filteredStudentList = studentList.filter(val => {
            if (schoolClass?.students.indexOf(val) === -1) {
                return val;
            }
        });
        console.log(filteredStudentList);
        setStudentList(filteredStudentList);
    }
    const editSchoolClass = (schooClass: any): void => {

        const schoolClassUpdateDTO = {
            name: schooClass.name,
            teacherId: schooClass.teacher.id
        }

        setIsEditing(false);
        axios.put(`${BASE_URL}/schoolclass/${id}`, schoolClassUpdateDTO)
            .then((res: AxiosResponse<SchoolClassResponse>) => setScholClass(res.data))
            .catch(err => console.log(err));
    }

    return (
        <BoxedPage>
            {!loading && <div>
                <div className="" >
                    <div className="shadow rounded bg-white mb-4">
                        <div className="float-right mr-2 mt-2">
                            <EditToggleButton isEditing={isEditing} toggleMode={() => setIsEditing(!isEditing)} />
                            <DeleteButton className={" mt-2 mr-2"} deleteHandler={deleteSchoolClass} />
                        </div>
                        <div className="row justify-content-center pt-4 pb-4">
                            {isEditing ? <EditSchoolClassForm schoolClass={schoolClass} onSubmit={editSchoolClass} /> : <h1>{schoolClass?.name}</h1>}

                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-4 col-sm-12">
                            <h3 className="mb-3">Teacher</h3>
                            <div className={"rounded"}>
                                <TeacherFacet teacher={schoolClass?.teacher!} />
                            </div>
                        </div>
                        <div className=" col-md-8 col-sm-12">
                            <div className="container row align-items-center mb-3 mt-3 mt-md-0 justify-content-between">
                                <h3>Students</h3>
                                <div className=" row align-items-center">
                                    <PersonDropdown items={studentList} onChange={(student) => setStudentToAdd(student)} />
                                    <Button onClick={addStudent} icon="pi pi-user-plus"
                                        className="ml-2 p-button-raised p-button-primary p-button-rounded" />
                                </div>
                            </div>
                            <div>
                                {schoolClass!.students.length > 0 ?
                                    <>
                                        {schoolClass?.students.map((student: Person) => {
                                            return <PersonCard key={student.id} actionButton={{
                                                click: removeStudent,
                                                label: "remove",
                                                icon: "pi pi-user-minus",
                                                className: "p-button-danger",
                                                style: { backgroundColor: 'tomato' }
                                            }} person={student} />
                                        })
                                        }
                                    </> :
                                    <div className="alert alert-primary" role="alert">
                                        No students for this school class
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>}
        </BoxedPage>
    )
}
