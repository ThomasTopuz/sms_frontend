import BoxedPage from "../../components/common/BoxedPage";
import React, { useEffect, useState } from "react";
import SchoolClassResponse from "../../models/SchoolClass";
import axios, { AxiosResponse } from "axios";
import BASE_URL from "../../config/ApiConfig";
import Card from "../../components/UICards/SchoolClassCard";
import CreateSchoolClassModal from "../../components/modal/CreateSchoolClassModal";
import { useHistory } from "react-router-dom";
import { Button } from 'primereact/button'
import Alert from '../../components/common/Alert';

const SchoolClassesPage = (props: any) => {
    const [schoolClasses, setSchoolClasses] = useState<SchoolClassResponse[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    let history = useHistory();
    // api call
    useEffect(() => {
        axios
            .get(`${BASE_URL}/schoolclass`)
            .then((res: AxiosResponse<SchoolClassResponse[]>) => {
                setSchoolClasses(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <BoxedPage>
            <div className={""}>
                <div className={"row mt-2  justify-content-between"}>
                    <h3>School classes</h3>
                    <Button onClick={() => setIsModalOpen(true)} label="Create" icon="pi pi-plus-circle"
                        className="p-button-primary" iconPos="right" />
                </div>
                <div className={"row justify-content-center"}>
                    <div className={"col-12 p-0"}>
                        {schoolClasses.length > 0 && (
                            <div>
                                {schoolClasses.map((schoolClass: SchoolClassResponse) => (
                                    <div className={"mt-2"} key={schoolClass.id}>
                                        <Card
                                            id={schoolClass.id}
                                            title={schoolClass.name}
                                            secondaryText={`Teacher: ${schoolClass.teacher?.name} ${schoolClass.teacher?.surname}`}
                                            goToDetailsHandler={key => {
                                                history.push(`schoolclasses/${key}`);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {schoolClasses.length === 0 && <Alert message="no school classes" />}
                    </div>

                </div>
                {isModalOpen &&
                    <CreateSchoolClassModal
                        onClose={() => setIsModalOpen(false)}
                        isOpen={isModalOpen}
                        onSubmit={(newSchoolClass: SchoolClassResponse) => {
                            setIsModalOpen(false);
                            setSchoolClasses([...schoolClasses, newSchoolClass]); // spread the past and add the new item
                        }}
                    />
                }
            </div>

        </BoxedPage>
    );
};

export default SchoolClassesPage;
