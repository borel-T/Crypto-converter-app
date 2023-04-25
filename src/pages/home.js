import React, { useEffect, useState } from "react";
// app components
import Button from "../components/button";
// mui components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// api
import apiService from "../api";
// utils
import _ from "lodash";
// icons
import alienIcon from "../assets/images/alien.png";
import clockIcon from "../assets/images/clock-solid.svg";

function ConverterForm() {
  // states
  const [cashAmount, setCashAmount] = useState("");
  const [transferFee, setTransferFee] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [calcLoading, setCalcLoading] = useState(false);
  const [cryptos, setCryptos] = useState([]);
  const [dividend, setDividend] = useState("");
  const [divisor, setDivisor] = useState("");

  // initialize form
  useEffect(() => {
    _fetchCryptos();
  }, []);

  // fetch-cryptos
  const _fetchCryptos = () => {
    setLoading(true);
    apiService
      .getCurrencies()
      .then((res) => {
        let list = res.data.currencies;
        if (!_.isEmpty(list)) {
          console.log("API-cryptos->");
          setDividend(list[0]); // set divisor initial state
          setDivisor(list[1]); // set divisor initial state
          setCryptos(list); // populate crypto list
        } else {
          console.log("Local-cryptos->");
          setDividend(CRYPTOS[0]);
          setDivisor(CRYPTOS[1]);
          setCryptos(CRYPTOS);
        }
      })
      .catch((error) => {
        setDividend(CRYPTOS[0]);
        setDivisor(CRYPTOS[1]);
        setCryptos(CRYPTOS);

        console.log("fetch-cryptos-error->", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // convert-currency
  const _convertCurrency = () => {
    // let
    let userCash = parseFloat(cashAmount);

    if (userCash > 0) {
      // prepare payload
      let data = {
        cashAmount: userCash,
        dividend: dividend.id,
        divisor: divisor.id,
      };
      // loader
      setCalcLoading(true);
      // call api
      apiService
        .getAmount(data)
        .then((res) => {
          // updated expected transfer amount
          console.log("get-amount::--->", res.data);
          let transAmt = parseFloat(res.data.amount).toFixed(4);
          let transFee = parseFloat(res.data.fee).toFixed(4);
          setTransferAmount(transAmt); // amount to transfer
          setTransferFee(transFee); // fee to transfer
        })
        .catch((error) => {
          console.log("get-amount-error", error);
        })
        .finally(() => {
          setCalcLoading(false);
        });
    }
  };

  // swap-coins-fields
  const _swapCoins = () => {
    let swap = dividend;
    // swap dividend and divisor
    setDivisor(swap);
    setDividend(divisor);
    // update transfer amount
    _convertCurrency();
  };

  // handle-submit
  const _handleSubmit = (e) => {
    e.preventDefault();
    alert("Send....");
  };

  return (
    <div className="converter-wrapper mt-4">
      <form className="converter-form shadow-lg" onSubmit={_handleSubmit}>
        <div className="container">
          <p className="title color-primary mb-4 fs-4">Token</p>

          {/* TOP-COIN */}
          <div className="swap-field">
            <span className="label mb-3 d-block">From</span>
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
                    _convertCurrency();
                  }}
                  isOptionEqualToValue={(option) =>
                    option.id ? option.id : ""
                  }
                  options={cryptos}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        style: { fontSize: 20 },
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
                        <span className={"ms-2"}>{option.name}</span>
                      </Box>
                    );
                  }}
                />
              </div>
              {/* cash-amount */}
              <div className="col-6">
                <TextField
                  id="amount-input"
                  value={cashAmount}
                  type={"number"}
                  autoComplete="false"
                  placeholder="At least 0.005"
                  variant="standard"
                  onBlur={() => {
                    _convertCurrency();
                  }}
                  onChange={(e) => setCashAmount(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 20 },
                    inputProps: {
                      style: { textAlign: "right" },
                    },
                  }}
                  FormHelperTextProps={{
                    style: {
                      textAlign: "right",
                      fontSize: 14,

                      fontWeight: "bold",
                    },
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
            {/* field-section */}
            <div className="row align-items-center">
              {/* field */}
              <div className="col-6">
                {/* label */}
                <span className="label d-block mb-3">To</span>
                <Autocomplete
                  disableClearable
                  loading={loading}
                  value={divisor}
                  onChange={(event, val) => {
                    setDivisor(val);
                    _convertCurrency();
                  }}
                  isOptionEqualToValue={(option) =>
                    option.id ? option.id : ""
                  }
                  options={cryptos}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        style: { fontSize: 20 },
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
                        <span className={"ms-2"}>{option.name}</span>
                      </Box>
                    );
                  }}
                />
              </div>
              {/* transfer-cash */}
              <div className="col-6">
                <span className="label d-block text-end mb-3 me-3 text-">
                  Fee
                </span>
                <p
                  style={{ textAlign: "right" }}
                  className="fs-4 mb-0 me-3 fw-bold"
                >
                  {!calcLoading ? (
                    <span>{transferAmount}</span>
                  ) : (
                    <CircularProgress size={15} color="secondary" />
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* CONVERT-BUTTON */}
          <Button text="SEND" type="submit" />
        </div>

        {/* test */}
        <div className="ms-3 mt-4">
          <p className="d-flex align-items-center gas-fee">
            <img
              className="me-2"
              style={{ height: 20, width: 20 }}
              src={alienIcon}
            ></img>
            <span> Gas Fee Saved |</span>
            <span className="ms-2 color-primary fw-bold">Save 0.7 - 2.25$</span>
          </p>
          <p className="d-flex align-items-center gas-fee">
            <img
              className="me-2"
              style={{ height: 16, width: 16 }}
              src={clockIcon}
            ></img>
            <span>Time spend 45s |</span>
            <span className="ms-2 color-primary fw-bold">Save 10 Min</span>
          </p>
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
