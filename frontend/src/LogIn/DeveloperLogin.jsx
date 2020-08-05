import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const DeveloperLogin = ({ handleLogin }) => {
  const [netId, setNetId] = useState("");

  const handleInputChange = (event) => {
    setNetId(event.target.value);
  };

  return (
    <Box width="100%" padding="0 4px">
      <TextField
        label="NetId"
        fullWidth={true}
        value={netId}
        onChange={handleInputChange}
      />
      <Box margin="20px 0" display="flex" flexDirection="row-reverse">
        <Button
          disabled={netId === ""}
          onClick={() => handleLogin(netId)}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default DeveloperLogin;
