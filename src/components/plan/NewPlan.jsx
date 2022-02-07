import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import * as planActions from "../../actions/Plan";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewPlan = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [name, setName] = useState("");
  const [nameDialog, setNameDialog] = useState(false);
  const [validation, setValidation] = useState(false);

  const toggleNameDialog = () => {
    setNameDialog(!nameDialog);
  };

  const updateName = (value) => {
    setName(value);
  };

  const onNewPlanClicked = async () => {
    if (name) {
      const res = await planActions.createPlan(name, userId);
      toast.success(`plan ${res.name} created`);
      toggleNameDialog();
      updateName("");
      setValidation(false);
    } else {
      setValidation(true);
      toast.error(`Name is requierd!`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button color="primary" onClick={toggleNameDialog}>
        New Plan
      </Button>
      <Dialog open={nameDialog} onClose={toggleNameDialog}>
        <DialogTitle>Choose Plan Name</DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl>
            <TextField
              id="name"
              name="name"
              type="text"
              label="Plan Name"
              required
              error={validation}
              helperText={validation ? "name is requierd!" : ""}
              onChange={(e) => updateName(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={toggleNameDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onNewPlanClicked();
            }}
            color="primary"
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};