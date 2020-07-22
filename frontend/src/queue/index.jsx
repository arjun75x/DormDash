import React, { useState } from "react";
import QueueSelect from "./queueSelect";
import QueueRequest from "./queueRequest";

const dummyDiningHalls = ["PAR", "FAR", "BAR", "CAR"];

const Queue = () => {
  const [diningHalls, setDiningHalls] = useState(dummyDiningHalls);
  const [selectedDiningHall, setSelectedDiningHall] = useState("");
  const [queueSize, setQueueSize] = useState(null);

  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);
    setQueueSize(7);
  };

  return (
    <>
      <QueueSelect
        diningHalls={diningHalls}
        selectedDiningHall={selectedDiningHall}
        handleSelect={handleSelect}
        queueSize={queueSize}
      />
      <hr style={{ width: "80%" }}></hr>
      <QueueRequest />
    </>
  );
};

export default Queue;
