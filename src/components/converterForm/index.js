import React from "react";
import Button from "../button";

function ConverterForm() {
  // handle submit
  const _handleSubmit = (e) => {
    e.preventDefault();
    alert("Convertion....");
  };

  return (
    <div className="converter-wrapper">
      <h1 className="color-white text-left text-md-center pb-2 pb-md-3">
        Converter
      </h1>
      <form className="converter-form" onSubmit={_handleSubmit}>
        <div className="container">
          {/* Token */}
          <div className="row mb-4">
            <div className="col-6">
              <span className="title color-primary">Token</span>
            </div>
            <div className="col-6"></div>
          </div>
          {/* SWAP-CRYPTO-SECTION */}
          <div className="row mb-3">
            <div className="swap-field ">
              <div className="col-6">
                <span className="label">From</span>
              </div>
              <div className="col-6"></div>
            </div>
          </div>
          {/* SWAP-CRYPTO-SECTION */}
          <div className="row mb-3">
            <div className="swap-field ">
              <div className="col-6">
                <span className="label">To</span>
              </div>
              <div className="col-6"></div>
            </div>
          </div>

          {/* CONVERT-BUTTON */}
          <Button text="Send" />

          {/* NOTICE */}
          <p className="text-center fs-6 fw-bold pt-4">Commission - N</p>
        </div>
      </form>
    </div>
  );
}

export default ConverterForm;
