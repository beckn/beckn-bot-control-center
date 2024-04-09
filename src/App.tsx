import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import {
  BASE_URL_PROD,
  CANCEL_BOOKING_MESSAGE,
  TRIGGER_BLIZZARD_MESSAGE,
  TOURISM_STRAPI_URL,
  HOTEL_STRAPI_URL,
  ENERGY_STRAPI_URL,
  RETAIL_STRAPI_URL,
  STRAPI_TOURISM_TOKEN,
  STRAPI_HOTEL_TOKEN,
  STRAPI_ENERGY_TOKEN,
  STRAPI_RETAIL_TOKEN,
  STATUS_CODE
} from "./constants";

function App() {
  const [buttonSelected, setButtonSelected] = useState<string>("");
  const [orderId, setOrderId] = useState("");
  const [retailOrderId, setRetailOrderId] = useState("");
  const [tourismOrderId, setTourismOrderId] = useState("");
  const [hotelOrderId, setHotelOrderId] = useState("");
  const [energyOrderId, setEnergyOrderId] = useState("");
  const [newRetailStatus, setNewRetailStatus] = useState("");
  const [newHotelStatus, setNewHotelStatus] = useState("");
  const [newEnergyStatus, setNewEnergyStatus] = useState("");
  const [newTourismStatus, setNewTourismStatus] = useState("");
  const [retailOrderIds, setRetailOrderIds] = useState([]);
  const [tourismOrderIds, setTourismOrderIds] = useState([]);
  const [energyOrderIds, setEnergyOrderIds] = useState([]);
  const [hotelOrderIds, setHotelOrderIds] = useState([]);
  const [retailStatusSelect, setRetailStatusSelect] = useState("");
  const [hotelStatusSelect, setHotelStatusSelect] = useState("");
  const [tourismStatusSelect, setTourismStatusSelect] = useState("");
  const [energyStatusSelect, setEnergyStatusSelect] = useState("");

  const getOrdersFromStrapi = async () => {
    const tourismOrders = await axios.get(
      `${TOURISM_STRAPI_URL}/order-fulfillments?sort=order_id.id:desc&populate=order_id`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOURISM_TOKEN}`
        }
      }
    );

    setTourismOrderIds(tourismOrders.data.data.slice(0, 5));
    const retailOrders = await axios.get(
      `${RETAIL_STRAPI_URL}/order-fulfillments?sort=order_id.id:desc&populate=order_id`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_RETAIL_TOKEN}`
        }
      }
    );
    setRetailOrderIds(retailOrders.data.data.slice(0, 5));
    const energyOrders = await axios.get(
      `${ENERGY_STRAPI_URL}/order-fulfillments?sort=order_id.id:desc&populate=order_id`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_ENERGY_TOKEN}`
        }
      }
    );
    setEnergyOrderIds(energyOrders.data.data.slice(0, 5));
    const hotelOrders = await axios.get(
      `${HOTEL_STRAPI_URL}/order-fulfillments?sort=order_id.id:desc&populate=order_id`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_HOTEL_TOKEN}`
        }
      }
    );

    setHotelOrderIds(hotelOrders.data.data.slice(0, 5));
  };
  useEffect(() => {
    getOrdersFromStrapi();
  }, []);

  const CancelBookingButtonAction = async () => {
    setButtonSelected("Cancel Booking!");
    await axios.post(`${BASE_URL_PROD}/cancel-booking`, {
      recipientNumber: "+919226916445",
      messageBody: CANCEL_BOOKING_MESSAGE,
      orderId
    });
    setButtonSelected("");
  };

  const TriggerBlizzardButtonAction = async () => {
    setButtonSelected("Trigger a Blizzard");
    await axios.post(`${BASE_URL_PROD}/notify`, {
      recipientNumber: "+919226916445",
      messageBody: TRIGGER_BLIZZARD_MESSAGE
    });
    setButtonSelected("");
  };

  const AddNewMuseumButtonAction = async () => {
    setButtonSelected("Add New Museum!");

    await axios.post(`${BASE_URL_PROD}/update-catalog`, {});
    setButtonSelected("");
  };

  const UpdateStatusButtonAction = async (orderId: any, domain: string) => {
    if (domain === "retail") {
      setNewRetailStatus("");
      const response = await axios.post(`${BASE_URL_PROD}/update-status`, {
        orderId: orderId?.attributes?.order_id?.data?.id,
        status: retailStatusSelect,
        domain
      });
      setNewRetailStatus(response?.data?.message);
    }
    if (domain === "tourism") {
      setNewTourismStatus("");
      const response = await axios.post(`${BASE_URL_PROD}/update-status`, {
        orderId: orderId?.attributes?.order_id?.data?.id,
        status: tourismStatusSelect,
        domain
      });
      setNewTourismStatus(response?.data?.message);
    }
    if (domain === "hotel") {
      setNewHotelStatus("");

      const response = await axios.post(`${BASE_URL_PROD}/update-status`, {
        orderId: orderId?.attributes?.order_id?.data?.id,
        status: hotelStatusSelect,
        domain
      });
      setNewHotelStatus(response?.data?.message);
    }
    if (domain === "energy") {
      setNewEnergyStatus("");
      const response = await axios.post(`${BASE_URL_PROD}/update-status`, {
        orderId: orderId?.attributes?.order_id?.data?.id,
        status: energyStatusSelect,
        domain
      });
      setNewEnergyStatus(response?.data?.message);
    }
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
        <br></br>
        <br></br>
        <br></br>

        <div>
          <table>
            <thead>
              <tr>
                <th>RETAIL</th>
                <th>HOTEL</th>
                <th>TOURISM</th>
                <th>ENERGY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={createButtonClass("Fulfillment")}>
                    <select
                      name="retail"
                      id="retail-ids"
                      style={{ marginTop: "15px", width: "60%" }}
                      onChange={(e) => {
                        setNewRetailStatus(
                          `Currrent Status: ${
                            JSON.parse(e.target.value)?.attributes?.state_code
                          }`
                        );
                        setRetailOrderId(JSON.parse(e.target.value));
                      }}>
                      <option value={`{}`}>Select Order Id</option>
                      {retailOrderIds.map((order: any) => {
                        return (
                          <option value={JSON.stringify(order)}>
                            {order?.attributes.order_id.data.id}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      name="retail-status"
                      id="retail-status"
                      style={{ marginTop: "8px", width: "80%" }}
                      onChange={(e) => {
                        setRetailStatusSelect(e.target.value);
                      }}>
                      <option value={`{}`}>Select Status Code</option>
                      {STATUS_CODE.retail.map((code: any) => {
                        return <option value={code}>{code}</option>;
                      })}
                    </select>

                    <div
                      onClick={() =>
                        UpdateStatusButtonAction(retailOrderId, "retail")
                      }>
                      <h3 className="button-text">Fulfillment</h3>
                      <p>{newRetailStatus}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <div className={createButtonClass("Fulfillment")}>
                    <select
                      name="hotel"
                      id="hotel-ids"
                      style={{ marginTop: "15px", width: "60%" }}
                      onChange={(e) => {
                        setNewHotelStatus(
                          `Currrent Status: ${
                            JSON.parse(e.target.value)?.attributes?.state_code
                          }`
                        );
                        setHotelOrderId(JSON.parse(e.target.value));
                      }}>
                      <option value={`{}`}>Select Order Id</option>
                      {hotelOrderIds.map((order: any) => {
                        return (
                          <option value={JSON.stringify(order)}>
                            {order?.attributes.order_id.data.id}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      name="hotel-status"
                      id="hotel-status"
                      style={{ marginTop: "8px", width: "80%" }}
                      onChange={(e) => {
                        setHotelStatusSelect(e.target.value);
                      }}>
                      <option value={`{}`}>Select Status Code</option>
                      {STATUS_CODE.hotel.map((code: any) => {
                        return <option value={code}>{code}</option>;
                      })}
                    </select>

                    <div
                      onClick={() =>
                        UpdateStatusButtonAction(hotelOrderId, "hotel")
                      }>
                      <h3 className="button-text">Fulfillment</h3>
                      <p>{newHotelStatus}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={createButtonClass("Fulfillment")}>
                    <select
                      name="tourism"
                      id="tourism-ids"
                      style={{ marginTop: "15px", width: "60%" }}
                      onChange={(e) => {
                        setNewTourismStatus(
                          `Currrent Status: ${
                            JSON.parse(e.target.value)?.attributes?.state_code
                          }`
                        );
                        setTourismOrderId(JSON.parse(e.target.value));
                      }}>
                      <option value={`{}`}>Select Order Id</option>
                      {tourismOrderIds.map((order: any) => {
                        return (
                          <option value={JSON.stringify(order)}>
                            {order?.attributes.order_id.data.id}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      name="tourism-status"
                      id="tourism-status"
                      style={{ marginTop: "8px", width: "80%" }}
                      onChange={(e) => {
                        setTourismStatusSelect(e.target.value);
                      }}>
                      <option value={`{}`}>Select Status Code</option>
                      {STATUS_CODE.tourism.map((code: any) => {
                        return <option value={code}>{code}</option>;
                      })}
                    </select>
                    <div
                      onClick={() =>
                        UpdateStatusButtonAction(tourismOrderId, "tourism")
                      }>
                      <h3 className="button-text">Fulfillment</h3>
                      <p>{newTourismStatus}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={createButtonClass("Fulfillment")}>
                    <select
                      name="energy"
                      id="energy-ids"
                      style={{ marginTop: "15px", width: "60%" }}
                      onChange={(e) => {
                        setNewEnergyStatus(
                          `Currrent Status: ${
                            JSON.parse(e.target.value)?.attributes?.state_code
                          }`
                        );
                        setEnergyOrderId(JSON.parse(e.target.value));
                      }}>
                      <option value={`{}`}>Select Order Id</option>
                      {energyOrderIds.map((order: any) => {
                        return (
                          <option value={JSON.stringify(order)}>
                            {order?.attributes.order_id.data.id}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      name="energy-status"
                      id="energy-status"
                      style={{ marginTop: "8px", width: "80%" }}
                      onChange={(e) => {
                        setEnergyStatusSelect(e.target.value);
                      }}>
                      <option value={`{}`}>Select Status Code</option>
                      {STATUS_CODE.energy.map((code: any) => {
                        return <option value={code}>{code}</option>;
                      })}
                    </select>

                    <div
                      onClick={() =>
                        UpdateStatusButtonAction(energyOrderId, "energy")
                      }>
                      <h3 className="button-text">Fulfillment</h3>
                      <p>{newEnergyStatus}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
