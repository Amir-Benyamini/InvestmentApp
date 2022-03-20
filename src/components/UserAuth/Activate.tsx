import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateAccount } from "../../actions/Auth";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function Acivate() {
  const [values, setValues] = useState({
    token: "",
  });

  const { token } = values;

  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    let token = params.token;
    console.log(token);

    if (token) {
      setValues({ ...values, token });
    }
  }, []);

  const onAccountActivation = async () => {
    let response = await activateAccount(token);
    if (response) {
      if (response.ok) {
        toast.success(`${JSON.parse(response.data).message}`);
        setTimeout(() => {
          navigate(`/`);
        }, 6000);
      } else {
        toast.error(JSON.parse(response.data).error);
      }
    }
  };

  const activationLink = () => (
    <Card>
      <div className="form">
        <h1 className="form-text">Please activate your account!</h1>
        <div className="login-btn">
          <Button
            onClick={onAccountActivation}
            variant="contained"
            size="large"
            color="primary"
            fullWidth={true}
          >
            acivate account
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="form-background">
      <div className="form-container">
        <ToastContainer />
        {activationLink()}
      </div>
    </div>
  );
}
