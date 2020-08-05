import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  pos: {
    marginBottom: 12,
  },
  cardAction: {
    justifyContent: "center",
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const EatingDisplay = ({ handleExit }) => {
  const classes = useStyles();
  const [enterPopupOpen, setEnterPopupOpen] = useState(true);

  const handleClose = () => {
    setEnterPopupOpen(false);
  };

  return (
    <>
      <Snackbar
        open={enterPopupOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          You've entered the Dining Hall - enjoy your meal!
        </Alert>
      </Snackbar>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Enjoy your meal! Remember to click Exit when you wish to leave.
          </Typography>
          <CardActions className={classes.cardAction}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              onClick={() => {
                if (
                  window.confirm(
                    "Confirm that you wish to leave the Dining Hall"
                  )
                )
                  handleExit();
              }}
            >
              Exit
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default EatingDisplay;
