import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="#" className="app-logo me-5">
        <span className="logo" />
        <span className="brand-name">Orbiter</span>
      </Link>
    </>
  );
}

export default Logo;
