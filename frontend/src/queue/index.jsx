import React, { useState, useEffect } from "react";

import QueueSelect from "./queueSelect";
import QueueRequest from "./queueRequest";
import QueueDisplay from "./queueDisplay";
import QueueSize from "./queueSize";
import Navbar from "../nav/navbar";
import Admin from "../admin/admin";
import { Buffer } from "buffer";
import Box from "@material-ui/core/Box";

const Queue = () => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [selectedDiningHall, setSelectedDiningHall] = useState("");
  const [queueSize, setQueueSize] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/dev/dining-hall", {
      headers: {
        Authorization: `Basic ${btoa("DeveloperOnly:ajhsu2")}`,
      },
    })
      .then((response) => response.json())
      .then(({ diningHalls }) => {
        setDiningHalls(diningHalls.map(({ DiningHallName }) => DiningHallName));
      });
  }, []);

  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);
    setQueueSize(7);
  };

  const encodeToken = (tokenType, token) =>
    Buffer.from(`${tokenType}:${token}`).toString("base64");

  const encodeBasicAuthHeader = (tokenType, token) => {
    const encodedToken = encodeToken(tokenType, token);
    return `Basic ${encodedToken}`;
  };
  const authorizedToken = encodeBasicAuthHeader("DeveloperOnly", "tincher2");
  async function fetchTest() {
    console.log(authorizedToken);
    await fetch("http://localhost:3000/dev/dining-hall", {
      headers: {
        Authorization: authorizedToken,
      },
    })
      .then((response) => {
        console.log(response.json());
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="250px"
        justifyContent="center"
      >
        <QueueSelect
          diningHalls={diningHalls}
          selectedDiningHall={selectedDiningHall}
          handleSelect={handleSelect}
        />
        {queueSize && <QueueSize queueSize={queueSize} />}
      </Box>
      <hr style={{ width: "80%" }}></hr>
      <QueueRequest />
    </>
  );
};

export default Queue;
