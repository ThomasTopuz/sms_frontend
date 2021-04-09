import React from 'react'
import { Alert as ReactstrapAlert } from 'reactstrap';

interface props {
    message: String
}

const Alert: React.FC<props> = ({ message }) => {
    return (
        <ReactstrapAlert color="primary" className="alert-primary mt-3">
            {message}
        </ReactstrapAlert>
    );
}
export default Alert;
