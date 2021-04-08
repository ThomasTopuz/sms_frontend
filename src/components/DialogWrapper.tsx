import React from 'react';
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";

interface props {
    onClose:Function,
    onSubmit:Function,
    children:React.FC<any>
}
const DialogWrapper:React.FC<props> = ({onClose, onSubmit, children}) => {
    return(
        <div></div>
    );
}

export default DialogWrapper;
