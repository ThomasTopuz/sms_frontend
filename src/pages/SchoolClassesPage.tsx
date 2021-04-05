import BoxedPage from "../components/BoxedPage";
import { Spinner, Alert } from "reactstrap";
import React, { useEffect, useState } from "react";
import SchoolClassResponse from "../models/responseTypes/SchoolClass";
import axios, { AxiosResponse } from "axios";
import BASE_URL from "../config/ApiConfig";
import Card from "../components/Card";
import CreateSchoolClassModal from "../components/CreateSchoolClassModal";
import { useHistory } from "react-router-dom";
import { Button } from 'primereact/button'

const SchoolClassesPage = (props: any) => {
  const [schoolClasses, setSchoolClasses] = useState<SchoolClassResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let history = useHistory();
  // api call
  useEffect(() => {
    axios
      .get(`${BASE_URL}/schoolclass`)
      .then((res: AxiosResponse<SchoolClassResponse[]>) => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
        setSchoolClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoxedPage>
      <div className={"row m-0 mt-2  justify-content-between"}>
        <h3>School classes</h3>

        <Button onClick={() => setIsModalOpen(true)} label="Create" icon="pi pi-plus-circle" className="p-button-primary" iconPos="right" />
      </div>
      <div className={"row justify-content-center"}>
        {loading ? (
          <Spinner
            className={""}
            style={{ width: "3rem", height: "3rem" }}
            color="default"
          />
        ) : (
          <div className={"col-12"}>
            {schoolClasses.length > 0 && (
              <div>
                {schoolClasses.map((schoolClass: SchoolClassResponse) => (
                  <div className={"mt-2"} key={schoolClass.id}>
                    <Card
                      id={schoolClass.id}
                      title={schoolClass.name}
                      secondaryText={`Teacher: ${schoolClass.teacher?.name} ${schoolClass.teacher?.surname}`}
                      goToDetailsHandler={(key) => {
                        history.push(`schoolclass/details/${key}`);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {schoolClasses.length === 0 && (
              <Alert color="primary" className="alert-primary mt-3">
                No SchoolClasses
              </Alert>
            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <CreateSchoolClassModal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          onSubmit={(newSchoolClass: SchoolClassResponse) => {
            setIsModalOpen(false);
            setSchoolClasses([...schoolClasses, newSchoolClass]); // spread the past and add the new item
          }}
        />
      )}
    </BoxedPage>
  );
};

export default SchoolClassesPage;
