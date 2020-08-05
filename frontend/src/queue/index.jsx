import React, { useState, useEffect, useRef } from "react";

import QueueSelect from "./queueSelect";
import QueueRequest from "./queueRequest";
import QueueDisplay from "./queueDisplay";
import QueueSize from "./queueSize";
import Navbar from "../nav/navbar";
import Box from "@material-ui/core/Box";
import { processFrequencyData } from "./QueueFrequency";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import QueueFrequency from "./QueueFrequency";

const Queue = ({
  hasLoggedIn,
  authHeader,
  userNetID,
  handleLogout,
  hasAdminPriv,
  loggedInAsDev,
}) => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [selectedDiningHall, setSelectedDiningHall] = useState("");
  const [queueSize, setQueueSize] = useState(null);
  const queueSizeTimeoutId = useRef(null);
  const [queueReqResponse, setQueueReqResponse] = useState({});
  const queueReqTimeoutId = useRef(null);

  const [visitFrequency, setVisitFrequency] = useState(null);

  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");
  const [recDH, setRecDH] = useState("");
  const [finishRec, setFinishRec] = useState(false);
  const [finishCheckGroup, setFinishCheckGroup] = useState(false);
  const justEntered = useRef(true);

  useEffect(() => {
    if (diningHalls.length === 0) return;

    fetch("http://localhost:3000/dev/admit/activity", {
      headers: {
        Authorization: authHeader,
      },
    })
      .then((response) => response.json())
      .then(({ activity }) => {
        setVisitFrequency(processFrequencyData(activity, diningHalls));
      });
  }, [diningHalls]);

  const checkIfQueued = () => {
    const params = { NetID: userNetID };
    const checkGroupURL = new URL("http://localhost:3000/dev/checkGroup");
    checkGroupURL.search = new URLSearchParams(params).toString();

    fetch(checkGroupURL, {
      headers: {
        Authorization: authHeader,
      },
    })
      .then((response) => response.json())
      .then(({ message, ...rest }) => {
        if (message === "Success!") {
          if (justEntered.current) {
            setFinishCheckGroup(true);
            justEntered.current = false;
          }

          setQueueReqResponse(rest);
        } else {
          setQueueReqResponse({});
        }
      })
      .finally(() => {
        queueReqTimeoutId.current = setTimeout(checkIfQueued, 10000);
      });
  };

  useEffect(() => {
    checkIfQueued();

    return () => {
      clearTimeout(queueReqTimeoutId.current);
    };
  }, []);

  useEffect(() => {
    //get user location
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    });

    fetch("http://localhost:3000/dev/admin/dining-hall", {
      headers: {
        Authorization: authHeader,
      },
    })
      .then((response) => response.json())
      .then(({ diningHalls }) => {
        setDiningHalls(diningHalls.map(({ DiningHallName }) => DiningHallName));
      });
  }, []);

  useEffect(() => {
    if (selectedDiningHall === "") return;

    clearTimeout(queueSizeTimeoutId.current);

    const url = new URL("http://localhost:3000/dev/queue/size");
    url.search = new URLSearchParams({ DiningHallName: selectedDiningHall });

    const pollQueueSize = () => {
      fetch(url, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ queueSize }) => {
          setQueueSize(queueSize);
          queueSizeTimeoutId.current = setTimeout(pollQueueSize, 30000);
        });
    };

    pollQueueSize();

    return () => {
      clearTimeout(queueSizeTimeoutId.current);
    };
  }, [selectedDiningHall]);

  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);

    //AF call here
    fetch("http://localhost:3000/dev/recommendation", {
      headers: {
        Authorization: authHeader,
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
  };

  const handleClose = (event, reason) => {
    setFinishRec(false);
    setFinishCheckGroup(false);
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
        userNetID={userNetID}
        handleLogout={handleLogout}
        hasAdminPriv={hasAdminPriv}
        loggedInAsDev={loggedInAsDev}
      />
      {hasLoggedIn && Object.keys(queueReqResponse).length === 0 && (
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
          {queueSize !== null && <QueueSize queueSize={queueSize} />}
          {selectedDiningHall !== "" && visitFrequency !== null && (
            <QueueFrequency
              visitFrequency={visitFrequency[selectedDiningHall]}
            />
          )}
        </Box>
      )}
      {selectedDiningHall !== "" &&
        hasLoggedIn &&
        Object.keys(queueReqResponse).length === 0 && (
          <>
            <hr style={{ width: "80%" }}></hr>
            <QueueRequest
              selectedDiningHall={selectedDiningHall}
              setQueueReqResponseCB={setQueueReqResponse}
              authHeader={authHeader}
              userNetID={userNetID}
            />
          </>
        )}
      {queueReqResponse &&
        Object.keys(queueReqResponse).length !== 0 &&
        hasLoggedIn && (
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="350px"
            justifyContent="center"
            marginTop="100px"
          >
            <QueueDisplay
              queueReqResponse={queueReqResponse}
              setQueueReqResponseCB={setQueueReqResponse}
              authHeader={authHeader}
              userNetID={userNetID}
            />
          </Box>
        )}
      {finishRec && (
        <Snackbar open={finishRec} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Based on your location and the current capacity of each dining hall,
            your recommended Dining Hall is {recDH}
          </Alert>
        </Snackbar>
      )}
      {finishCheckGroup && (
        <Snackbar open={finishCheckGroup} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            You've been queue'd up by a friend (or yourself in the past), here's
            your ticket!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Queue;
