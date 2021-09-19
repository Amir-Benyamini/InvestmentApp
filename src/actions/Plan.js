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
	const newPlan = await API.createPlan(name, investments)
	plansStore.setPlan(newPlan)
}

export const deletePlan = async () => {
	API.deletePlan(plansStore.deletePlan(plansStore.plan.id))
	// TODO - update store
}

export const addInvestment = async (investmentInput) => {
	const investmentJson = await API.addInvestment(plansStore.plan.id, investmentInput)
	const investment = new Investment(investmentJson, rates.latestRates.quotes.USDILS)
	plansStore.addInvestment(investment)
}

export const updatePlanName = async (name, id) => {
	const success = await API.updatePlan(name, id)
	if (success) plansStore.updatePlanName(name)
}

export const deleteInvestment = async (investmentId) => {
	const success = await API.deleteInvestment(investmentId, plansStore.plan.id)
	if (success) {
		plansStore.deleteInvestment(investmentId)
	} else alert('Server error')
}