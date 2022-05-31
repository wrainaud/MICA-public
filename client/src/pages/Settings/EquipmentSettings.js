import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import Axios from "axios";
import "./Settings.css";

function EquipmentSettings() {
  const [buildingList, setBuildingList] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [muEquipmentTag, setmuEquipmentTag] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getEquipment();
      getBuildings();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getEquipment = () => {
    Axios.get(process.env.REACT_APP_Equipment)
      .then((response) => {
        setEquipmentList(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEquipment = (id) => {
    Axios.delete(process.env.REACT_APP_Equipment + "/" + id, {
      data: { id_equipment: id },
    })
      .then(()=>{
        getEquipment();
        console.log("successfully deleted equipment");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBuildings = () => {
    Axios.get(process.env.REACT_APP_Buildings)
      .then((response) => {
        setBuildingList(response.data);
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRoom = (selectedBuilding) => {
    Axios.get(process.env.REACT_APP_RoomBybuilding + selectedBuilding)
      .then((response) => {
        setRoomList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buildingOnChange = (e) => {
    const buildingId = e.target.value;
    setSelectedBuilding(buildingId);
    getRoom(buildingId);
  };

  const roomOnChange = (e) => {
    const roomId = e.target.value;
    setSelectedRoom(roomId);
    getEquipment(roomId);
  };

  const addEquipment = () => {
    if (
      equipmentName === "" ||
      equipmentType === "" ||
      muEquipmentTag === "" ||
      manufacturer === "" ||
      selectedRoom.length === 0
    ) {
      setFeedback(<p style={{ color: "red" }}>Input(s) cannot be blank</p>);
    } else {
      Axios.post(process.env.REACT_APP_Equipment, {
        equipment_name: equipmentName,
        equipment_type: equipmentType,
        mu_equipment_tag: muEquipmentTag,
        manufacturer: manufacturer,
        Rooms_id_room: selectedRoom,
      })
        .then(() => {
          getEquipment();
          // console.log("success");
          setFeedback(
            <p style={{ color: "green" }}>Successully added report</p>
          );
        })
        .catch((error) => {
          console.log(error);
          setFeedback(<p style={{ color: "red" }}>There was an error.</p>);
        });
    }
  };

  const handleSubmit = () => {
    addEquipment();
    setSelectedBuilding("");
    setSelectedRoom("");
    setEquipmentName("");
    setEquipmentType("");
    setManufacturer("");
    setmuEquipmentTag("");
  }

  return (
    <div className="container">
      <h3>Equipment</h3>
      <h5>Create or Remove Any Equipment</h5>
      <Table striped bordered hover="dark">
        <thead>
          <tr>
            <th>Building</th>
            <th>Room Number</th>
            <th>Equipment Name</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>MU Tag</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.building_name}</td>
                <td>{val.room_number}</td>
                <td>{val.equipment_name}</td>
                <td>{val.equipment_type}</td>
                <td>{val.manufacturer}</td>
                <td>{val.mu_equipment_tag}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteEquipment(val.id_equipment);
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
      &nbsp;
      <div id="addToTable">
        <div className="form-group">
          <Form.Label>Building Name</Form.Label>
          <select className="form-select" value={selectedBuilding} onChange={buildingOnChange}>
            <option>---select---</option>
            {buildingList.map((val, key) => {
              return (
                <option value={val.id_building} key={key}>
                  {val.building_name} || {val.building_abv} || {val.id_building}
                </option>
              );
            })}
          </select>

          <Form.Label>Room Number</Form.Label>
          <select className="form-select" value={selectedRoom} onChange={roomOnChange}>
            <option>---select---</option>
            {roomList.map((val, key) => {
              return (
                <option value={val.id_room} key={key}>
                  {val.Buildings_id_building} || {val.room_number} ||{" "}
                  {val.id_room}
                </option>
              );
            })}
          </select>

          <Form.Label>Equipment Name</Form.Label>
          <Form.Control
            type="text"
            value={equipmentName}
            onChange={(event) => {
              setEquipmentName(event.target.value);
            }}
          ></Form.Control>

          <Form.Label>Equipment Type</Form.Label>
          <Form.Control
            type="text"
            value={equipmentType}
            onChange={(event) => {
              setEquipmentType(event.target.value);
            }}
          ></Form.Control>

          <Form.Label>Manufacturer</Form.Label>
          <Form.Control
            type="text"
            value={manufacturer}
            onChange={(event) => {
              setManufacturer(event.target.value);
            }}
          ></Form.Control>

          <Form.Label>MU Tag</Form.Label>
          <Form.Control
            type="text"
            value={muEquipmentTag}
            onChange={(event) => {
              setmuEquipmentTag(event.target.value);
            }}
          ></Form.Control>
        </div>

        <Button variant="primary" onClick={handleSubmit}>
          Add Equipment
        </Button>

        {feedback}
      </div>
    </div>
  );
}
export default EquipmentSettings;
