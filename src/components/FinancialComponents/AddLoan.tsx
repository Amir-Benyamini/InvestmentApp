import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {
    loanIn,
    loanInputValidation,
    validateInput,
    resetValidation
} from "../../constans/validations";
import * as loanActions from "../../actions/Loan";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";

interface NumberEvent {
    target: { name: string, value: number | undefined }


}
export const AddLoan = inject(
    "plansStore",
    "rates"
)(
    observer((props: any) => {
        const planId = props.plansStore.plan.id;
        const [loanMenu, setLoanMenu] = useState(false);
        const [loanInput, setLoanInput] = useState(loanIn);
        const [validation, setValidation] = useState(loanInputValidation);

        const rates = props.rates.latestRates;
        const user = localStorage.getItem("user");
        const userParsed = user ? JSON.parse(user) : null;
        const userId = userParsed ? userParsed._id : null;

        const updateIoanInput = (event: NumberEvent | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const updatedInputs = { ...loanInput };

            //@ts-ignore
            updatedInputs[event.target.name] = event.target.value;
            setLoanInput(updatedInputs);
        };

        const handleLoanMenu = () => {
            if (planId !== undefined) {
                setLoanInput(loanIn);
                resetValidation(validation, setValidation)
                setLoanMenu(!loanMenu);

            } else {
                toast.error("Please set plan first!");
            }
            if (loanMenu === true) props.handleClose()
        };

        const addLoan = async () => {
            if (validateInput(loanInput, validation, setValidation)) {
                loanActions.addLoan(loanInput, userId);
                handleLoanMenu();
                toast.success("Loan succesfully added!");
                if (loanMenu === true) props.handleClose()
            } else {
                toast.error("Please fill all requierd fields!");
            }
        };

        return (
            <div className="plus-icons">

                <CreditCardIcon sx={{ margin: "auto" }} onClick={handleLoanMenu} />

                <Dialog
                    /*@ts-ignore*/
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={loanMenu}
                    onClose={handleLoanMenu}
                >
                    <DialogTitle sx={{ textAlign: "center" }}>Fill Loan Data</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <FormControl>
                            <TextField
                                sx={{ margin: "5px 0" }}
                                id="name"
                                name="name"
                                type="text"
                                label="Loan Name"
                                required
                                error={validation.name.error}
                                helperText={validation.name.error ? validation.name.text : ""}
                                onChange={(e) => updateIoanInput(e)}
                            />

                            <TextField
                                sx={{ margin: "5px 0" }}
                                id="company"
                                name="company"
                                type="text"
                                label="Company"
                                required
                                error={validation.company.error}
                                helperText={validation.company.error ? validation.company.text : ""}
                                onChange={(e) => updateIoanInput(e)}
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
                                onChange={(e) => updateIoanInput(e)}
                            >
                                {Object.values(rates).map((currency: any) => (
                                    <MenuItem key={currency.code} value={currency.code}>
                                        {currency.code}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <NumberFormat
                                sx={{ margin: "5px 0" }}
                                value={loanInput.interest}
                                onValueChange={(values) => {
                                    let event = {
                                        target: {
                                            name: "interest",
                                            value: values.floatValue,
                                        },
                                    };
                                    updateIoanInput(event);
                                }}
                                customInput={TextField}
                                label="Interest Rate"
                                required
                                error={validation.interest.error}
                                helperText={
                                    validation.interest.error ? validation.interest.text : ""
                                }
                                thousandSeparator
                                suffix="%"
                                allowNegative={false}
                            />

                            <NumberFormat
                                sx={{ margin: "5px 0" }}
                                value={loanInput.amount}
                                onValueChange={(values) => {
                                    let event = {
                                        target: {
                                            name: "amount",
                                            value: values.floatValue,
                                        },
                                    };
                                    updateIoanInput(event);
                                }}
                                customInput={TextField}
                                type="text"
                                label="Liability Amount"
                                name="amount"
                                required
                                error={validation.amount.error}
                                helperText={
                                    validation.amount.error ? validation.amount.text : ""
                                }
                                thousandSeparator
                                allowNegative={false}
                            />
                        </FormControl>
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleLoanMenu} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={addLoan} color="primary">
                            Add Loan
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    })
);