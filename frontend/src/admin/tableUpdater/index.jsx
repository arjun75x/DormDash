import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

const CapacityPaper = withStyles({
  root: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "12px",
  },
})(Paper);

const TableUpdate = ({ updateTableCapacity, deleteTable, capacity }) => {
  const [newCapacity, setNewCapacity] = useState("");

  const handleInputChange = (event) => {
    setNewCapacity(event.target.value);
  };

  const handleUpdateCapacity = () => {
    setNewCapacity("");
    updateTableCapacity(parseInt(newCapacity));
  };

  return (
    <Box display="flex" alignItems="center" margin="6px 0">
      <IconButton aria-label="delete" onClick={deleteTable}>
        <CancelIcon />
      </IconButton>
      <CapacityPaper variant="outlined">{capacity}</CapacityPaper>
      <TextField
        value={newCapacity}
        label="New Capacity"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleUpdateCapacity}
        disabled={newCapacity === ""}
        color="primary"
        flex-basis="content"
      >
        Update
      </Button>
    </Box>
  );
};

export default TableUpdate;
