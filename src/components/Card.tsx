import React from "react";
import IconButton from "./IconButton";
import {Paper} from "@material-ui/core";

interface props {
    id: number,
    title: string,
    secondaryText?: string,
    goToDetailsHandler: Function
}

const Card: React.FC<props> = ({id, title, secondaryText, goToDetailsHandler}) => {
    return (
        <Paper elevation={5} className="mb-2 mt-2">
            <div className="card-body">
                <div className={"container"}>
                    <div className={"row"}>
                        <h5 className="card-title">{title}</h5>
                    </div>
                    <div className={"row justify-content-between"}>
                        <p className="card-text">{secondaryText}</p>
                        <IconButton onClickHandler={() => {
                            goToDetailsHandler(id);
                        }} text={"Details"} iconName={"ni ni-bold-right"}/>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default Card;
