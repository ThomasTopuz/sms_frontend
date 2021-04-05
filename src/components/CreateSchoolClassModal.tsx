import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Person from "../models/Person";
import axios, { AxiosResponse } from "axios";
import BASE_URL from "../config/ApiConfig";

interface props {
    onSubmit: any;
    isOpen: boolean;
    onClose: any;
}

const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

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
                console.log(res.data);
                setTeachersList(res.data);
            }).catch(err => console.log(err));
    }, []);

    function createSchoolClass() {
        axios.post(`${BASE_URL}/schoolclass`, { name: className, teacherId: teacher?.id })
            .then((data) => {
                onSubmit();
            })
            .catch(err => console.log(err));
    }
    const selectedTeacherTemplate = (option: Person, props: any) => {
        if (option) {
            return (
                <div>
                    <span>{option.name} {option.surname}</span>
                </div>
            );
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const teacherOptionTemplate = (option: Person) => {
        return (
            <div className="row border-bottom">
                <span>{option.name} {option.surname}, {option.email}</span>
            </div>
        );
    }
    return (
        <div>
            <Dialog className={""} header="Create new school class" visible={isOpen} style={{ width: '35vw' }}
                onHide={() => onClose()}>
                <div className="">
                    <h5>
                        Fill the form
                    </h5>
                </div>
                <div className="mr-2">
                    <InputText className={"m-2 w-100"} placeholder={"School Class name"} value={className}
                        onChange={(e: any) => setClassName(e.target.value)} />
                    <br />
                    <Dropdown className={"m-2 w-100"} filter showClear filterBy="name" optionLabel="name" valueTemplate={selectedTeacherTemplate}
                        value={teacher} options={teachersList} onChange={(e) => setTeacher(e.value)}
                        placeholder="Select a teacher" itemTemplate={teacherOptionTemplate}
                    />
                </div>
                <div className={"row mr-2 ml-2 justify-content-between"}>
                    <Button
                        className="p-button-secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button className="p-button-success" type="button" onClick={createSchoolClass}>
                        Submit
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default CreateSchoolClassModal;
