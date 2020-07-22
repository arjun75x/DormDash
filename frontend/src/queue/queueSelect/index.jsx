import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";

const StyledSelect = withStyles({
  root: {
    width: "100%",
    margin: "10px 0",
  },
})(FormControl);

const QueueSizePaper = withStyles({
  root: {
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})(Paper);

const QueueSelect = ({
  diningHalls,
  selectedDiningHall,
  handleSelect,
  queueSize,
}) => {
  return (
    <Box
      margin="100px 0"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" maxWidth="550px">
        <Typography margin="20px 0">Choose a Dining Hall</Typography>
        <StyledSelect variant="outlined">
          <InputLabel id="dining-hall-select-label">Dining Hall</InputLabel>
          <Select
            labelId="dining-hall-select-label"
            value={selectedDiningHall}
            onChange={handleSelect}
            label="Dining Hall"
          >
            {diningHalls.map((diningHall, i) => (
              <MenuItem value={diningHall} key={i}>
                {diningHall}
              </MenuItem>
            ))}
          </Select>
        </StyledSelect>
      </Box>
      {queueSize && (
        <Box display="flex" flexDirection="column" marginLeft="20px">
          <Typography>Queue Size</Typography>
          <QueueSizePaper variant="outlined">
            <Typography>{queueSize}</Typography>{" "}
          </QueueSizePaper>
        </Box>
      )}
    </Box>
  );
};

export default QueueSelect;
