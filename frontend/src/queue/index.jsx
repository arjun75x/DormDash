import React, { useState } from "react";
import QueueSelect from "./queueSelect";

const dummyDiningHalls = ["PAR", "FAR", "BAR", "CAR"];

const Queue = () => {
  const [diningHalls, setDiningHalls] = useState(dummyDiningHalls);
  const [selectedDiningHall, setSelectedDiningHall] = useState("");

  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);
  };

  return (
    <QueueSelect
      diningHalls={diningHalls}
      selectedDiningHall={selectedDiningHall}
      handleSelect={handleSelect}
    />
  );
};

export default Queue;
