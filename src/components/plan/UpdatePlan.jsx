import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import * as planActions from "../../actions/Plan";
import { toast } from "react-toastify";

export const UpdatePlan = inject("plansStore")(
  observer((props) => {
    const planId = props.plansStore.plan.id;
    const name = props.plansStore.plan.name;
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const [newName, setNewName] = useState("");
    const [updateDialog, setUpdateDialog] = useState(false);
    const [validation, setValidation] = useState(false);

    const updatename = (value) => {
      setNewName(value);
    };

    const toggleUptadeDialog = () => {
      setUpdateDialog(!updateDialog);
    };

    const onUpdatePlanClicked = async (name, planId, userId) => {
      if (planId) {
        if (newName) {
          const plan = planActions.updatePlanName(name, planId, userId);
          if (plan) {
            setNewName("");
            toggleUptadeDialog();
            setValidation(false);
            toast.success("Plan name is updated!");
          } else {
            setValidation(false);
            toast.error("Something went wrong, Please try again!");
          }
        } else {
          setValidation(true);
          toast.error("Name is requierd!");
        }
      } else {
        toggleUptadeDialog();
        toast.error("There is no active plan!");
      }
    };

    return (
      <div>
        <Button color="inherit" onClick={toggleUptadeDialog}>
          Update Plan
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={updateDialog}
          onClose={toggleUptadeDialog}
        >
          <DialogTitle sx={{textAlign: "center"}}>Update Plan Name</DialogTitle>
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
                onChange={(e) => updatename(e.target.value)}
              />
            </FormControl>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={toggleUptadeDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                onUpdatePlanClicked(
                  newName === "" ? name : newName,
                  planId,
                  userId
                );
              }}
              color="primary"
            >
              update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  })
);