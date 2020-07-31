import {useEffect, useRef} from 'react';
import { Buffer } from 'buffer';

const encodeToken = (tokenType, token) =>
  Buffer.from(`${tokenType}:${token}`).toString('base64');

export const encodeBasicAuthHeader = (tokenType, token) => {
  const encodedToken = encodeToken(tokenType, token);
  return `Basic ${encodedToken}`;
};

export const getToken = (developer = true) => {
  if (developer) {
    return `Basic ${btoa("DeveloperOnly:ajhsu2")}`;
  }

  throw Error("Unimplemented");
};

//source : https://blog.bitsrc.io/polling-in-react-using-the-useinterval-custom-hook-e2bcefda4197
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  //remember latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //set up interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if(delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
}