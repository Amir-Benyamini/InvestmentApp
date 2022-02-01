import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateAccount } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";

export function Acivate() {
  const [values, setValues] = useState({
    token: "",
    show: true,
  });

  const { name, token, show } = values;

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
    <div>
      <h1>
        Hey {name}, please click the "activate account" button to activate your
        account!
      </h1>
      <Button
        onClick={onAccountActivation}
        variant="contained"
        size="large"
        color="primary"
      >
        acivate account
      </Button>
    </div>
  );

  return (
    <div>
      <ToastContainer />
      {activationLink()}
    </div>
  );
} 