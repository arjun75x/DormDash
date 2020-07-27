import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const DHInserter = ({ addDHCB }) => {
  const [DHName, setDHName] = useState("");
  const [Lat, setLat] = useState();
  const [Long, setLong] = useState();

  const handleDHChange = (event) => {
    setDHName(event.target.value);
  };
  const handleLatChange = (event) => {
    setLat(event.target.value);
  };
  const handleLongChange = (event) => {
    setLong(event.target.value);
  };

  const handleAddDH = () => {
    console.log("Adding DH!");
    setDHName("");
    setLat("");
    setLong("");
    addDHCB(DHName, Lat, Long);
  };

  return (
    <Box margin="20px 0 30px">
      <TextField
        value={DHName}
        label="Dining Hall Name"
        // type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDHChange}
      />
      <TextField
        value={Lat}
        label="Latitude"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleLatChange}
      />
      <TextField
        value={Long}
        label="Longitude"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleLongChange}
      />
      <Button
        onClick={handleAddDH}
        disabled={DHName === "" || Lat === "" || Long === ""}
        color="primary"
        flex-basis="content"
      >
        Add a Dining Hall
      </Button>
    </Box>
  );
};

export default DHInserter;
