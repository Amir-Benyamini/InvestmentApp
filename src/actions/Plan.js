import { plansStore, rates } from "../stores";
import plansAPI from "../services/plansAPI";
import { Plan } from "../objects/Plan";

export const fetchPlans = async (userId) => {
  const plansJson = await plansAPI.getPlans(userId);
  const plans = plansJson.map((plan) => new Plan(plan));
  plansStore.setPlans(plans);
  plansStore.updatePlansRates(rates.latestRates);
};

export const setPlan = (plan) => {
  plansStore.setPlan(plan);
};

export const fetchFirstPlan = async (user) => {
  const plansJson = await plansAPI.getPlans(user._id);
  const plans = plansJson.map((plan) => new Plan(plan));
  plansStore.setPlans(plans);
  plansStore.updatePlansRates(rates.latestRates);

  if (plansStore.plans.length > 0) {
    plansStore.setPlan(plansStore.plans[0]);
  } else {
    const planJason = await plansAPI.createPlan(user.name, user._id);
    const plan = new Plan(planJason);
    plansStore.setPlan(plan);
  }
};

export const createPlan = async (name, userId) => {
  const planJason = await plansAPI.createPlan(name, userId);
  const plan = new Plan(planJason);
  plansStore.setPlan(plan);
  return planJason;
};

export const deletePlan = async (userId) => {
  plansAPI.deletePlan(plansStore.plan.id, userId);
  plansStore.deletePlan(plansStore.plan.id);
};

export const updatePlanName = async (name, planId, userId) => {
  const success = await plansAPI.updatePlan(name, planId, userId);
  if (success) {
    plansStore.updatePlanName(name);
  }
};

export const changePlanTimeFrame = (timeFrame) => {
  plansStore.setPlanTimeFrame(timeFrame);
};
