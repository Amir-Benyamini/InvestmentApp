import React, { useState, useEffect } from "react";
import { updateProfile } from '../../actions/Auth'
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { isAuth, getCookie, updateUser } from "../../services/authHelpers";
import { loadProfile } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Profile() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    buttonText: "Update",
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "",
  });

  const token = getCookie("token");
  const { name, email, role } = values;

  useEffect(async () => {
    let res = await loadProfile(isAuth()._id, token);
    let data = await res.text();

    if (res.ok) {
      console.log("Profile updated", res);
      const { role, email, name } = JSON.parse(data);
      setValues({ ...values, role, email, name });
    }
    if (!res.ok) {
      console.log("Profile update error", JSON.parse(data).error);
      return JSON.parse(data).error;
    }
  }, []);

  const updateFormInput = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({ name: "", password: "", buttonText: "Update" });
  };

  const setButtonText = (buttonText) => {
    setForm({ ...form, buttonText });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setButtonText("Updating..");

    let res = await updateProfile(form.name, form.password, token);
    let data = await res.json();

    if (res.ok) {
      setValues({ ...values, ...form });
      updateUser(data, () => {
        resetForm();
        toast.success(`Profile updated successfully!`);
      });
    }
    if (!res.ok) {
      resetForm();
      toast.error(data.error);
    }
  };

  const updateProfileForm = () => (
    <Card>
      <form className="form">
        <FormControl margin={"normal"} fullWidth={true}>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Profile Update Form
          </Typography>
          <Divider sx={{ margin: "8px" }} />
          <TextField
            sx={{ margin: "4px" }}
            variant="outlined"
            id="name"
            name="name"
            type="text"
            label="Updated Name"
            value={form.name}
            onChange={(e) => updateFormInput(e.target.value, e.target.name)}
          />

          <TextField
            sx={{ margin: "4px" }}
            variant="outlined"
            id="password"
            name="password"
            type="text"
            label="Updated Password"
            value={form.password}
            onChange={(e) => updateFormInput(e.target.value, e.target.name)}
          />
          <Button
            sx={{ margin: "4px" }}
            onClick={onFormSubmit}
            variant="contained"
            size="large"
            color="primary"
          >
            {form.buttonText}
          </Button>
        </FormControl>
      </form>
    </Card>
  );
  const userProfileCard = () => (
    <Card>
      <div className="form">
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Profile Details
        </Typography>
        <Divider sx={{ margin: "8px" }} />
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Name: {`${name}`}
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Email: {`${email}`}
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Role: {`${role}`}
        </Typography>
      </div>
    </Card>
  );

  return (
    <div>
      <ToastContainer />

      <div className="form-container">{userProfileCard()}</div>

      <div className="form-container">{updateProfileForm()}</div>
    </div>
  );
} 