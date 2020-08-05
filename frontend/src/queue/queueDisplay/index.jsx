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

  const attemptToAdmitOffQueue = () => {
    fetch("https://qkki7d6q92.execute-api.us-east-1.amazonaws.com/dev/admit", {
      mode: "cors",
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
    fetch(
      "https://qkki7d6q92.execute-api.us-east-1.amazonaws.com/dev/admit/arrive",
      {
        mode: "cors",
        headers: {
          Authorization: authHeader,

          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ NetID: userNetID }),
      }
    ).then(() => setQueueReqResponseCB({ eating: true }));
  };

  const handleExit = () => {
    fetch(
      "https://qkki7d6q92.execute-api.us-east-1.amazonaws.com/dev/admit/leave",
      {
        mode: "cors",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ NetID: userNetID }),
      }
    ).then(() => {
      setQueueReqResponseCB({});
    });
  };

  const handleRemoveFromQueue = () => {
    fetch(
      "https://qkki7d6q92.execute-api.us-east-1.amazonaws.com/dev/queue/leave",
      {
        mode: "cors",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ NetID: userNetID }),
      }
    ).then(() => {
      setQueueReqResponseCB({});
    });
  };

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
