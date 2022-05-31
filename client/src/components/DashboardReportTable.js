import React, { useState, useEffect } from "react";
import Axios from "axios";

function EquipmentForm() {
  const [recentReports, setRecentReports] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) getRecentReports();
    return () => {
      ignore = true;
    };
  }, []);

  const getRecentReports = () => {
    Axios.get(process.env.REACT_APP_ReportRecent)
      .then((response) => {
        setRecentReports(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="recentReportsTable" className="dashboardContainer">
      <table className="table-lg table-bordered table-light table-hover table-sm" >
        <thead>
          <tr>
            <th scope="col">Building Name</th>
            <th scope="col">Room Number</th>
            <th scope="col">Equipment Name</th>
            <th scope="col">Status</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {recentReports.map((d, i) => (
            <tr key={i}>
              <td>{d.building_name}</td>
              <td>{d.room_number}</td>
              <td>{d.equipment_type}</td>
              <td>{d.status === 0 ? "Not Working" : "Working"}</td>
              <td>{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentForm;
