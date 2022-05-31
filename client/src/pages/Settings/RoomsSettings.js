import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Table } from "react-bootstrap";
import Axios from "axios";
import "./Settings.css";

function RoomsSettings() {
  const [buildingList, setBuildingList] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getBuildings();
      getRooms();
    }
    return () => {
      ignore = true;
    };
  }, []);

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

  const getRooms = () => {
    Axios.get(process.env.REACT_APP_Rooms)
      .then((response) => {
        setRoomList(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addRoom = () => {
    if (selectedBuilding === "" || roomNum === "" || roomName === "") {
      setFeedback(<p style={{color: "red"}}>Input(s) cannot be blank</p>);
    } else {
      Axios.post(process.env.REACT_APP_Rooms, {
        Buildings_id_building: selectedBuilding,
        room_number: roomNum.toUpperCase().trim(),
        room_name: roomName.toUpperCase().trim(),
      })
        .then(() => {
          getRooms();
          // console.log("success");
          setFeedback(<p style={{color: "green"}}>Successully added building</p>);
        })
        .catch((error) => {
          // console.log(error);
          setFeedback(<p style={{color: "red"}}>There was an error.</p>);
        });
    }
  };

  const deleteRoom = (id) => {
    Axios.delete(process.env.REACT_APP_Rooms + "/" + id, {
      data: { id_room: id },
    }).then(() => {
      getRooms();
      console.log("successfully deleted room")
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleSubmit = () => {
    addRoom();
    setSelectedBuilding("");
    setRoomNum("");
    setRoomName("");
  }

  return (
    <div className="container">
      <h3>Rooms</h3>
      <h5>Create or Remove Any Rooms</h5>
      <Table striped bordered hover="dark">
        <thead>
          <tr>
            <th>Building</th>
            <th>Room Number</th>
          </tr>
        </thead>
        <tbody>
          {/* {roomList.slice(0,5).map((val, key) => { */}
          {roomList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.building_name}</td>
                <td>{val.room_number}</td>
                <td>
                  <Button variant="danger"
                    onClick={() => {
                      deleteRoom(val.id_room);
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
        <Form.Label>Building Name</Form.Label>
        <select className="form-select" value={selectedBuilding} onChange={(e) => setSelectedBuilding(e.target.value)}>
          <option>---select---</option>
          {buildingList.map((val, key) => {
            return (
              <option value={val.id_building} key={key}>
                {val.building_name} || {val.building_abv}
              </option>
            );
          })}
        </select>
        <Form.Label>Room Number</Form.Label>
        <Form.Control
          type="text"
          value={roomNum}
          onChange={(event) => {
            setRoomNum(event.target.value);
          }}
        ></Form.Control>
        <Form.Label>Room Type (e.g. Classroom, PC Lab, etc.)</Form.Label>
        <Form.Control
          type="text"
          value={roomName}
          onChange={(event) => {
            setRoomName(event.target.value);
          }}
        ></Form.Control>
        <Button variant="primary" onClick={handleSubmit}>Add Room</Button>
      </div>
      {feedback}
    </div>
  );
}
export default RoomsSettings;
