import { plansStore, rates } from "../stores";
import plansAPI from "../services/plansAPI";
import { Plan } from "../objects/Plan";

export const fetchPlans = async (userId) => {
  const plansJson = await plansAPI.getPlans(userId);
  const plans = plansJson.map((plan) => new Plan(plan, rates.getUSDRate()));
  plansStore.setPlans(plans);
};

export const setPlan = (plan) => {
  plansStore.setPlan(plan);
};

export const createPlan = async (name, userId) => {
  const planJason = await plansAPI.createPlan(name, userId);
  const plan = new Plan(planJason, rates.getUSDRate());
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
    // const planJason = await plansAPI.getPlan(id)
    // const plan = new Plan (planJason, rates.getUSDRate())
    // plansStore.setPlan(plan)
  }
};

export const changePlanTimeFrame = (timeFrame) => {
  plansStore.setPlanTimeFrame(timeFrame);
};
