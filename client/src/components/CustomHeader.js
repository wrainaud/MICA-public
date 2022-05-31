import React from "react";
import mulogo from "../images/mulogo.png";

export function CustomHeader() {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src={mulogo} justify-content="center" alt="logo" width="100" height="100" />
        </div>
      );
      }
  
 export default CustomHeader;