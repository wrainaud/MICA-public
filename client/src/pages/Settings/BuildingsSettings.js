import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Table } from "react-bootstrap";
import Axios from "axios";
import "./Settings.css";
import { isTerminatorless } from "@babel/types";
function BuildingsSettings() {
  const [buildingName, setBuildingName] = useState("");
  const [buildingAbv, setBuildingAbv] = useState("");
  const [buildingList, setBuildingList] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getBuildings();
    }
    return () => {
      ignore = true;
    };
  }, []);



  const addBuilding = () => {
    if (buildingName === "" || buildingAbv === "") {
      setFeedback(<p style={{color: "red"}}>Input(s) cannot be blank</p>);
    } else {
      Axios.post(process.env.REACT_APP_Buildings, {
        building_name: buildingName.toUpperCase().trim(),
        building_abv: buildingAbv.toUpperCase().trim(),
      })
        .then(() => {
          setBuildingList([
            ...buildingList,
            {
              building_name: buildingName.toUpperCase().trim(),
              building_abv: buildingAbv.toUpperCase().trim(),
            },
          ]);
          getBuildings();
          // console.log("success");
          setFeedback(<p style={{color: "green"}}>Successully added building</p>);
        })
        .catch((error) => {
          // console.log(error);
          setFeedback(<p style={{color: "red"}}>There was an error.</p>);
        });
    }
  };

  const getBuildings = () => {
    Axios.get(process.env.REACT_APP_Buildings)
      .then((response) => {
        setBuildingList(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBuilding = (id) => {
    Axios.delete(process.env.REACT_APP_Buildings + "/" + id, {
      data: { id_building: id },
    }).then(() => {
      getBuildings();
      console.log("successfully deleted building")
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleSubmit = () => {
    addBuilding();
    setBuildingName("");
    setBuildingAbv("");
  }
  
  return (
    <div className="container">
        <h3>Building Settings</h3>
        <h5>Create or Remove Any Buildings</h5>
      <Table striped bordered hover="dark">
        
        <thead>
          <tr>
            <th>Building Name</th>
            
            <th>Abbreviation</th>
          </tr>
        </thead>
        <tbody>
          {buildingList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{(val.building_name)}</td>
                <td>{val.building_abv}</td>
                <td>
                  <Button variant="danger"
                    onClick={() => {
                      deleteBuilding(val.id_building);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <span> </span>
      &nbsp;
      <div id="addToTable">
        <Form.Label>Building Name</Form.Label>
        <Form.Control
          type="text"
          value={buildingName}
          onChange={(event) => {
            setBuildingName(event.target.value);
          }}
        ></Form.Control>
        <Form.Label>Building Abbreviation</Form.Label>
        <Form.Control
          type="text"
          value={buildingAbv}
          onChange={(eventAbv) => {
            setBuildingAbv(eventAbv.target.value);
          }}
        ></Form.Control>
        <Button variant="primary" onClick={handleSubmit}>Add Building</Button>
      </div>
      {feedback}
    </div>
  );
}
export default BuildingsSettings;
