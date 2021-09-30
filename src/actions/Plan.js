import { Investment } from '../objects/Investment'
import {plansStore, rates} from '../stores'
import API from '../services/api';
import { Plan } from '../objects/Plan';

export const fetchPlans = async () => {
	const plansJson = await API.getPlans();
	const plans = plansJson.map((plan) => new Plan(plan, rates.getUSDRate()))
	plansStore.setPlans(plans)
}

export const setPlan = (plan) => {
	plansStore.setPlan(plan)
}


export const createPlan = async (name, investments = []) => {
	const planJason = await API.createPlan(name, investments)
	const plan = new Plan(planJason, rates.getUSDRate())
	plansStore.setPlan(plan)
}

export const deletePlan = async () => {
	API.deletePlan(plansStore.plan.id)
	plansStore.deletePlan(plansStore.plan.id)
}

export const addInvestment = async (investmentInput) => {
	const investmentJson = await API.addInvestment(plansStore.plan.id, investmentInput)
	const investment = new Investment(investmentJson, rates.latestRates.quotes.USDILS)
	plansStore.addInvestment(investment)
}

export const updatePlanName = async (name, id) => {
	const success = await API.updatePlan(name, id)
	if (success) {
		// plansStore.updatePlanName(name)
		const planJason = await API.getPlan(id)
		const plan = new Plan (planJason, rates.getUSDRate())
		plansStore.setPlan(plan)
	}}

export const changePlanTimeFrame = (timeFrame) => {
	plansStore.setPlanTimeFrame(timeFrame)
}


export const deleteInvestment = async (investmentId) => {
	const success = await API.deleteInvestment(investmentId, plansStore.plan.id)
	if (success) {
		plansStore.deleteInvestment(investmentId)
	} else alert('Server error')
}