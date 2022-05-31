import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import AccountGroup from "../AccountGroup/AccountGroup";
import "./Navigation.css";

const Navigation = ({ username }) => {
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="light" variant="light">
      <Navbar.Brand>
        <a href="/Dashboard">
          <img
            src={
              "https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251"
            }
            style={{
              width: 60,
              marginLeft: 15,
            }}
            alt="#"
          />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/CampusMap">Campus Map</Nav.Link>
          <Nav.Link href="/EquipmentCheck">Equipment Check</Nav.Link>
          <Nav.Link href="/Reports"> Reports</Nav.Link>
          <Nav.Link href="/Weather">Weather</Nav.Link>
          <Nav.Link href="/Settings"> Settings</Nav.Link>
        </Nav>
        
        <AccountGroup username={username} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
