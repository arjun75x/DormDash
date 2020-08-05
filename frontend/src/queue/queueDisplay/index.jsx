import React, { useRef, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { encodeBasicAuthHeader } from "../../utils";
import OnQueueDisplay from "./onQueueDisplay";
import AdmittedDisplay from "./AdmittedDisplay";
import EatingDisplay from "./EatingDisplay";

const QueueDisplay = ({
  queueReqResponse,
  setQueueReqResponseCB,
  userTokenID,
  userNetID,
}) => {
  const admitTimeoutId = useRef(null);

  const attemptToAdmitOffQueue = () => {
    fetch("http://localhost:3000/dev/admit", {
      headers: {
        Authorization: encodeBasicAuthHeader("Google", userTokenID),

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
        Authorization: encodeBasicAuthHeader("Google", userTokenID),

        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(() => setQueueReqResponseCB({ eating: true }));
  };

  const handleExit = () => {
    fetch("http://localhost:3000/dev/admit/leave", {
      headers: {
        Authorization: encodeBasicAuthHeader("Google", userTokenID),
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
        <OnQueueDisplay queueRequest={queueReqResponse.queueRequest} />
      )}
      {queueReqResponse.admittedEntry && (
        <AdmittedDisplay
          admittedEntry={queueReqResponse.admittedEntry}
          handleEnter={handleEnter}
        />
      )}
      {queueReqResponse.eating && <EatingDisplay handleExit={handleExit} />}
    </Box>
  );
};

export default QueueDisplay;
