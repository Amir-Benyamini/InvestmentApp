import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import { investmentTypes, liquidityLables } from "../../constans/inputs";
import {
  investmentIn,
  inputValidation,
  validateInvestmentInput,
} from "../../constans/validations";
import * as investmentsActions from "../../actions/investments";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";

export const AddInvestment = inject(
  "plansStore",
  "rates"
)(
  observer((props) => {
    const planId = props.plansStore.plan.id;
    const [investmentMenu, setInvestmentMenu] = useState(false);
    const [investmentInput, setInvestmentInput] = useState(investmentIn);
    const [validation, setValidation] = useState(inputValidation);

    // const Investments = props.planStore.investments
    const rates = props.rates.latestRates;
    const screenWidth = window.screen.width;
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const updateInvestmentInput = (event) => {
      const updatedInputs = { ...investmentInput };

      if (
        event.target.name === "isRegulated" ||
        event.target.name === "isCompanyCapital"
      ) {
        updatedInputs[event.target.name] = !investmentInput[event.target.name];
      } else {
        updatedInputs[event.target.name] = event.target.value;
      }

      setInvestmentInput(updatedInputs);
    };

    const handleInvestmentMentu = () => {
      if (planId !== undefined) {
        setInvestmentInput(investmentIn);
        setInvestmentMenu(!investmentMenu);
      } else {
        toast.error("Please set plan first!");
      }
    };

    const addInvestment = async () => {
      if (validateInvestmentInput(investmentInput, validation, setValidation)) {
        investmentsActions.addInvestment(investmentInput, userId);
        handleInvestmentMentu();
        toast.success("Investment succesfully added!");
      } else {
        toast.error("Please fill all requierd fields!");
      }
    };

    return (
      <div id="add-btn">
        <Fab
          variant="extended"
          size={screenWidth < 850 ? "small" : "medium"}
          aria-label="add"
          color="secondary"
          sx={{ color: "white" }}
          onClick={handleInvestmentMentu}
        >
          <AddIcon />
          Add investment
        </Fab>
        {/* <Button color="secondary" onClick={handleInvestmentMentu}>
          Add Investment
        </Button> */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={investmentMenu}
          onClose={handleInvestmentMentu}
        >
          <DialogTitle>Fill Investment Data</DialogTitle>
          <Divider />
          <DialogContent>
            <FormControl>
              <TextField
                sx={{ margin: "5px 0" }}
                id="name"
                name="name"
                type="text"
                label="Investment Name"
                required
                error={validation.name.error}
                helperText={validation.name.error ? validation.name.text : ""}
                onChange={(e) => updateInvestmentInput(e)}
              />

              <TextField
                sx={{ margin: "5px 0" }}
                id="company"
                name="company"
                label="Company"
                type="text"
                required
                error={validation.company.error}
                helperText={
                  validation.company.error ? validation.company.text : ""
                }
                onChange={(e) => updateInvestmentInput(e)}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                id="currency"
                name="currency"
                label="Currency"
                required
                error={validation.currency.error}
                helperText={
                  validation.currency.error ? validation.currency.text : ""
                }
                select
                onChange={(e) => updateInvestmentInput(e)}
              >
                {Object.values(rates).map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </MenuItem>
                ))}
              </TextField>

              <NumberFormat
                sx={{ margin: "5px 0" }}
                value={investmentInput.revPerYear}
                onValueChange={(values) => {
                  let event = {
                    target: {
                      name: "revPerYear",
                      value: values.floatValue,
                    },
                  };
                  updateInvestmentInput(event);
                }}
                customInput={TextField}
                label="Yield Per Year"
                required
                error={validation.revPerYear.error}
                helperText={
                  validation.revPerYear.error ? validation.revPerYear.text : ""
                }
                thousandSeparator
                suffix="%"
                allowNegative={false}
              />

              <NumberFormat
                sx={{ margin: "5px 0" }}
                value={investmentInput.amount}
                onValueChange={(values) => {
                  let event = {
                    target: {
                      name: "amount",
                      value: values.floatValue,
                    },
                  };
                  updateInvestmentInput(event);
                }}
                customInput={TextField}
                type="text"
                label="Investment Amount"
                name="amount"
                required
                error={validation.amount.error}
                helperText={
                  validation.amount.error ? validation.amount.text : ""
                }
                thousandSeparator
                allowNegative={false}
              />

              <TextField
                sx={{ margin: "5px 0" }}
                id="type"
                name="type"
                label="Investment Type"
                required
                error={validation.type.error}
                helperText={validation.type.error ? validation.type.text : ""}
                select
                onChange={(e) => updateInvestmentInput(e)}
              >
                {investmentTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                sx={{ margin: "5px 0" }}
                id="liquidity"
                name="liquidity"
                label="Liquidity"
                required
                error={validation.liquidity.error}
                helperText={
                  validation.liquidity.error ? validation.liquidity.text : ""
                }
                select
                onChange={(e) => updateInvestmentInput(e)}
              >
                {liquidityLables.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <FormGroup>
                <FormControlLabel
                  control={<Switch />}
                  label="Regulated"
                  name="isRegulated"
                  onChange={(e) => updateInvestmentInput(e)}
                />

                <FormControlLabel
                  control={<Switch />}
                  label="Shared Risk"
                  name="isCompanyCapital"
                  onChange={(e) => updateInvestmentInput(e)}
                />
              </FormGroup>
            </FormControl>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleInvestmentMentu} color="primary">
              Cancel
            </Button>
            <Button onClick={addInvestment} color="primary">
              Invest
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  })
);