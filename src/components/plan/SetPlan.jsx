import React, { useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as planActions from "../../actions/Plan";

export const SetPlan = inject("plansStore")(
  observer((props) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const [plansMenu, setPlansMenu] = useState(false);

    useEffect(async () => {
      planActions.fetchPlans(userId);
    }, [plansMenu]);

    const togglePlansMenu = () => {
      setPlansMenu(!plansMenu);
    };

    const onPlanClicked = async (plan) => {
      planActions.setPlan(plan);
      togglePlansMenu();
    };

    function renderRow(props) {
      const { index, plan } = props;

      return (
        <ListItem
          button
          key={index}
          onClick={() => {
            onPlanClicked(plan);
          }}
        >
          <ListItemText primary={plan.name} />
        </ListItem>
      );
    }

    const plans = props.plansStore.plans;
    return (
      <div>
        <Button color="inherit" onClick={togglePlansMenu}>
          Set Plan
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={plansMenu}
          onClose={togglePlansMenu}
        >
          <DialogTitle>Select Plan</DialogTitle>
          <Divider />
          <DialogContent>
            <List itemCount={plans.length}>
              {plans.map((plan, index) => {
                return renderRow({ index, plan });
              })}
            </List>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={togglePlansMenu} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  })
);