import { Buffer } from "buffer";

const encodeToken = (tokenType, token) =>
  Buffer.from(`${tokenType}:${token}`).toString("base64");

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
