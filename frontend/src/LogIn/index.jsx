import React from "react";
import { useGoogleLogin } from "react-google-login";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
const LogIn = ({ handleLogin }) => {
  const admins = ["tincher2", "ajhsu2", "naymanl2", "arjunsa2"];
  const onSuccess = (response) => {
    var UIemail = response.profileObj.email;
    var netID = UIemail.substring(0, UIemail.indexOf("@"));
    handleLogin(response.tokenId, netID, admins.includes(netID));
  };

  const onFailure = (response) => {
    console.log("Login failed, res: ", response);
  };
  const clientId =
    "808699597542-2jgrb1ive07o219flrasng9q0rm4fj6p.apps.googleusercontent.com";

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    isSignedIn: true,
    onFailure,
    hostedDomain: "illinois.edu",
  });
  return (
    <Button onClick={signIn}>
      <img
        alt="googly"
        src="icons8-google.svg"
        style={{ marginRight: "10px" }}
      />
      Sign in with Google
    </Button>
  );
};
export default LogIn;
