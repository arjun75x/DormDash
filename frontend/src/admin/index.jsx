import React, { useState, useEffect } from "react";
import QueueSelect from "../queue/queueSelect";
import { getToken } from "../utils";
import Box from "@material-ui/core/Box";

const Admin = () => {
  const [diningTableDict, setDiningTableDict] = useState({});
  const [selectedDiningHall, setSelectedDiningHall] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/dev/dining-hall", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => response.json())
      .then(({ diningHalls }) => {
        setDiningTableDict(
          diningHalls.reduce((acc, { DiningHallName, Tables }) => {
            acc[DiningHallName] = Tables;
            return acc;
          }, {})
        );
      });
  }, []);

  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);
  };

  return (
    <Box display="flex" justifyContent="center" padding="50px 0">
      <QueueSelect
        diningHalls={Object.keys(diningTableDict)}
        selectedDiningHall={selectedDiningHall}
        handleSelect={handleSelect}
      />
    </Box>
  );
};

export default Admin;
