import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';


const Spinner: React.FC = () => {
    return (
        <div className="row justify-content-center">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
        </div>
    )
}
export default Spinner;
