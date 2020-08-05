import React, { useRef, useEffect } from "react";
import Box from "@material-ui/core/Box";
import OnQueueDisplay from "./onQueueDisplay";
import AdmittedDisplay from "./AdmittedDisplay";
import EatingDisplay from "./EatingDisplay";

const QueueDisplay = ({
  queueReqResponse,
  setQueueReqResponseCB,
  authHeader,
  userNetID,
}) => {
  const admitTimeoutId = useRef(null);
  const leaveTimeoutId = useRef(null);
  const unqueueTimeoutId = useRef(null);

  const attemptToAdmitOffQueue = () => {
    fetch("http://localhost:3000/dev/admit", {
      headers: {
        Authorization: authHeader,

        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(({ message, ...rest }) => {
      if (message === "Success!") {
        setQueueReqResponseCB(rest);
      } else {
        admitTimeoutId.current = setTimeout(attemptToAdmitOffQueue, 10000);
      }
    });
  };

  useEffect(() => {
    if (queueReqResponse.queueRequest) {
      attemptToAdmitOffQueue();
    }

    return () => clearTimeout(admitTimeoutId.current);
  }, [queueReqResponse]);

  const handleEnter = () => {
    fetch("http://localhost:3000/dev/admit/arrive", {
      headers: {
        Authorization: authHeader,

        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(() => setQueueReqResponseCB({ eating: true }));
  };

  const handleExit = () => {
    fetch("http://localhost:3000/dev/admit/leave", {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(({ message }) => {
      if (message === "Success!") {
        setQueueReqResponseCB({});
      } else {
        leaveTimeoutId.current = setTimeout(handleExit, 5000);
      }
    });
  };

  useEffect(() => {
    if (queueReqResponse.queueRequest) {
      handleExit();
    }

    return () => clearTimeout(leaveTimeoutId.current);
  }, [queueReqResponse]);

  const handleRemoveFromQueue = () => {
    fetch("http://localhost:3000/dev/queue/leave", {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(({ message }) => {
      if (message === "Success!") {
        setQueueReqResponseCB({});
      } else {
        unqueueTimeoutId.current = setTimeout(handleRemoveFromQueue, 5000);
      }
    });
  };

  useEffect(() => {
    if (queueReqResponse.queueRequest) {
      handleRemoveFromQueue();
    }

    return () => clearTimeout(unqueueTimeoutId.current);
  }, [queueReqResponse]);

  return (
    <Box display="flex" alignItems="center">
      {queueReqResponse.queueRequest && (
        <OnQueueDisplay
          queueRequest={queueReqResponse.queueRequest}
          handleRemoveFromQueue={handleRemoveFromQueue}
        />
      )}
      {queueReqResponse.admittedEntry && (
        <AdmittedDisplay
          admittedEntry={queueReqResponse.admittedEntry}
          handleEnter={handleEnter}
          handleRemoveFromQueue={handleRemoveFromQueue}
        />
      )}
      {queueReqResponse.eating && <EatingDisplay handleExit={handleExit} />}
    </Box>
  );
};

export default QueueDisplay;
