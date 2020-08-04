import React, { useState, useEffect } from "react";

import QueueSelect from "./queueSelect";
import QueueRequest from "./queueRequest";
import QueueDisplay from "./queueDisplay";
import QueueSize from "./queueSize";
import Navbar from "../nav/navbar";
import Box from "@material-ui/core/Box";
import { encodeBasicAuthHeader } from "../utils";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Queue = ({
  hasLoggedIn,
  setLoggedInCB,
  userTokenID,
  userNetID,
  handleUserTokenCB,
  handleUserNetIDCB,
  hasAdminPriv,
}) => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [selectedDiningHall, setSelectedDiningHall] = useState("");
  const [queueSize, setQueueSize] = useState();
  const [queueReqResponse, setQueueReqResponse] = useState({});

  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");
  const [recDH, setRecDH] = useState("");
  const [finishRec, setFinishRec] = useState(false);

  useEffect(() => {
    //get user location
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    });

    // console.log(userTokenID);
    fetch("http://localhost:3000/dev/admin/dining-hall", {
      headers: {
        // Authorization: encodeBasicAuthHeader("Google", userTokenID),
        // "Content-Type": "application/json",
        Authorization: encodeBasicAuthHeader("DeveloperOnly", "naymanl2"),
      },
    })
      .then((response) => response.json())
      .then(({ diningHalls }) => {
        setDiningHalls(diningHalls.map(({ DiningHallName }) => DiningHallName));
      });
  }, []);

  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);

    //AF call here
    fetch("http://localhost:3000/dev/recommendation", {
      headers: {
        Authorization: encodeBasicAuthHeader("Google", userTokenID),
        "Content-Type": "application/json",
        // Authorization: encodeBasicAuthHeader("DeveloperOnly", "naymanl2"),
      },
      method: "POST",
      body: JSON.stringify({
        Latitude: parseFloat(userLat),
        Longitude: parseFloat(userLong),
      }),
    })
      .then((response) => response.json())
      .then(({ DiningHallName }) => {
        setFinishRec(true);
        setRecDH(DiningHallName);
      });

    //to be replaced with nicer histogram
    setQueueSize(7);
  };

  const handleClose = (event, reason) => {
    setFinishRec(false);
    if (reason === "clickaway") {
      return;
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
      <Navbar
        hasLoggedIn={hasLoggedIn}
        setLoggedInCB={setLoggedInCB}
        userNetID={userNetID}
        handleUserTokenCB={handleUserTokenCB}
        handleUserNetIDCB={handleUserNetIDCB}
        hasAdminPriv={hasAdminPriv}
      />
      {hasLoggedIn && (
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
      )}
      {selectedDiningHall !== "" && hasLoggedIn && (
        <>
          <hr style={{ width: "80%" }}></hr>
          <QueueRequest
            selectedDiningHall={selectedDiningHall}
            setQueueReqResponseCB={setQueueReqResponse}
            userTokenID={userTokenID}
            userNetID={userNetID}
          />
        </>
      )}

      {queueReqResponse &&
        Object.keys(queueReqResponse).length !== 0 &&
        hasLoggedIn && (
          <>
            <hr style={{ width: "80%" }}></hr>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              height="350px"
              justifyContent="center"
            >
              <QueueDisplay
                queueReqResponse={queueReqResponse}
                setQueueReqResponseCB={setQueueReqResponse}
                userTokenID={userTokenID}
                userNetID={userNetID}
              />
            </Box>
          </>
        )}

      {finishRec && (
        <Snackbar open={finishRec} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Based on your location and the current capacity of each dining hall,
            your recommended Dining Hall is {recDH}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Queue;
