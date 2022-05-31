import React, { useState, useEffect } from "react";
import Axios from "axios";

function ActivityLog() {
  useEffect(() => {
    let ignore = false;
    if (!ignore) getReports();
    return () => {
      ignore = true;
    };
  }, []);

  const [reports, setReports] = useState([]);

  const getReports = () => {
    Axios.get(process.env.REACT_APP_ReportRecent)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="dashboardContainer">
      <table className="table-lg table-bordered table-light table-hover " style={{ margin: "auto"}}>
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Check Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((val, idx) => (
            <tr key={idx}>
              <td>{val.user}</td>
              <td>{val.check_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityLog;
