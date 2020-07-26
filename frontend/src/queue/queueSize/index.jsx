import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const QueueSizePaper = withStyles({
  root: {
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})(Paper);

const QueueSize = ({ queueSize }) => {
  return (
    <Box display="flex" flexDirection="column" marginLeft="20px">
      <Typography>Queue Size</Typography>
      <QueueSizePaper variant="outlined">
        <Typography>{queueSize}</Typography>{" "}
      </QueueSizePaper>
    </Box>
  );
};

export default QueueSize;
