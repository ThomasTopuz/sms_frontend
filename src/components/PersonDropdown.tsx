import React, { useState } from 'react'
import Person from '../models/Person'
import { Dropdown } from 'primereact/dropdown';

interface props {
    items: Person[],
    onChange: any

}
const PersonDropdown: React.FC<props> = ({ items, onChange }) => {
    const [selectedItem, setSelectedItem] = useState<Person>();

    const selectedOptionTemplate = (option: Person, props: any) => {
        if (option) {
            return (
                <div >
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
            <div className="p-1 row">
                <span>{option.name} {option.surname}</span>
            </div>
        );
    }
    return (
        <div>
            <Dropdown className={" w-100"} filter showClear filterBy="name" optionLabel="name" valueTemplate={selectedOptionTemplate}
                value={selectedItem} options={items} onChange={(e) => {
                    setSelectedItem(e.value);
                    onChange(e.value);
                }}
                placeholder="Select a teacher" itemTemplate={teacherOptionTemplate}
            />
        </div>
    )
}

export default PersonDropdown;
