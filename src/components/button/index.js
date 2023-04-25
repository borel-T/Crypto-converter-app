import React from "react";

// button types => button | submit
// button styling => regular | fancy

function Button({ text = "", type = "button", styling = "", onClick = null }) {
  if (styling === "fancy") {
    return (
      <div className="app-button-fancy">
        <button className="app-button fw-bold" onClick={onClick} type={type}>
          {text}
        </button>
      </div>
    );
  }
  // default button shape
  return (
    <button className="app-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
