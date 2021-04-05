import React from "react";
import { Button } from 'primereact/button';

interface props {
    id: number,
    title: string,
    secondaryText?: string,
    goToDetailsHandler: Function
}

const Card: React.FC<props> = ({ id, title, secondaryText, goToDetailsHandler }) => {
    return (
        <div className="box p-shadow-4 mb-3 mt-2">
            <div className="card-body">
                <div className={"container"}>
                    <div className={"row"}>
                        <h5 className="card-title">{title}</h5>
                    </div>
                    <div className={"row justify-content-between"}>
                        <p className="card-text">{secondaryText}</p>
                        <Button onClick={() => goToDetailsHandler(id)} iconPos="right" label="Info" icon="pi pi-arrow-circle-right" className="p-button-info" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
