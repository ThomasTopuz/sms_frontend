import React from 'react'
import Person from '../models/Person';
import {Button} from 'primereact/button';

interface props {
    person: Person,
    actionButton: {
        click: any,
        label: string,
        icon: string,
        className: string
    }
}

const PersonCard: React.FC<props> = ({person, actionButton}) => {
    return (
        <div className="bg-white container shadow rounded mb-4">
            <div className=" row justify-content-between align-items-center p-2 pt-3">
                <div className="col-5">
                    <p><strong>{person.name} {person.surname}</strong>, {person.age}</p>
                    <p>{person.email}</p>
                </div>
                <div className={""}>
                    <Button iconPos="right" onClick={() => actionButton.click(person.id)}
                            label={actionButton.label} icon={actionButton.icon}
                            className={actionButton.className}/>
                </div>
            </div>
        </div>
    );
}
export default PersonCard;
