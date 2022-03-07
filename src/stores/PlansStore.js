import { observable, makeObservable, action } from "mobx";

export class PlansStore {
  constructor() {
    this.plan = {
      investments: [],
      name: "",
      startDate: undefined,
      endDate: undefined,
      timeFrame: 1,
    };
    this.plans = [];

    makeObservable(this, {
      plans: observable,
      setPlans: action,
      plan: observable,
      addInvestment: action,
      deleteInvestment: action,
      setPlan: action,
      setPlanTimeFrame: action,
      updatePlanName: action,
    });
  }

  setPlans(plans) {
    this.plans = plans;
  }

  addInvestment(investment) {
    this.plan.investments.push(investment);
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

  deleteInvestment(investmentId) {
    this.plan.investments = this.plan.investments.filter(function (investment) {
      return investment.id !== investmentId;
    });
  }

  updatePlansRates(rates) {
    this.plans.forEach((plan) => {
      plan.convertInvestmentsCurrency(rates);
    });
  }
}
