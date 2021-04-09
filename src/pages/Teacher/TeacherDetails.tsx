import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import BoxedPage from "../../components/common/BoxedPage";
import axios, { AxiosResponse } from "axios";
import BASE_URL from "../../config/ApiConfig";
import Person from "../../models/Person";
import SchoolClass from "../../models/SchoolClass";
import Card from "../../components/UICards/SchoolClassCard";
import { Button } from 'primereact/button';
import DeleteButton from '../../components/common/DeleteButton';
import Alert from '../../components/common/Alert';
import EditPersonForm from '../../components/EditPersonForm';
import EditToggleButton from '../../components/common/EditToggleButton';

const TeacherDetails: React.FC = () => {
    const { id } = useParams<any>();
    const [teacher, setTeacher] = useState<Person>();
    const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);

    let history = useHistory();

    useEffect(() => {
        fetchTeacherById();
        fetchTeacherSchoolClasses();
    }, []);

    const fetchTeacherById = (): void => {
        axios.get(`${BASE_URL}/teacher/${id}`)
            .then((res: AxiosResponse<Person>) => {
                setTeacher(res.data);
            }).catch(err => console.log(err));
    }
    const fetchTeacherSchoolClasses = (): void => {
        axios.get(`${BASE_URL}/teacher/${id}/schoolclasses`)
            .then((res: AxiosResponse<SchoolClass[]>) => setSchoolClasses(res.data))
            .catch(err => console.log(err));
    }
    const toSchoolClassDetails = (id: number) => history.push(`/schoolclasses/${id}`);

    const deleteTeacher = (): void => {
        axios.delete(`${BASE_URL}/teacher/${id}`)
            .then((res: AxiosResponse<Person>) => history.push(`/teachers`))
            .catch(err => console.log(err));
    }
    const toggleEditMode = (): void => setEditMode(!editMode);

    const onEditTeacherFormSubmit = (data: Person) => {

        // put request
        axios.put(`${BASE_URL}/teacher/${id}`, data)
            .then((res: AxiosResponse<Person>) => {
                setTeacher(res.data);
                setEditMode(false);
            }).catch(err => console.log(err));
    }
    return (
        <BoxedPage>
            <div className={"container"}>

                <div className="bg-white shadow rounded">
                    <div className="float-right flex-row m-2">
                        <EditToggleButton isEditing={editMode} toggleMode={toggleEditMode} />
                        <DeleteButton deleteHandler={deleteTeacher} />
                    </div>

                    <div className={"row justify-content-center text-center pt-4 pb-4 "}>
                        {!editMode ?
                            <div>
                                <h2>{teacher?.name} {teacher?.surname}</h2>
                                <hr />
                                <h4>{teacher?.email}</h4>
                                <h6>Date of birth: {teacher?.dob}, Age: {teacher?.age}</h6>
                            </div>
                            :
                            <EditPersonForm person={teacher!} onSubmit={onEditTeacherFormSubmit} />
                        }
                    </div>
                </div>

                <div className={"row mt-5 flex-column"}>
                    <h4>{teacher?.name} {teacher?.surname}'s classes</h4>
                    {
                        schoolClasses.length > 0 ? <>
                            {
                                schoolClasses?.map(schoolClasses => (
                                    <Card id={schoolClasses.id} title={schoolClasses.name}
                                        goToDetailsHandler={toSchoolClassDetails} />
                                ))
                            }
                        </> :
                            <Alert message="this teacher takes no classes" />
                    }

                </div>
            </div>
            <div>

            </div>
        </BoxedPage>
    );
}
export default TeacherDetails;
