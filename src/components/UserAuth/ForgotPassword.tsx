import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    <form>
      <FormControl>
        <TextField
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
      <h1>Enter Your Email To Reset Password</h1>
      {forgotPasswordForm()}
    </div>
  );
};
