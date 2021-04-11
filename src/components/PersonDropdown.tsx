import React, { useState } from 'react'
import Person from '../models/Person'
import { Dropdown } from 'primereact/dropdown';

interface props {
    items: Person[],
    onChange: any,
    className?: string,
    defualtValue?: Person

}

const PersonDropdown: React.FC<props> = ({ items, onChange, className, defualtValue }) => {
    const [selectedItem, setSelectedItem] = useState<Person | null>(defualtValue ? defualtValue : null);

    const selectedOptionTemplate = (option: Person, props: any) => {
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
            <div>
                <span>{option.name} {option.surname}</span>
            </div>
        );
    }
    return (
        <div>
            <Dropdown className={`${className}`} filter showClear filterBy="name" optionLabel="name"
                valueTemplate={selectedOptionTemplate}
                value={selectedItem} options={items} onChange={(e) => {
                    setSelectedItem(e.value);
                    onChange(e.value);
                }}
                placeholder="Select an option" itemTemplate={teacherOptionTemplate}
            />
        </div>
    )
}

export default PersonDropdown;
