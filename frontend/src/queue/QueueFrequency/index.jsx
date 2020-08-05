import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import BarChart from "./BarChart";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";

const days = [
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Saturdays",
  "Sundays",
];

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
  const [dayInd, setDayInd] = useState(moment(new Date()).format("d") - 1);

  const handleSelect = (event) => {
    setDayInd(event.target.value);
  };

  return (
    <Box marginLeft="50px">
      <Select value={dayInd} onChange={handleSelect}>
        {days.map((day, i) => (
          <MenuItem value={i} key={i}>
            {day}
          </MenuItem>
        ))}
      </Select>
      <BarChart data={visitFrequency[dayInd]} />
    </Box>
  );
};

export default QueueFrequency;
