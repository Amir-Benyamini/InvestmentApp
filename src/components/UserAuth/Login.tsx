import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { GoogleAuth } from "./GoogleAuth";
import { FacebookAuth } from "./FacebookAuth";

interface loginForm {
  email: string;
  password: string;
  buttonText: string;
}

export const Login = () => {
  const [values, setValues] = useState<loginForm>({
    email: "",
    password: "",
    buttonText: "Submit",
  });
  const { email, password, buttonText } = values;

  const updateLoginInput = (value: string, name: string) => {
    const updatedValues: loginForm = { ...values };
    updatedValues[name as keyof loginForm] = value;
    setValues(updatedValues);
  };
  const navigate = useNavigate();

  const resetForm = (buttonText: string) => {
    setValues({
      ...values,
      email: "",
      password: "",
      buttonText: `${buttonText}`,
    });
  };

  const informParent = (response: any) => {
    if (response.ok) {
      toast.success(
        `Login success! Welcome back ${JSON.parse(response.data!).user.name}.`
      );
      setTimeout(() => {
        navigate(`/`);
      }, 5000);
    } else {
      toast.error(`${JSON.parse(response.data!).error}.`);
    }
  };
  const onFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting..." });

    let response = await login(email, password);
    if (response) {
      if (response.ok) {
        resetForm("Submitted!");
        toast.success(
          `Login success! Welcome back ${JSON.parse(response.data!).user.name}.`
        );
        setTimeout(() => {
          navigate(`/`);
        }, 5000);
      } else {
        resetForm("Submit");
        toast.error(`${JSON.parse(response.data!).error}.`);
      }
    } else {
      resetForm("Submit");
      toast.error(`Login failed, please try again later.`);
    }
  };

  const loginForm = () => (
    <Card>
      <form className="form">
        <FormControl margin={"normal"} fullWidth={true}>
          <h1 className="form-text">Login</h1>
          <GoogleAuth informParent={informParent} />
          <FacebookAuth informParent={informParent} />
          <Divider sx={{ margin: "2.5% 0" }}>
            <Typography gutterBottom={true} variant="h5" color="textSecondary">
              OR
            </Typography>
          </Divider>
          <TextField
            sx={{ margin: "4px" }}
            required
            variant="outlined"
            id="email"
            name="email"
            type="text"
            label="Email"
            value={email}
            onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
          />

          <TextField
            sx={{ margin: "4px" }}
            required
            variant="outlined"
            id="password"
            name="password"
            type="text"
            label="Password"
            value={password}
            onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
          />
          <Button
            sx={{ margin: "4px" }}
            onClick={onFormSubmit}
            variant="contained"
            size="large"
            color="primary"
          >
            {buttonText}
          </Button>

          <Link className="form-text" to="/auth/password/forgot">
            forgot password
          </Link>
        </FormControl>
      </form>
    </Card>
  );

  return (
    <div className="form-container">
      <ToastContainer />
      {/* {isAuth() ? <Navigate to="/" /> : null} */}

      {loginForm()}
    </div>
  );
};
