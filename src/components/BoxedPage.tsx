import React from "react";

const BoxedPage = ({children}) => {
    return (
        <div className={"container mt-3"}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-12"}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BoxedPage;
