import { observable, makeObservable, action } from "mobx";

export class PlansStore {
  constructor() {
    this.plan = {
      investments: [],
      loans: [],
      data: [],
      name: "",
      startDate: undefined,
      endDate: undefined,
      timeFrame: 1,
    };
    this.plans = [];

    makeObservable(this, {
      plans: observable,
      plan: observable,
      setPlans: action,
      setPlan: action,
      setPlanTimeFrame: action,
      updatePlanName: action,
      addInvestment: action,
      deleteInvestment: action,
      addLoan: action
    });
  }
 //plans methods
  setPlans(plans) {
    this.plans = plans;
  }

  addPlan(newPlan) {
    this.plans.push(newPlan);
    this.plan = newPlan;
  }

  setPlan(plan) {
    this.plan = plan;
  }

  setPlanTimeFrame(timeFrameObj) {
    this.plan.startDate = timeFrameObj.start;
    this.plan.endDate = timeFrameObj.end;
    this.plan.timeFrame = timeFrameObj.timeFrame;
  }

  updatePlanName(name) {
    this.plan.name = name;
  }

  deletePlan(id) {
    this.plan = {
      investments: [],
      timeFrame: 1,
      name: "",
    };
    this.plans = this.plans.filter(function (plan) {
      return plan.id !== id;
    });
  }

  updatePlansRates(rates) {
    this.plans.forEach((plan) => {
      plan.convertInvestmentsCurrency(rates);
    });
  }
  //investments methods
  addInvestment(investment) {
    this.plan.investments.push(investment);
    this.plan.data.push(investment)
  }

  deleteInvestment(investmentId) {
    this.plan.investments = this.plan.investments.filter(function (investment) {
      return investment.id !== investmentId;
    });

    this.plan.data = this.plan.data.filter(function (item) {
      return item.id !== investmentId;
    });
  }
   //loans methods
   addLoan(loan) {
    this.plan.loans.push(loan);
    this.plan.data.push(loan)
  }

  deleteLoan(loanId) {
    this.plan.loans = this.plan.loans.filter( (loan) => {
      return loan.id !== loanId;
    });

    this.plan.data = this.plan.data.filter( (loan) => {
      return loan.id !== loanId;
    });
  }
}


