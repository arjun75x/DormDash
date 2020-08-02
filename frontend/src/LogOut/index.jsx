import React from 'react';
import {useGoogleLogout , GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';

const LogOut = ({setLoggedInCB}) => {

    const onLogoutSuccess = (response) => {
        console.log(response);
        setLoggedInCB(false);
      }
      
      const onFailure = (response) => {
        console.log('Login failed, res: ', response);
      }
      const clientId = "808699597542-2jgrb1ive07o219flrasng9q0rm4fj6p.apps.googleusercontent.com";

    const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    // onAutoLoadFinished,
    clientId,
    // cookiePolicy,
    // loginHint,
    // hostedDomain,
    // autoLoad,
    // isSignedIn: true,
    // fetchBasicProfile,
    // redirectUri,
    // discoveryDocs,
    onFailure,
    // uxMode,
    // scope,
    // accessType,
    // responseType,
    // jsSrc,
    // onRequest,
    // prompt
    });
    return(
        <>
        <Button
            onClick={signOut}
        >
            Sign in with Google      
        </Button>
        </>
    );
};
export default LogOut;
