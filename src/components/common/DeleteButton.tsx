import React, { CSSProperties, useState } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { Button } from 'primereact/button';

interface props {
    style?: CSSProperties,
    className?: string
    deleteHandler: Function
}

const DeleteButton: React.FC<props> = ({ style, deleteHandler, className }) => {
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState<boolean>(false);
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    }
    const accept = (): void => deleteHandler();
    const reject = (): void => setIsConfirmationPopupOpen(false)

    return (
        <div>
            <Button style={style} id="deleteActionButton" onClick={confirm} icon="pi pi-trash" className={`${className} p-button-rounded p-button-danger`} />
            <ConfirmPopup target={document.getElementById('deleteActionButton')} visible={isConfirmationPopupOpen} onHide={reject} message="Are you sure you want to proceed?"
                icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
        </div>

    );
}
export default DeleteButton;