import React from "react";
import { googleLogin } from '../../actions/Auth';
import Googlelogin from 'react-google-login'
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleIcon from "@mui/icons-material/Google";

export const GoogleAuth = ({ informParent }) => {
  const responseGoogle = async (res) => {
    console.log(res.tokenId);
    if (res.tokenId) {
      const response = await googleLogin(res.tokenId);
      if (response) {
        console.log("GOOGLE LOGIN", response);
        informParent(response);
      } else {
        toast.error("Google Login Call Faild!");
      }
    }
  };

  return (
    <div>
      <Googlelogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        autoLoad={"false"}
        render={(renderProps) => (
          <Button
            variant="outlined"
            color="Secondary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<GoogleIcon />}
          >
            Login With Google
          </Button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};