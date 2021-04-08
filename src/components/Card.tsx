import React from "react";
import {Button} from 'primereact/button';

interface props {
    id: number,
    title: string,
    secondaryText?: string,
    goToDetailsHandler: Function
}

const Card: React.FC<props> = ({id, title, secondaryText, goToDetailsHandler}) => {
    return (
        <div className="box shadow bg-white
         rounded mb-3 mt-2">
            <div className="card-body">
                <div className={"container"}>
                    <div className={"row justify-content-between"}>
                        <div>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{secondaryText}</p>
                        </div>
                        <Button onClick={() => goToDetailsHandler(id)} iconPos="right" label="Details"
                                icon="pi pi-arrow-circle-right" className="p-button-info"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
