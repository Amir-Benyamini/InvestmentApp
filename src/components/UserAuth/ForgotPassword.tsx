import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../actions/Auth";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface forgotPasswordForm {
  email: string;
  buttonText: string;
}
export const ForgotPassword = () => {
  const [values, setValues] = useState<forgotPasswordForm>({
    email: "",
    buttonText: "Submit",
  });
  const { email, buttonText } = values;
  const navigate = useNavigate();

  const updateLoginInput = (value: string, name: string) => {
    const updatedValues: forgotPasswordForm = { ...values };
    updatedValues[name as keyof forgotPasswordForm] = value;
    setValues(updatedValues);
  };

  const resetForm = (buttonText: string) => {
    setValues({
      ...values,
      email: "",
      buttonText: `${buttonText}`,
    });
  };
  const onFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting..." });
    const response = await forgotPassword(email);
    if (response) {
      if (response.ok) {
        if ("message" in JSON.parse(response.data)) {
          resetForm("Submited");
          toast.success(JSON.parse(response.data!).message);
          setTimeout(() => {
            navigate(`/`);
          }, 6000);
        } else {
          resetForm("Submit");
          toast.error(JSON.parse(response.data!).error);
        }
      }
    } else {
      resetForm("Submit");
      toast.error("Faild to sign up, try again later!");
    }
  };

  const forgotPasswordForm = () => (
    <Card>
      <form className="form">
        <FormControl margin={"normal"} fullWidth={true}>
          <h1 className="form-text">Enter Your Email To Reset Password</h1>
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

          <Button
            sx={{ margin: "4px" }}
            onClick={onFormSubmit}
            variant="contained"
            size="large"
            color="primary"
          >
            {buttonText}
          </Button>
        </FormControl>
      </form>
    </Card>
  );

  return (
    <div className="form-container">
      <ToastContainer />
      {forgotPasswordForm()}
    </div>
  );
};
