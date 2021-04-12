import React from "react";
import { isMobile } from 'react-device-detect';

const BoxedPage = ({ children }) => {
    let responsiveClassname = !isMobile ? 'container' : '';
    return (
        <div className={`mt-3 ${responsiveClassname}`}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-12"}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BoxedPage;
