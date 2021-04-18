import React, { useEffect, useState } from 'react';
import BASE_URL from "../../config/ApiConfig";
import axios, { AxiosResponse } from "axios";
import Person from "../../models/Person";
import { useHistory } from "react-router-dom";
import BoxedPage from "../../components/common/BoxedPage";
import PersonCard from "../../components/UICards/PersonCard";
import { Button } from "primereact/button";
import CreatePersonModal from "../../components/modal/CreatePersonModal";
import PersonCreate from "../../models/PersonCreateDTO";
import Alert from '../../components/common/Alert';

const StudentsPage = () => {
    const [students, setStudents] = useState<Person[]>([]);
    let history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // fetch all teachers
        axios.get(`${BASE_URL}/student`)
            .then((res: AxiosResponse<Person[]>) => {
                setStudents(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    function toDetails(id: number) {
        history.push(`student/${id}`);
    }

    function createTeacher(data: PersonCreate) {
        axios.post(`${BASE_URL}/student`, data)
            .then((res) => {
                setStudents([...students, res.data]);
                setIsModalOpen(false);
            }).catch(err => console.log(err));
    }

    return (
        <BoxedPage isLoading={isLoading}>
            <div className={"mb-2"}>
                <div className={"row justify-content-between"}>
                    <h2>Students</h2>
                    <Button onClick={() => setIsModalOpen(true)} label="Create" icon="pi pi-plus-circle"
                        className="p-button-primary p-button" iconPos="right" />
                </div>

                <CreatePersonModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}
                    onModalSubmit={(data: PersonCreate) => createTeacher(data)} title="Create a new student" />
            </div>
            <div className="row flex-column">
                {students.length > 0 ?
                    <div>{students.map((student: Person) => {
                        return <div key={student.id}>
                            <PersonCard person={student} actionButton={{
                                click: toDetails,
                                label: 'Details',
                                icon: 'pi pi-arrow-circle-right',
                                className: 'p-button-info'
                            }} /></div>
                    })}
                    </div>
                    :
                    <Alert message="no students" />
                }
            </div>
        </BoxedPage>
    );
}


export default StudentsPage;
