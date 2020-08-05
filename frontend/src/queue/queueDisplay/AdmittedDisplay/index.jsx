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

const AdmittedDisplay = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Queue Position
        </Typography>
        <Typography variant="body2" component="p">
          {queueReqResponse.QueueRequestID}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          Dining Hall
        </Typography>
        <Typography variant="body2" component="p">
          {queueReqResponse.DiningHallName}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          Admitted off the Queue on
        </Typography>
        <Typography variant="body2" component="p">
          {Date(queueReqResponse.AdmitOffQueueTime)}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          Queue Group
        </Typography>
        <Typography variant="body2" component="p">
          {queueReqResponse.QueueGroup.join(", ")}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Unqueue
        </Button>
        <GreenButton
          variant="contained"
          color="primary"
          // className={classes.margin}
          startIcon={<PublishIcon />}
          onClick={handleEnter}
        >
          Enter
        </GreenButton>
      </CardActions>
    </Card>
  );
};

export default AdmittedDisplay;
