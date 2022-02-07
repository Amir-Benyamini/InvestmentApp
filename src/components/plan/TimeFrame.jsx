import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { changePlanTimeFrame } from "../../actions/Plan";

export const TimeFrame = inject("plansStore")(
  observer((props) => {
    const [planTimeFrame, setPlanTimeFrame] = useState(1);
    const [timeMenu, setTimeMenu] = useState(false);

    const updatePlanTimeRange = (value) => {
      setPlanTimeFrame(value);
    };

    const handleTimeMenu = () => {
      setTimeMenu(!timeMenu);
    };

    const onChangeTimeFrameClick = () => {
      const parsedValue = parseInt(planTimeFrame);
      changePlanTimeFrame(parsedValue);
      handleTimeMenu();
    };

    return (
      <div>
        <Button color="inherit" onClick={handleTimeMenu}>
          Change Time Frame
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={timeMenu}
          onClose={handleTimeMenu}
        >
          <DialogTitle>Select Time Frame</DialogTitle>
          <Divider />
          <DialogContent>
            <FormControl sx={{ display: "flex", justifyContent: "center" }}>
              <InputLabel htmlFor="demo-dialog-native">Time Frame</InputLabel>
              <Select
                native
                value={planTimeFrame}
                onChange={(e) => updatePlanTimeRange(e.target.value)}
                input={<Input id="demo-dialog-native" />}
              >
                <option value={1}>One Year</option>
                <option value={3}>Three Years</option>
                <option value={5}>Five Years</option>
                <option value={10}>Ten Years</option>
              </Select>
            </FormControl>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleTimeMenu} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                onChangeTimeFrameClick();
              }}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  })
);