import React, { useState, useEffect } from "react";

import QueueSelect from "./queueSelect";
import QueueRequest from "./queueRequest";
import QueueDisplay from "./queueDisplay";
import QueueSize from "./queueSize";
import Navbar from "../nav/navbar";
import Admin from "../admin/admin";
import { Buffer } from "buffer";
import Box from "@material-ui/core/Box";

const dummyDiningHalls = ["PAR", "FAR", "BAR", "CAR"];
const dummyDiningHallQueueSize = [3, 8, 4, 2];
var dummyDiningHallDict = {
  PAR: 3,
  FAR: 8,
  BAR: 4,
  CAR: 2,
};

// example list, need to define how it'll look like when grabbed from DB
// also should use some random UID for the ID component
const list = [
  {
    id: "a",
    firstname: "Robin",
    lastname: "Wieruch",
  },
  {
    id: "b",
    firstname: "Dave",
    lastname: "Davidds",
  },
];

// will be spoofed later
// var diningHallCurrentStatus = {
//   "PAR" : [],
//   "FAR" : [],
//   "BAR" : [],
//   "CAR" : []
// }

const Queue = () => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [selectedDiningHall, setSelectedDiningHall] = useState("");
  const [queueSize, setQueueSize] = useState();
  // const [groupNetIds, setGroupNetIds] = useState([]);
  const [diningHallCurrentStatus, updateDiningHallStatus] = useState({
    PAR: [],
    FAR: [],
    BAR: [],
    CAR: [],
  });

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
  const updateDHCallback = (groupNetIds) => {
    updateDiningHallStatus((prevState) => ({
      ...prevState,
      [selectedDiningHall]: [...prevState[selectedDiningHall], groupNetIds],
    }));
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
  // fetchTest("http://localhost:8000/dev/test", { answer: 42 })
  // .then(data => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });
  // fetch("http://localhost:3000/dev/test").then(response => response.json())
  // .then(data => console.log(data));

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
      <QueueRequest updateDHCallback={updateDHCallback} />
    </>
  );
};

export default Queue;
