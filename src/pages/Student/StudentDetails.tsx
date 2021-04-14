import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import BoxedPage from "../../components/common/BoxedPage";
import axios, { AxiosResponse } from "axios";
import BASE_URL from "../../config/ApiConfig";
import Person from "../../models/Person";
import SchoolClass from "../../models/SchoolClass";
import Card from "../../components/UICards/SchoolClassCard";
import DeleteButton from '../../components/common/DeleteButton';
import Alert from '../../components/common/Alert';
import EditPersonForm from '../../components/EditForms/EditPersonForm';
import EditToggleButton from '../../components/common/EditToggleButton';

const TeacherDetails: React.FC = () => {
    const { id } = useParams<any>();
    const [student, setStudent] = useState<Person>();
    const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);

    let history = useHistory();
    useEffect(() => {
        fetchTeacherById();
        fetchTeacherSchoolClasses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTeacherById = (): void => {
        axios.get(`${BASE_URL}/student/${id}`)
            .then((res: AxiosResponse<Person>) => {
                setStudent(res.data);
            }).catch(err => console.log(err));
    }
    const fetchTeacherSchoolClasses = (): void => {
        axios.get(`${BASE_URL}/student/${id}/schoolclasses`)
            .then((res: AxiosResponse<SchoolClass[]>) => setSchoolClasses(res.data))
            .catch(err => console.log(err));
    }
    const toSchoolClassDetails = (id: number) => history.push(`/schoolclass/${id}`);

    const deleteTeacher = async () => {
        axios.delete(`${BASE_URL}/student/${id}`)
            .then((res: AxiosResponse<Person>) => {
                setTimeout(() => history.push("/students"), 1500);
            })
            .catch(err => console.log(err));
    }

    const toggleEditMode = (): void => setEditMode(!editMode);

    const onEditTeacherFormSubmit = (data: Person) => {
        setEditMode(false);
        // put request
        axios.put(`${BASE_URL}/student/${id}`, data)
            .then((res: AxiosResponse<Person>) => {
                setStudent(res.data);
                setEditMode(false);
            }).catch(err => console.log(err));
    }
    return (
        <BoxedPage>

            <div className={""}>
                <div className="bg-white shadow rounded">
                    <div className="float-right flex-row m-2">
                        <EditToggleButton isEditing={editMode} toggleMode={toggleEditMode} />
                        <DeleteButton deleteHandler={deleteTeacher} />
                    </div>

                    <div className={"row justify-content-center text-center pt-4 pb-4 "}>
                        {!editMode ?
                            <div>
                                <h2>{student?.name} {student?.surname}</h2>
                                <hr />
                                <h4>{student?.email}</h4>
                                <h6>Date of birth: {student?.dob}, Age: {student?.age}</h6>
                            </div>
                            :
                            <EditPersonForm person={student!} onSubmit={onEditTeacherFormSubmit} />
                        }
                    </div>
                </div>

                <div className={"row mt-5 flex-column"}>
                    <h4>{student?.name} {student?.surname}'s classes</h4>
                    {
                        schoolClasses.length > 0 ? <>
                            {
                                schoolClasses?.map(schoolClasses => (
                                    <div key={schoolClasses.id}>
                                        <Card id={schoolClasses.id} title={schoolClasses.name}
                                            goToDetailsHandler={toSchoolClassDetails} />
                                    </div>
                                ))

                            }
                        </> :
                            <Alert message="this student has no classes" />
                    }

                </div>
            </div>
            <div>

            </div>
        </BoxedPage>
    );
}
export default TeacherDetails;
