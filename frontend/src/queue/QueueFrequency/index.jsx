import React, { useState } from "react";

export const processFrequencyData = (serverResponse, diningHallNames) => {
  return diningHallNames.reduce((acc, diningHallName) => {
    acc[diningHallName] = [...new Array(7)].map(() => new Array(24).fill(0));

    if (serverResponse[diningHallName]) {
      for (const { DayOfWeek, Hour, Weight } of serverResponse[
        diningHallName
      ]) {
        acc[diningHallName][DayOfWeek - 1][Hour] = Weight;
      }
    }

    return acc;
  }, {});
};
