//Initialization
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";

//Styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css";

//Components
import Navigation from "./components/Navigation/Navigation";
import CampusMap from "./pages/CampusMap";
import Weather from "./components/Weather/Weather";
import Footer from "./components/Footer/Footer";
import CustomHeader from "./components/CustomHeader";
import CustomFooter from "./components/CustomFooter";

//Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import Reports from "./pages/Reports";
import EquipmentCheck from "./pages/EquipmentCheck/EquipmentCheck";

const components = {
  Header() {
    return <CustomHeader />;
  },

  Footer() {
    return <CustomFooter />;
  },
};

//Main Application Function
function App() {
  return (
    <>
      <Authenticator components={components}>
        {({ user }) => (
          <Container fluid>
            <div className="App">
              <Navigation username={user.attributes.name} />
              <Router>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/Dashboard" component={Dashboard} />
                <Route exact path="/Reports" component={Reports} />
                <Route exact path="/CampusMap" component={CampusMap} />
                <Route exact path="/EquipmentCheck" component={() => ( <EquipmentCheck username={user.attributes.name} /> )}/>
                <Route exact path="/Weather" component={Weather} />
                <Route exact path="/Settings" component={Settings} />
              </Router>
            </div>
            <Footer />
          </Container>
        )}
      </Authenticator>
    </>
  );
}

export default App;
