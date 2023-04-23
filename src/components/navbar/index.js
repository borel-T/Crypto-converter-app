import React from "react";
import Button from "../button";

function Navbar() {
  // handle connect
  const _handleConnect = () => {
    alert("Connect wallet....");
  };

  return (
    <nav className="navbar  sticky-top justify-content-between app-navbar">
      <div className="container">
        <div className="app-logo" />
        <Button
          text="Connect wallet"
          styling="fancy"
          onClick={_handleConnect}
        />
      </div>
    </nav>
  );
}

export default Navbar;
