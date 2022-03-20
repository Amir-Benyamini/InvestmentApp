import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "react-toastify/dist/ReactToastify.css";

interface signupForm {
  name: string;
  email: string;
  password: string;
  buttonText: string;
}
export function Signup() {
  const [values, setValues] = useState<signupForm>({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });
  const { name, email, password, buttonText } = values;

  const navigate = useNavigate();

  const updateSignupInput = (value: string, name: string) => {
    const updatedValues: signupForm = { ...values };

    updatedValues[name as keyof signupForm] = value;
    setValues(updatedValues);
  };

  const resetForm = (buttonText: string) => {
    setValues({
      ...values,
      name: "",
      email: "",
      password: "",
      buttonText: `${buttonText}`,
    });
  };

  const onFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting..." });

    const response = await signup(name, email, password);
    if (response) {
      if (response.ok) {
        if ("message" in JSON.parse(response.data)) {
          resetForm("Submited");
          toast.success(JSON.parse(response.data!).message);
          setTimeout(() => {
            navigate(`/`);
          }, 5000);
        } else {
          resetForm("Submit");
          toast.error(JSON.parse(response.data!).error);
        }
      } else {
        resetForm("Submit");
        toast.error(JSON.parse(response.data!).error);
      }
    } else {
      resetForm("Submit");
      toast.error("Faild to signup, try again later!");
    }
  };

  const signupForm = () => (
    <Card>
      <form className="form">
        <FormControl margin={"normal"} fullWidth={true}>
          <Typography
            className="form-text"
            variant="h3"
            gutterBottom
            component="h3"
          >
            Signup
          </Typography>

          <TextField
            sx={{ margin: "4px" }}
            required
            variant="outlined"
            id="name"
            name="name"
            type="text"
            label="User Name"
            value={name}
            onChange={(e) => updateSignupInput(e.target.value, e.target.name)}
          />

          <TextField
            sx={{ margin: "4px" }}
            required
            variant="outlined"
            id="email"
            name="email"
            type="text"
            label="Email"
            value={email}
            onChange={(e) => updateSignupInput(e.target.value, e.target.name)}
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
            onChange={(e) => updateSignupInput(e.target.value, e.target.name)}
          />
          <Button
            onClick={onFormSubmit}
            variant="contained"
            size="large"
            color="primary"
            sx={{ margin: "4px" }}
          >
            {buttonText}
          </Button>
        </FormControl>
      </form>
    </Card>
  );

  return (
    <div className="form-background">
      <div className="form-container">
        <ToastContainer />
        {signupForm()}
      </div>
    </div>
  );
}
