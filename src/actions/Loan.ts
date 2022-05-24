import { Loan } from "../objects/Loan";
import loansAPI from "../services/loansAPI";
import { plansStore, rates } from "../stores";


export const addLoan = async (loanInput: object, userId: string) => {
    const loanJson = await loansAPI.addLoan(
        //@ts-ignore
        plansStore.plan.id,
        loanInput,
        userId
    );
    const loan = new Loan(loanJson);
    //@ts-ignore
    loan.convertCurrency(rates.latestRates[loan.currency].value);
    plansStore.addLoan(loan);
};

export const deleteLoan = async (loanId: string, userId: string) => {
    const success = await loansAPI.deleteLoan(
        loanId,
        //@ts-ignore
        plansStore.plan.id,
        userId
    );
    if (success) {
        plansStore.deleteLoan(loanId);
    } else alert("Server error");
};
