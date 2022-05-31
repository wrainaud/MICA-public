import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import BuildingsSettings from "./BuildingsSettings";
import EquipmentSettings from "./EquipmentSettings";
import RoomsSettings from "./RoomsSettings";
import "./Settings.css";

function Settings() {
  const [showBuildings, setShowBuildings] = useState(true);
  const [showRooms, setShowRooms] = useState(false);
  const [showEquipment, setShowEquipment] = useState(false);

  const handleBuildingView = (e) => {
    e.preventDefault();

    if (showBuildings === false) {
      setShowBuildings(true);
    } else {
      setShowBuildings(false);
    }
    
    if (showRooms === true) {
      setShowRooms(false);
    }

    if (showEquipment === true) {
      setShowEquipment(false);
    }
  };


  const handleRoomView = (e) => {
    e.preventDefault();

    if (showRooms === false) {
      setShowRooms(true);
    } else {
      setShowRooms(false);
    }

    if (showBuildings === true) {
      setShowBuildings(false);
    }

    if (showEquipment === true) {
      setShowEquipment(false);
    }
  };


  const handleEquipmentView = (e) => {
    e.preventDefault();

    if (showEquipment === false) {
      setShowEquipment(true);
    } else {
      setShowEquipment(false);
    }

    if (showBuildings === true) {
      setShowBuildings(false);
    }
    
    if (showRooms === true) {
      setShowRooms(false);
    }
  };

  return (
    <>
      <div className="primaryBtn">
        <Button variant="primary" onClick={handleBuildingView}>
          Buildings Settings
        </Button>{" "}
        <Button variant="primary" onClick={handleRoomView}>Rooms Settings</Button>{" "}
        <Button variant="primary" onClick={handleEquipmentView}>Equipment Settings</Button>
      </div>
      {showBuildings && <BuildingsSettings />}
      {showRooms && <RoomsSettings />}
      {showEquipment && <EquipmentSettings />}
    </>
  );
}
export default Settings;
