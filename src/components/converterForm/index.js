import React, { useEffect, useState } from "react";
// app components
import Button from "../button";
// mui components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
// api
import apiService from "../../api";
// utils
import _ from "lodash";

function ConverterForm() {
  // states
  const [cashAmount, setCashAmount] = useState("");
  const [expectedCash, setExpectedCash] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cryptos, setCryptos] = useState([]);
  const [dividend, setDividend] = useState(CRYPTOS[0]);
  const [divisor, setDivisor] = useState(CRYPTOS[1]);

  // Init form
  useEffect(() => {
    _fetchCryptos();
  }, []);

  const _fetchCryptos = () => {
    apiService
      .getCurrencies()
      .then((res) => {
        setCryptos(CRYPTOS);
      })
      .catch((error) => {
        setCryptos(CRYPTOS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // convert-currency
  const _convertCurrency = () => {
    let data = {
      cashAmount,
      dividend: dividend.id,
      divisor: divisor.id,
    };
    if (!_.isEmpty(cashAmount)) {
      apiService
        .getAmount(data)
        .then((res) => {
          // updated expected transfer amount
          setExpectedCash(res.data.amount);
        })
        .catch((error) => {
          console.log("get-amount-error", error);
        });
    }
  };

  // swap coins
  const _swapCoins = () => {
    let swap = dividend;
    // swap dividend and divisor
    setDivisor(swap);
    setDividend(divisor);
    // update conversion
    _convertCurrency();
  };

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
          {/* TOKEN */}
          <div className="row mb-4 text-center">
            <div className="col-2">
              <span className="title color-primary">Token</span>
            </div>
            <div className="col-6">
              <Autocomplete
                disableClearable
                loading={loading}
                value={dividend}
                onChange={(event, val) => {
                  setDividend(val);
                }}
                isOptionEqualToValue={(option) => option.id}
                options={cryptos}
                getOptionLabel={(option) => option.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            loading="lazy"
                            width="20"
                            src={`${dividend.image}`}
                            alt="icon"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <Box
                      component="li"
                      value={option.id}
                      key={option.id}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`${option.image}`}
                        alt="icon"
                      />
                      <span className={"ms-2"}>{option.id}</span>
                    </Box>
                  );
                }}
              />
            </div>
          </div>

          {/* TOP-COIN */}
          <div className="swap-field mb-3 ">
            <span className="label">From</span>
            {/* field-section */}
            <div className="row align-items-center">
              {/* field */}
              <div className="col-6">
                <Autocomplete
                  disableClearable
                  loading={loading}
                  value={dividend}
                  onChange={(event, val) => {
                    setDividend(val);
                  }}
                  isOptionEqualToValue={(option) => option.id}
                  options={cryptos}
                  getOptionLabel={(option) => option.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <img
                              loading="lazy"
                              width="20"
                              src={`${dividend.image}`}
                              alt="icon"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <Box
                        component="li"
                        value={option.id}
                        key={option.id}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`${option.image}`}
                          alt="icon"
                        />
                        <span className={"ms-2"}>{option.id}</span>
                      </Box>
                    );
                  }}
                />
              </div>
              {/* cash-amount */}
              <div className="col-6">
                <TextField
                  id="amount-input"
                  style={{ paddingTop: 20 }}
                  value={cashAmount}
                  type={"number"}
                  placeholder="Enter amount"
                  variant="standard"
                  helperText={"At least 0.005"}
                  onBlur={_convertCurrency}
                  onChange={(e) => setCashAmount(e.target.value)}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right" },
                    },
                  }}
                  FormHelperTextProps={{
                    style: { textAlign: "right", fontSize: 14 },
                  }}
                />
              </div>
            </div>
          </div>

          {/* SWAP COINS */}
          <div className="d-flex justify-content-center my-2">
            <IconButton size="medium" onClick={_swapCoins}>
              <SwapHorizIcon color="secondary" />
            </IconButton>
          </div>

          {/* DOWN_COIN */}
          <div className="swap-field mb-3 ">
            {/* label */}
            <span className="label">To</span>
            {/* field-section */}
            <div className="row align-items-center">
              {/* field */}
              <div className="col-6">
                <Autocomplete
                  disableClearable
                  loading={loading}
                  value={divisor}
                  onChange={(event, val) => {
                    setDivisor(val);
                  }}
                  isOptionEqualToValue={(option) => option.id}
                  options={cryptos}
                  getOptionLabel={(option) => option.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <img
                              loading="lazy"
                              width="20"
                              src={`${divisor.image}`}
                              alt="icon"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <Box
                        component="li"
                        value={option.id}
                        key={option.id}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`${option.image}`}
                          alt="icon"
                        />
                        <span className={"ms-2"}>{option.id}</span>
                      </Box>
                    );
                  }}
                />
              </div>
              {/* expected-cash */}
              <div className="col-6">
                <p style={{ textAlign: "right" }} className="fs-5 mb-0 me-3">
                  {expectedCash}
                </p>
              </div>
            </div>
          </div>

          {/* CONVERT-BUTTON */}
          <Button text="Send" type="submit" />

          {/* NOTICE */}
          <p className="text-center fs-6 fw-bold pt-4">Commission - N</p>
        </div>
      </form>
    </div>
  );
}

export default ConverterForm;

const CRYPTOS = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image:
      "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
  },
  {
    id: "usd-coin",
    symbol: "usdc",
    name: "USD Coin",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
  },
  {
    id: "staked-ether",
    symbol: "steth",
    name: "Lido Staked Ether",
    image:
      "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
  },
  {
    id: "matic-network",
    symbol: "matic",
    name: "Polygon",
    image:
      "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
  },
];
