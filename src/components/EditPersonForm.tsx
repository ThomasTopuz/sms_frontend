import React from 'react';
import Person from '../models/Person';
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from 'react-hook-form';
import { Button } from "primereact/button";

interface props {
    person: Person,
    onSubmit(data: formInput): void
}

interface formInput {
    name: string,
    surname: string,
    email: string
}

const EditPersonForm: React.FC<props> = ({ person, onSubmit }) => {
    const methods = useForm<formInput>();
    const { handleSubmit, register, control } = methods;
    return (
        <div>
            <div className="row">

                <Controller
                    name="name"
                    control={control}
                    defaultValue={person.name}
                    rules={{ required: true, minLength: 3, maxLength: 255 }}
                    render={({ field }) => <InputText {...field} inputRef={register("name")} name={"name"}
                        placeholder="Name"
                        className={"mr-2"} />}
                />
                <Controller
                    name="surname"
                    control={control}
                    defaultValue={person.surname}
                    rules={{ required: true, minLength: 3, maxLength: 255 }}
                    render={({ field }) => <InputText {...field} inputRef={register("surname")} name={"surname"}
                        placeholder="suname" />}
                />
            </div>

            <div className="row mt-1">
                <Controller
                    name="email"
                    control={control}
                    defaultValue={person.email}
                    rules={{ required: true, minLength: 3, maxLength: 255 }}
                    render={({ field }) => <InputText {...field} inputRef={register("email")} name={"email"}
                        placeholder="email" className={"col-12"} />}
                />
            </div>
            <div className="row justify-content-end mt-1">
                <Button label="Submit" onClick={handleSubmit(onSubmit)} className="p-button-primary" />
            </div>

        </div>
    );
}
export default EditPersonForm;