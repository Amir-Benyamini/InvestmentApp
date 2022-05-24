import LoanDoc from "../../investmentBackend/src/interfaces/loanDoc"

export class Loan {
    id
    name
    company
    amount
    currency
    interest
    currencyRate
    convertedAmount
    type = "Loan"
    subType


    constructor(loanInput: LoanDoc) {
        this.id = loanInput._id
        this.name = loanInput.name
        this.company = loanInput.company
        this.amount = loanInput.amount
        this.currency = loanInput.currency
        this.interest = loanInput.interest
        this.currencyRate = 1;
        this.convertedAmount = this.amount * this.currencyRate;
        this.subType = loanInput.subType

    }
    interestAmount(TimeRange: number) {
        const rate = this.interest / 100;
        if (this.currency !== "ILS") {
            const interest = this.convertedAmount * rate * TimeRange;
            return Math.round(interest);
        } else {
            const interest = this.amount * rate * TimeRange;
            return Math.round(interest);
        }
    }
    convertCurrency(rate: number) {
        if (rate) {
            this.currencyRate = rate;
        }
        this.convertedAmount = this.amount / this.currencyRate;
    }
}
