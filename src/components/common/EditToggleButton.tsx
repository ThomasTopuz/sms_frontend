import React, { useState } from 'react';
import { Button } from 'primereact/button';

interface props {
    toggleMode(): void,
    isEditing: boolean
}

const EditToggleButton: React.FC<props> = ({ toggleMode, isEditing }) => {
    return (
        <>
            {isEditing ? <Button onClick={toggleMode} icon="pi pi-undo" className=" mb-1 p-button-rounded p-button-success" /> :
                <Button onClick={toggleMode} icon="pi pi-pencil" className=" mb-1 p-button-rounded p-button-warning" />}
        </>
    );
}

export default EditToggleButton;