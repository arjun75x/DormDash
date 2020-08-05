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
  baseUrl,
}) => {
  const admitTimeoutId = useRef(null);

  const attemptToAdmitOffQueue = () => {
    fetch(`${baseUrl}/admit`, {
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
    fetch(`${baseUrl}/admit/arrive`, {
      headers: {
        Authorization: authHeader,

        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(() => setQueueReqResponseCB({ eating: true }));
  };

  const handleExit = () => {
    fetch(`${baseUrl}/admit/leave`, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(() => {
      setQueueReqResponseCB({});
    });
  };

  const handleRemoveFromQueue = () => {
    fetch(`${baseUrl}/queue/leave`, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(() => {
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
