import React from "react";
import { facebookLogin } from '../../actions/Auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Button from '@material-ui/core/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookIcon from "@mui/icons-material/Facebook";

export const FacebookAuth = ({ informParent }) => {
  const responseFacebook = async (res) => {
    console.log(res);
    let response = await facebookLogin(res.userID, res.accessToken);
    if (response) {
      console.log("FACEBOOK LOGIN", response);
      informParent(response);
    } else {
      toast.error("Facebook Login Call Faild!");
    }
  };

  return (
    <div>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={renderProps.onClick}
            startIcon={<FacebookIcon />}
          >
            Login With Facebook
          </Button>
        )}
      />
    </div>
  );
};