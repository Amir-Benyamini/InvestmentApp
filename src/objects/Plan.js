import { Investment } from "./Investment";
import { makeObservable, observable } from "mobx";
import { getYear, addYears } from "date-fns";

export class Plan {
  investments = [];
  timeFrame = 1;
  name = "";

  constructor(planJson) {
    makeObservable(this, {
      investments: observable,
      timeFrame: observable,
      name: observable,
    });

    planJson.investments.forEach((investmentJson) => {
      const investment = new Investment(investmentJson);
      this.investments.push(investment);
    });

    this.name = planJson.name;
    this.id = planJson._id;
  }

  get totalInvestmentAmount() {
    let amount = 0;

    this.investments.forEach((investment) => {
      if (investment.currency === "USD") {
        amount += investment.convertedAmount;
      } else {
        amount += investment.amount;
      }
    });

    return amount;
  }

  get interestAmount() {
    let interest = 0;

    this.investments.forEach((investment) => {
      if (investment.type === "Stock-Market") {
        interest += investment.compoundInterest(this.timeFrame);
      } else {
        interest += investment.interest(this.timeFrame);
      }
    });

    return interest;
  }

  interestAmountByYear(startYear) {
    let data = { years: [], intrests: [] };

    for (let i = 0; i < this.timeFrame; i++) {
      let intrest = 0;
      let years = 1;
      years += i;

      this.investments.forEach((investment) => {
        if (investment.type === "Stock-Market") {
          intrest += investment.compoundInterest(years);
        } else {
          intrest += investment.interest(years);
        }
      });
      data.intrests.push(intrest);
      let year = startYear + years;
      data.years.push(year + "");
    }

    return data;
  }

  get totalAmount() {
    let totalAmount = 0;

    this.investments.forEach((investment) => {
      if (investment.currency === "USD") {
        totalAmount += investment.convertedAmount;

        if (investment.type === "Stock-Market") {
          totalAmount += investment.compoundInterest(this.timeFrame);
        } else {
          totalAmount += investment.interest(this.timeFrame);
        }
      } else {
        totalAmount += investment.amount;

        if (investment.type === "Stock-Market") {
          totalAmount += investment.compoundInterest(this.timeFrame);
        } else {
          totalAmount += investment.interest(this.timeFrame);
        }
      }
    });

    return totalAmount;
  }

  convertInvestmentsCurrency(rates) {
    this.investments.forEach((investment) => {
      investment.convertCurrency(rates[investment.currency]);
    });
  }
}
