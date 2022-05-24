import { Investment } from "./Investment";
import { Loan } from "./Loan"
import { makeObservable, observable } from "mobx";

export class Plan {
  investments = [];
  loans = [];
  data = []
  name = "";
  startDate = undefined;
  endDate = undefined;
  timeFrame = 1;

  constructor(planJson) {
    makeObservable(this, {
      investments: observable,
      loans: observable,
      data: observable,
      timeFrame: observable,
      name: observable,
      startDate: observable,
      endDate: observable,
    });

    planJson.investments.forEach((investmentJson) => {
      const investment = new Investment(investmentJson);
      this.investments.push(investment);
      this.data.push(investment)
    });
    if(planJson.loans) {
      planJson.loans.forEach((loanJson) => {
        const loan = new Loan(loanJson);
        this.loans.push(loan);
        this.data.push(loan)
      });
    }

    this.name = planJson.name;
    this.id = planJson._id;
  }
  //plan methods
  get totalPlanAmount() {
    let amount = 0;

    this.data.forEach((item) => {
      if(item.type === "Investment") {
        if (item.currency !== "ILS") {
          amount += item.convertedAmount;
        } else {
          amount += item.amount;
        }
      }

      if(item.type === "Loan") {
        if (item.currency !== "ILS") {
          amount -= item.convertedAmount;
        } else {
          amount -= item.amount;
        }
      }
      
    });

    return amount;
  }

  get planRevAmount() {
    let amount = 0;

    this.data.forEach((item) => {
      if(item.type === "Investment") {
        if (item.subType === "Stock-Market") {
          amount += item.compoundInterest(this.timeFrame);
        } else {
          amount += item.interestAmount(this.timeFrame);
        }
      } 

      if(item.type === "Loan") {
        amount -= item.interestAmount(this.timeFrame);
      }
      
    });

    return amount;
  }

  // get interestAmountByYear() {
  //   let data = { years: [], intrests: [] };
    
  //   for (let i = 0; i < this.timeFrame; i++) {
  //     let intrest = 0;
  //     let years = 0;
  //     years += i;

  //     this.data.forEach((item) => {
  //       if(item.type === "Investment") {
  //         if (item.subType === "Stock-Market") {
  //           intrest +=
  //           item.compoundInterest(years + 1) -
  //           item.compoundInterest(years);
  //         } else {
  //           intrest +=
  //           item.interest(years + 1) - item.interest(years);
  //         }
  //       }
  //       if(item.type === "Loan") {
  //           intrest -=
  //           item.interestAmount(years + 1) - item.interestAmount(years);
  //         }

  //     });

  //     data.intrests.push(intrest);
  //     let year = this.startDate + years;
  //     data.years.push(year + "");
  //   }

  //   return data;
  // }

  // get planYield() {
  //   let amount = 0;
  //   let interest = 0;
    
  //   this.data.forEach((item) => {
  //     if(item.type === "Investment"){ 
  //       if (item.currency !== "ILS") {
  //       amount += item.convertedAmount;
  //     } else {
  //       amount += item.amount;
  //     }}

  //     if(item.type === "Loan") {
  //       if (item.currency !== "ILS") {
  //         amount -= item.convertedAmount;
  //       } else {
  //         amount -= item.amount;
  //       }
  //     }
  //   });

  //   this.data.forEach((item) => {
  //     if(item.type === "Investment") {
  //       if (item.subType === "Stock-Market") {
  //         interest += item.compoundInterest(this.timeFrame);
  //       } else {
  //         interest += item.interestAmount(this.timeFrame);
  //       }
  //     }
  //     if(item.type === "Loan") {
  //       interest -= item.interestAmount(this.timeFrame);
  //     }
     
  //   });
  //   return interest / amount;
  // }
  
  //Investments methods
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
      if (investment.subType === "Stock-Market") {
        interest += investment.compoundInterest(this.timeFrame);
      } else {
        interest += investment.interestAmount(this.timeFrame);
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
        if (investment.subType === "Stock-Market") {
          intrest +=
            investment.compoundInterest(years + 1) -
            investment.compoundInterest(years);
        } else {
          intrest +=
            investment.interestAmount(years + 1) - investment.interestAmount(years);
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
      if (investment.subType === "Stock-Market") {
        interest += investment.compoundInterest(this.timeFrame);
      } else {
        interest += investment.interestAmount(this.timeFrame);
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
        if (investment.subType === "Stock-Market") {
          intrest += investment.compoundInterest(years +1) - investment.compoundInterest(years);
         
        } 
         if(investment.subType === "Real-Estat"){
          intrest += investment.interestAmount(years +1) - investment.interestAmount(years);;
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

        if (investment.subType === "Stock-Market") {
          totalAmount += investment.compoundInterest(this.timeFrame);
        } else {
          totalAmount += investment.interestAmount(this.timeFrame);
        }
      } else {
        totalAmount += investment.amount;

        if (investment.subType === "Stock-Market") {
          totalAmount += investment.compoundInterest(this.timeFrame);
        } else {
          totalAmount += investment.interestAmount(this.timeFrame);
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
  convertLiabilitiesCurrency(rates) {
    this.loans.forEach((loan) => {
      loan.convertCurrency(rates[loan.currency].value);
    });
  }
}
