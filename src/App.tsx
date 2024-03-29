import React, { useCallback, useState } from "react";
import axios from "axios";

import "./App.css";
import {
  BASE_URL,
  CANCEL_BOOKING_MESSAGE,
  TRIGGER_BLIZZARD_MESSAGE
} from "./constants";

// const BASE_URL = BASE_URL
function App() {
  const [buttonSelected, setButtonSelected] = useState<string>("");
  const [orderId, setOrderId] = useState("");
  const CancelBookingButtonAction = async () => {
    setButtonSelected("Cancel Booking!");
    alert("Cancel Booking!");
    await axios.post(`${BASE_URL}/cancel-booking`, {
      recipientNumber: "+919226916445",
      messageBody: CANCEL_BOOKING_MESSAGE,
      orderId
    });
    setButtonSelected("");
  };

  const TriggerBlizzardButtonAction = async () => {
    setButtonSelected("Trigger a Blizzard");
    await axios.post(`${BASE_URL}/notify`, {
      recipientNumber: "+919226916445",
      messageBody: TRIGGER_BLIZZARD_MESSAGE
    });
    setButtonSelected("");
  };

  const AddNewMuseumButtonAction = async () => {
    setButtonSelected("Add New Museum!");
    alert("Add New Museum!");
    await axios.post(`${BASE_URL}/update-catalog`, {});
    setButtonSelected("");
  };

  const alert = (input: string): void => {
    return;
  };
  const createButtonClass = useCallback(
    (innerText: string): string =>
      buttonSelected === innerText
        ? "border button box-selected"
        : "border button",
    [buttonSelected]
  );
  return (
    <div className="App">
      <h1>Welcome to Control Center</h1>
      <div className="border button-wrapper">
        <div
          className={createButtonClass("Trigger a Blizzard")}
          onClick={() => TriggerBlizzardButtonAction()}>
          <h3 className="button-text">Trigger a Blizzard</h3>
        </div>
        <div className={createButtonClass("Cancel Booking!")}>
          <input
            type="text"
            style={{ marginTop: "15px", width: "60%" }}
            onChange={(e) => setOrderId(e.target.value)}
            value={orderId}
            placeholder="Order Id"></input>
          <div onClick={() => CancelBookingButtonAction()}>
            <h3 className="button-text" style={{ marginTop: "13px" }}>
              Cancel <br></br>Booking!
            </h3>
          </div>
        </div>
        <div
          className={createButtonClass("Add New Museum!")}
          onClick={() => AddNewMuseumButtonAction()}>
          <h3 className="button-text">Add New Museum!</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
