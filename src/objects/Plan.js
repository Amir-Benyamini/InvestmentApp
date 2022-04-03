import { Investment } from "./Investment";
import { makeObservable, observable } from "mobx";

export class Plan {
  investments = [];
  name = "";
  startDate = undefined;
  endDate = undefined;
  timeFrame = 1;

  constructor(planJson) {
    makeObservable(this, {
      investments: observable,
      timeFrame: observable,
      name: observable,
      startDate: observable,
      endDate: observable,
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

  get interestAmountByYear() {
    let data = { years: [], intrests: [] };
    
    for (let i = 0; i < this.timeFrame; i++) {
      let intrest = 0;
      let years = 0;
      years += i;

      this.investments.forEach((investment) => {
        if (investment.type === "Stock-Market") {
          intrest +=
            investment.compoundInterest(years + 1) -
            investment.compoundInterest(years);
        } else {
          intrest +=
            investment.interest(years + 1) - investment.interest(years);
        }
      });
      data.intrests.push(intrest);
      let year = this.startDate + years;
      data.years.push(year + "");
    }

    return data;
  }

  get yield() {
    let amount = 0;
    let interest = 0;

    this.investments.forEach((investment) => {
      if (investment.currency === "USD") {
        amount += investment.convertedAmount;
      } else {
        amount += investment.amount;
      }
    });

    this.investments.forEach((investment) => {
      if (investment.type === "Stock-Market") {
        interest += investment.compoundInterest(this.timeFrame);
      } else {
        interest += investment.interest(this.timeFrame);
      }
    });
    return interest / amount;
  }

  get yieldByYear() {
    let data = { years: [], intrests: [] };

    for (let i = 0; i < this.timeFrame; i++) {
      let intrest = 0;
      let amount = 0;
      let years = 0;
      years += i;

      this.investments.forEach((investment) => {
        if (investment.type === "Stock-Market") {
          intrest += investment.compoundInterest(years +1) - investment.compoundInterest(years);
         
        } 
         if(investment.type === "Real-Estat"){
          intrest += investment.interest(years +1) - investment.interest(years);;
        } 
         if(investment.currency === "USD"){
          amount += investment.convertedAmount;
        } 
         if(investment.currency === "ILS"){
          amount += investment.amount;
        }
      });

 
      data.intrests.push(intrest / amount);
      let year = this.startDate + years;
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
      investment.convertCurrency(rates[investment.currency].value);
    });
  }
}
