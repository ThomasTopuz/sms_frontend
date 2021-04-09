import React from 'react'
import { Spinner as BootstrapSpinner } from "reactstrap";

const Spinner: React.FC = () => {
    return (
        <BootstrapSpinner
            style={{ width: "3rem", height: "3rem" }}
            color="default"
        />
    )
}
export default Spinner;
