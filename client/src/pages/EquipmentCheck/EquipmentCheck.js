import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./EquipmentCheck.css";

const EquipmentCheck = ({ username }) => {
  const [buildingList, setBuildingList] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
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

  const getBuildings = () => {
    axios
      .get(process.env.REACT_APP_Buildings)
      .then((response) => {
        setBuildingList(response.data);
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRoom = (selectedBuilding) => {
    axios
      .get(process.env.REACT_APP_RoomBybuilding + selectedBuilding)
      .then((response) => {
        setRoomList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEquipment = (selectedRoom) => {
    axios
      .get(process.env.REACT_APP_EquipmentByRoom + selectedRoom)
      .then((response) => {
        setEquipmentList(response.data);
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

  const addReport = () => {
    if (selectedEquipment.length === 0 || status.length === 0) {
      setFeedback(<p style={{ color: "red" }}>Input(s) cannot be blank</p>);
    } else {
      console.log(status, note, username, selectedEquipment);
      axios
        .post(process.env.REACT_APP_Report, {
          stat: status,
          notes: note,
          user: username,
          Equipment_id_equipment: selectedEquipment,
        })
        .then(() => {
          // console.log("success");
          setFeedback(
            <p style={{ color: "green" }}>Successully added report</p>
          );
        })
        .catch((error) => {
          // console.log(error);
          setFeedback(<p style={{ color: "red" }}>There was an error.</p>);
        });
    }
  };

  const handleSubmit = () => {
    addReport();
    setSelectedBuilding("");
    setSelectedRoom("");
    setSelectedEquipment("");
    setStatus("");
    setNote("");
  }

  return (
    <div className="container ">
      <h3>Create a Report</h3>
      <p>
        To make a report, fill out the equipment check below and click submit
      </p>

      <div className="form">
        <div id="SelectionSection">
          <div className="form-group">
            <Form.Label>Building Name</Form.Label>
            <select className="form-select" value={selectedBuilding} onChange={buildingOnChange}>
              <option>---select---</option>
              {buildingList.map((val, key) => {
                return (
                  <option value={val.id_building} key={key}>
                    {val.building_name} || {val.building_abv} ||{" "}
                    {val.id_building}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
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
          </div>

          <div className="form-group">
            <Form.Label>Equipment Name</Form.Label>
            <select
              className="form-select"
              value={selectedEquipment}
              onChange={(e) => {
                setSelectedEquipment(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option>---select---</option>
              {equipmentList.map((val, key) => {
                return (
                  <option value={val.id_equipment} key={key}>
                    {val.equipment_name} || {val.equipment_type} ||{" "}
                    {val.id_equipment}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div id="StatusSection">
          <Form.Label>Status</Form.Label>
          <div id="Rbutton">
            <input
              type="radio"
              value="1"
              name="status"
              onChange={(e) => {
                setStatus(e.target.value);
                console.log(e.target.value);
              }}
            />{" "}
            Working
            <br></br>
            <input
              type="radio"
              value="0"
              name="status"
              onChange={(e) => {
                setStatus(e.target.value);
                console.log(e.target.value);
              }}
            />{" "}
            Not Working
          </div>
        </div>

        <div id="NotesSection">
          <Form.Label>Notes</Form.Label>
          <textarea
            name="notes"
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          ></textarea>
        </div>
      </div>

      <div id="ButtonArea">
        <Button className="primaryBtn" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        {feedback}
      </div>
    </div>
  );
};

export default EquipmentCheck;
