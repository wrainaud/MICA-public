import React from "react";
import ActivityLog from "../../components/ActivityLog";
// import Calendar from "../../components/Calendar";
import DashboardReportTable from "../../components/DashboardReportTable";
import "../../App.css";
import "./Dashboard.css";
import Calendar, { CenturyView } from 'react-calendar'; 


function Dashboard() {
  return (
    <div id="wholePage">
      <div id="recentReports" style={{ background: "white" }}>
        <h3> Recent Reports </h3>
        <DashboardReportTable></DashboardReportTable>
      </div>

      <section style={{ width: "100%", marginTop: "1%" }}>
        <div id="activityLog" style={{ background: "white", height: "300px",  }}>
          <h3>Activity Log </h3>
          <ActivityLog />
        </div>
        <div id="caldiv" style={{ background: "white", height: "300px" }}>
          <div id="cal">
          <Calendar/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
