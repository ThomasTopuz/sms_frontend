import React, { useEffect, useState } from 'react';
import Person from '../../models/Person';
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from 'react-hook-form';
import { Button } from "primereact/button";
import axios, { AxiosResponse } from 'axios';
import BASE_URL from '../../config/ApiConfig';
import PersonDropdown from '../PersonDropdown';

interface props {
    schoolClass: any,
    onSubmit(data: formInput): void
}

interface formInput {
    name: string,
    teacher: Person
}

const EditSchoolClassForm: React.FC<props> = ({ schoolClass, onSubmit }) => {
    const methods = useForm<formInput>();
    const { handleSubmit, register, control } = methods;
    const [teacherList, setTeacherList] = useState<Person[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/teacher`)
            .then((res: AxiosResponse<Person[]>) => setTeacherList(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="container row col-4">
            <div className="row mt-1 justify-content-between">
                <Controller
                    name="name"
                    control={control}
                    defaultValue={schoolClass.name}
                    rules={{ required: true, minLength: 3, maxLength: 255 }}
                    render={({ field }) => <InputText {...field} inputref={register("name")} name={"name"}
                        placeholder="email" className={"col-12"} />}
                />
                <Controller
                    name="teacher"
                    control={control}
                    defaultValue={schoolClass.teacher}
                    rules={{ required: true, minLength: 3, maxLength: 255 }}
                    render={({ field }) => <PersonDropdown defualtValue={schoolClass.teacher} items={teacherList}
                        onChange={(teacher: Person) => field.onChange(teacher)} className="mt-1" />}
                />
                <Button label="Submit" onClick={handleSubmit(onSubmit)} className="p-button-primary mt-1" />

            </div>
        </div >
    );
}
export default EditSchoolClassForm;