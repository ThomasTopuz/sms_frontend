import React, { useEffect, useRef, useState } from 'react';
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
import { Toast } from 'primereact/toast';

const TeacherDetails: React.FC = () => {
    const { id } = useParams<any>();
    const [teacher, setTeacher] = useState<Person>();
    const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const cantDeleteToast = useRef(null);
    let history = useHistory();

    useEffect(() => {
        fetchTeacherById();
        fetchTeacherSchoolClasses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const toSchoolClassDetails = (id: number) => history.push(`/schoolclass/${id}`);

    const deleteTeacher = (): void => {
        axios.delete(`${BASE_URL}/teacher/${id}`)
            .then((res: AxiosResponse<Person>) => setTimeout(() => history.push(`/teachers`), 1500))
            .catch(err => {
                cantDeleteToast.current.show({
                    severity: 'error', summary: 'Cannot delete', detail: 'This teacher is taking classes', life: 3000
                })
                console.log("error dependency")
            });
    }
    const toggleEditMode = (): void => setEditMode(!editMode);

    const onEditTeacherFormSubmit = (data: Person) => {
        setEditMode(false);
        // put request
        axios.put(`${BASE_URL}/teacher/${id}`, data)
            .then((res: AxiosResponse<Person>) => {
                setTeacher(res.data);
            }).catch(err => console.log(err))
    }

    return (
        <BoxedPage>
            <Toast ref={cantDeleteToast} position="bottom-right" />
            <div>

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
                                schoolClasses?.map(schoolClass => (
                                    <div key={schoolClass.id}>
                                        <Card id={schoolClass.id} title={schoolClass.name}
                                            goToDetailsHandler={toSchoolClassDetails} /></div>

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
