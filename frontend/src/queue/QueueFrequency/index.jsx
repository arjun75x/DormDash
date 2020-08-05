import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import BarChart from "./BarChart";

export const processFrequencyData = (serverResponse, diningHallNames) => {
  return diningHallNames.reduce((acc, diningHallName) => {
    acc[diningHallName] = [...new Array(7)].map(() => new Array(24).fill(0));

    if (serverResponse[diningHallName]) {
      for (const { DayOfWeek, Hour, Weight } of serverResponse[
        diningHallName
      ]) {
        acc[diningHallName][DayOfWeek - 1][(Hour + 20) % 24] = Weight;
      }
    }

    return acc;
  }, {});
};

const QueueFrequency = ({ visitFrequency }) => {
  const [dayInd, setDayInd] = useState(0);

  return (
    <Box>
      <BarChart data={visitFrequency[dayInd]} />
    </Box>
  );
};

export default QueueFrequency;
