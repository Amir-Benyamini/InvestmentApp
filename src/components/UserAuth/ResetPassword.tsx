import React, { useState, useEffect } from "react";
import { resetPassword } from "../../actions/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
  interface resetPasswordInput {
    token: string;
    newPassword: string;
    buttonText: string;
  }
  const [values, setValues] = useState<resetPasswordInput>({
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    let token = params.token;
    console.log(token);

    if (token) {
      setValues({ ...values, token });
    }
  }, []);

  const { token, newPassword, buttonText } = values;

  const updateInput = (value: string, name: string) => {
    const updatedValues: resetPasswordInput = { ...values };
    updatedValues[name as keyof resetPasswordInput] = value;
    setValues(updatedValues);
  };
  const resetForm = (buttonText: string) => {
    setValues({ ...values, newPassword: "", buttonText });
  };

  const onFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Resetting..." });
    let response = await resetPassword(newPassword, token);
    if (response) {
      if (response.ok) {
        toast.success(`${JSON.parse(response.data!).message}`);
        resetForm("Reset");
        setTimeout(() => {
          navigate(`/`);
        }, 5000);
      } else {
        toast.error(JSON.parse(response.data!).error);
        resetForm("Reset");
      }
    }
  };

  const resetPasswordForm = () => (
    <form>
      <FormControl>
        <TextField
          required
          variant="outlined"
          id="password"
          name="newPassword"
          type="text"
          label="Password"
          value={newPassword}
          onChange={(e) => updateInput(e.target.value, e.target.name)}
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
      <h1>{`Hey, please Reset Password below:`}</h1>
      {resetPasswordForm()}
    </div>
  );
};
