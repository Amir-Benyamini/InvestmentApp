import InvestmentDoc from "../../investmentBackend/src/interfaces/investmentDoc"

export class Investment {
  type = "Investment"
  id
  amount
  currencyRate
  convertedAmount
  name
  company
  currency
  revPerYear
  endDate
  liquidity
  subType
  isCompanyCapital
  isRegulated

  constructor(investmentInput: InvestmentDoc) {
    this.id = investmentInput._id;
    this.amount = investmentInput.amount;
    this.currencyRate = 1;
    this.convertedAmount = this.amount * this.currencyRate;
    this.name = investmentInput.name;
    this.company = investmentInput.company;
    this.currency = investmentInput.currency;
    this.revPerYear = investmentInput.revPerYear;
    this.endDate = investmentInput.endDate;
    this.liquidity = investmentInput.liquidity;
    this.subType = investmentInput.subType;
    this.isCompanyCapital = investmentInput.isCompanyCapital;
    this.isRegulated = investmentInput.isRegulated;
  }

  compoundInterest(investmentsTimeRange: number) {
    const rate = this.revPerYear / 100;
    const base = 1 + rate;
    if (this.currency !== "ILS") {
      const compundInterest =
        this.convertedAmount * Math.pow(base, investmentsTimeRange) -
        this.convertedAmount;
      return Math.round(compundInterest);
    } else {
      const compundInterest =
        this.amount * Math.pow(base, investmentsTimeRange) - this.amount;
      return Math.round(compundInterest);
    }
  }

  interestAmount(investmentsTimeRange: number) {
    const rate = this.revPerYear / 100;
    if (this.currency !== "ILS") {
      const interest = this.convertedAmount * rate * investmentsTimeRange;
      return Math.round(interest);
    } else {
      const interest = this.amount * rate * investmentsTimeRange;
      return Math.round(interest);
    }
  }

  risk() {
    let riskIndicators = 1;

    if (this.isRegulated) {
      riskIndicators -= 0.2;
    }
    if (this.isCompanyCapital) {
      riskIndicators -= 0.2;
    }
    if (this.currency === "ILS") {
      riskIndicators -= 0.2;
    }
    if (this.liquidity) {
      if (this.liquidity === "days") {
        riskIndicators -= 0.2;
      }
      if (this.liquidity === "weeks") {
        riskIndicators -= 0.1875;
      }
      if (this.liquidity === "months") {
        riskIndicators -= 0.125;
      }
      if (this.liquidity === "years") {
        riskIndicators -= 0.0625;
      }
    }
    const riskCal = riskIndicators;
    return riskCal;
  }

  convertCurrency(rate: number) {
    if (rate) {
      this.currencyRate = rate;
    }
    this.convertedAmount = this.amount / this.currencyRate;
  }

}
