import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const TableInserter = ({ addTable }) => {
  const [capacity, setCapacity] = useState("");

  const handleInputChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleAddTable = () => {
    setCapacity("");
    addTable(parseInt(capacity));
  };

  return (
    <Box margin="20px 0 30px">
      <TextField
        value={capacity}
        label="Capacity"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleAddTable}
        disabled={capacity === ""}
        color="primary"
        flex-basis="content"
      >
        Add a Table
      </Button>
    </Box>
  );
};

export default TableInserter;
