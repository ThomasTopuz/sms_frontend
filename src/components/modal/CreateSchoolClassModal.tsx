import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Person from "../../models/Person";
import axios, { AxiosResponse } from "axios";
import BASE_URL from "../../config/ApiConfig";
import SchoolClassResponse from "../../models/SchoolClass";
import PersonDropdown from "../PersonDropdown";

interface props {
    onSubmit: any;
    isOpen: boolean;
    onClose: any;
}

const CreateSchoolClassModal: React.FC<props> = ({
    isOpen,
    onSubmit,
    onClose,
}) => {
    const [teacher, setTeacher] = useState<Person | null>(null);
    const [className, setClassName] = useState<string>("");
    const [teachersList, setTeachersList] = useState<Person[]>([]);

    // fetch all the teachers, for the dropdown
    useEffect(() => {
        axios.get(`${BASE_URL}/teacher`)
            .then((res: AxiosResponse<Person[]>) => {
                setTeachersList(res.data);
            }).catch(err => console.log(err));
    }, []);

    function createSchoolClass() {
        axios.post(`${BASE_URL}/schoolclass`, { name: className, teacherId: teacher?.id })
            .then((res: AxiosResponse<SchoolClassResponse[]>) => {
                onSubmit(res.data);
            })
            .catch(err => console.log(err));
    }
    return (
        <Dialog className="w-50" header="Create new school class" visible={isOpen} style={{ width: '35vw' }}
            onHide={() => onClose()}>
            <div className="">
                <h5>
                    Fill the form
                </h5>
            </div>
            <div className="mr-2">
                <InputText className={"mb-2 w-100"} placeholder={"School Class name"} value={className}
                    onChange={(e: any) => setClassName(e.target.value)} />
                <br />
                <PersonDropdown className={"mb-2"} items={teachersList}
                    onChange={(teacher: Person) => setTeacher(teacher)} />
            </div>
            <div className={"row mr-2 ml-2 justify-content-end"}>
                <Button className="p-button-primary" type="button" onClick={createSchoolClass}>
                    Submit
                </Button>
            </div>
        </Dialog>
    );
};

export default CreateSchoolClassModal;
