import React, { useState, useEffect } from "react";
import { resetPassword } from "../../actions/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { useStyles } from "../../constans/styling";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
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

  const classes = useStyles();
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
    <Card>
      <form className="form">
        <FormControl margin={"normal"} fullWidth={true}>
          <Typography
            className="form-text"
            variant="h3"
            gutterBottom
            component="h3"
          >
            Reset Password
          </Typography>

          <Typography
            className="form-text"
            variant="subtitle1"
            gutterBottom
            component="p"
          >
            Enter your new password below!
          </Typography>

          <TextField
            sx={{ margin: "4px" }}
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
    <div className="form-background">
      <div className="form-container">
        <ToastContainer />
        {resetPasswordForm()}
      </div>
    </div>
  );
};
