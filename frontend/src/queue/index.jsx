import React, { useState, useEffect } from "react";
import QueueSelect from "./queueSelect";
import QueueRequest from "./queueRequest";
import QueueDisplay from "./queueDisplay";
import Grid from "@material-ui/core/Grid";

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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <QueueSelect
            diningHalls={diningHalls}
            selectedDiningHall={selectedDiningHall}
            handleSelect={handleSelect}
            queueSize={queueSize}
          />
          <hr style={{ width: "80%" }}></hr>
          <QueueRequest updateDHCallback={updateDHCallback} />
        </Grid>
        <Grid item xs={4}>
          {/* <QueueDisplay
            list={list}
            selectedDiningHall={selectedDiningHall}
            DHGroups={diningHallCurrentStatus[selectedDiningHall]}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Queue;
