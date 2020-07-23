import React, { useState } from "react";
import QueueSelect from "./queueSelect";
import QueueRequest from "./queueRequest";

const dummyDiningHalls = ["PAR", "FAR", "BAR", "CAR"];
const dummyDiningHallQueueSize = [3, 8, 4, 2];
var dummyDiningHallDict = {
  "PAR" : 3,
  "FAR" : 8,
  "BAR" : 4,
  "CAR" : 2
};

// will be spoofed later
// var diningHallCurrentStatus = {
//   "PAR" : [],
//   "FAR" : [],
//   "BAR" : [],
//   "CAR" : []
// }

const Queue = () => {
  const [diningHalls, setDiningHalls] = useState(Object.keys(dummyDiningHallDict));
  const [selectedDiningHall, setSelectedDiningHall] = useState("");
  const [queueSize, setQueueSize] = useState(null);
  // const [groupNetIds, setGroupNetIds] = useState([]);
  const [diningHallCurrentStatus, updateDiningHallStatus] = useState(
    {
      "PAR" : [],
      "FAR" : [],
      "BAR" : [],
      "CAR" : []
    }
  );


  // const [inputNetId, setInputNetId] = useState("");
  // const [groupNetIds, setGroupNetIds] = useState([]);
/*
  const handleInputChange = (event) => {
    setInputNetId(event.target.value);
  };

  const handleDeleteNetIdFromGroup = (netId) => {
    setGroupNetIds(groupNetIds.filter((id) => id !== netId));
  };

  const addNetIdToGroup = () => {
    setGroupNetIds([...groupNetIds, inputNetId]);
    setInputNetId("");
  };
*/
  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);
    setQueueSize(dummyDiningHallDict[event.target.value]);
  };
/*
  const handleQueueRequest = (event) => {
    // console.log(groupNetIds);
    if(selectedDiningHall == ""){
      console.log("choose somethin!");
    }
    else{
      // console.log(selectedDiningHall);
      updateDiningHallStatus((prevState)  => (
        {...prevState, 
          [selectedDiningHall]: [...prevState[selectedDiningHall], groupNetIds]        
      }
      ));
    }
  };
*/
  const updateDHCallback = (groupNetIds) => {
    updateDiningHallStatus((prevState)  => (
      {...prevState, 
        [selectedDiningHall]: [...prevState[selectedDiningHall], groupNetIds]        
    }
    ));
    console.log(diningHallCurrentStatus);
  }

  return (
    <>
      <QueueSelect
        diningHalls={diningHalls}
        selectedDiningHall={selectedDiningHall}
        handleSelect={handleSelect}
        queueSize={queueSize}
      />
      <hr style={{ width: "80%" }}></hr>
      <QueueRequest 
        updateDHCallback={updateDHCallback}
        //smh had to pass all these up because top level needs to work with groupNetIds
        /*
        handleQueueRequest={handleQueueRequest}
        inputNetId={inputNetId}
        groupNetIds={groupNetIds}
        handleInputChange={handleInputChange}
        handleDeleteNetIdFromGroup={handleDeleteNetIdFromGroup}
        addNetIdToGroup={addNetIdToGroup}
        */
      />
      <hr style={{ width: "80%", height: "50%"}}></hr>
    </>
  );
};

export default Queue;
