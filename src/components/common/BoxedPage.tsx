import React from "react";
import Spinner from "./Spinner";

interface props {
    children: React.ReactNode,
    isLoading?: boolean
}
const BoxedPage: React.FC<props> = ({ isLoading, children }) => {
    return (
        <div className={`mt-3 container`}>
            <div className={"row justify-content-center"}>
                {isLoading ? <Spinner /> : <div className={"col-md-12 col-sm-12"}>{children}</div>}
            </div>
        </div>
    );
}

export default BoxedPage;
