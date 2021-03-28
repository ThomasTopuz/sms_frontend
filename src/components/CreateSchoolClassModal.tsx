import React, {useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
} from "reactstrap";

interface props {
    onSubmit:any,
    isOpen: boolean
}

const CreateSchoolClassModal:React.FC<props> = ({isOpen, onSubmit}) => {
        return (
            <>
                {/* Modal */}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={isOpen}
                    toggle={() => setIsOpen(!isOpen)}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Modal title
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => isOpen = false}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">this is the body</div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => isOpen = false}
                        >
                            Close
                        </Button>
                        <Button 
                            color="primary" 
                            type="button"
                            onClick={()=>onSubmit()}
                            >
                            Submit
                        </Button>
                    </div>
                </Modal>
            </>
        );
}

export default CreateSchoolClassModal;
