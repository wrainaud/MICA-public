import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import "../App.css";

function Reports() {
  useEffect(() => {
    let ignore = false;
    if (!ignore) getReports();
    return () => {
      ignore = true;
    };
  }, []);

  const [reports, setReports] = useState([]);

  const getReports = () => {
    Axios.get(process.env.REACT_APP_Report)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Link to="./EquipmentCheck">
        <Button
          className="primaryBtn"
          variant="primary"
        >
          Add Report
        </Button>
      </Link>

      <table className="table-lg table-bordered table-light">
        <thead>
          <tr>
            <th scope="col">Building Name</th>
            <th scope="col">Room Number</th>
            <th scope="col">Friendly Name</th>
            <th scope="col">Status</th>
            <th scope="col">Notes(Optional)</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((val, idx) => (
            <tr key={idx}>
              <td>{val.building_name}</td>
              <td>{val.room_number}</td>
              <td>{val.equipment_type}</td>
              <td>{val.status === 0 ? "Not Working" : "Working"}</td>
              <td>{val.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
