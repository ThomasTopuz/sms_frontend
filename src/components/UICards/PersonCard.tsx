import React, { CSSProperties } from 'react'
import Person from '../../models/Person';
import { Button } from 'primereact/button';

interface props {
    person: Person,
    actionButton: {
        click: Function,
        label: string,
        icon: string,
        className?: string,
        style?: CSSProperties
    }
}

const PersonCard: React.FC<props> = ({ person, actionButton }) => {
    return (
        <div key={person.id} className="bg-white col-sm-12 shadow rounded mb-2 mt-3">
            <div className=" row justify-content-between align-items-center p-3">
                <div className="col-5">
                    <p><strong>{person.name} {person.surname}</strong>, {person.age}</p>
                    <p>{person.email}</p>
                </div>
                <Button style={actionButton.style} iconPos="right" onClick={() => actionButton.click(person.id)}
                    label={actionButton.label} icon={actionButton.icon}
                    className={actionButton.className} />
            </div>
        </div>
    );
}
export default PersonCard;
