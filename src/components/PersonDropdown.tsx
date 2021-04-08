import React, {useState} from 'react'
import Person from '../models/Person'
import {Dropdown} from 'primereact/dropdown';

interface props {
    items: Person[],
    onChange: any,
    className?: string

}

const PersonDropdown: React.FC<props> = ({items, onChange, className}) => {
    const [selectedItem, setSelectedItem] = useState<Person>();

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
            <div className="p-1 pl-2 row">
                <span>{option.name} {option.surname}, {option.email}</span>
            </div>
        );
    }
    return (
        <div>
            <Dropdown className={`w-100 ${className}`} filter showClear filterBy="name" optionLabel="name"
                      valueTemplate={selectedOptionTemplate}
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
