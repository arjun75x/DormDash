import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const QueueRequest = () => {
  const [inputNetId, setInputNetId] = useState("");
  const [groupNetIds, setGroupNetIds] = useState([]);

  const handleInputChange = (event) => {
    setInputNetId(event.target.value);
  };

  const handleDeleteNetIdFromGroup = (netId) => {
    setGroupNetIds(groupNetIds.filter((id) => id !== netId));
  };

  const addNetIdToGroup = () => {
    setGroupNetIds([...groupNetIds, inputNetId]);
    setInputNetId("");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      marginTop="100px"
      justifyContent="center"
    >
      <Button variant="contained" color="primary">
        Add to Queue
      </Button>
      <Box maxWidth="600px" width="100%" height="100px" marginLeft="40px">
        <Typography>Add netIDs to Group</Typography>
        <Box margin="10px 0" display="flex">
          <Box flexGrow="1">
            <TextField
              fullWidth={true}
              value={inputNetId}
              onChange={handleInputChange}
            />
          </Box>
          <Button
            onClick={addNetIdToGroup}
            disabled={inputNetId === "" || groupNetIds.includes(inputNetId)}
            color="primary"
            flex-basis="content"
          >
            Add to Group
          </Button>
        </Box>
        <Box display="flex" flexWrap="flex">
          {groupNetIds.map((netId, i) => (
            <Chip
              variant="outlined"
              label={netId}
              onDelete={() => handleDeleteNetIdFromGroup(netId)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default QueueRequest;