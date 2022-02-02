import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    <form>
      <FormControl>
        <TextField
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
        >
          {buttonText}
        </Button>
      </FormControl>
    </form>
  );

  return (
    <div>
      <ToastContainer />
      <h1>Signup</h1>
      {signupForm()}
    </div>
  );
}
