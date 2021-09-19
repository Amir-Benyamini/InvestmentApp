import { Investment } from '../objects/Investment'
import {selectedPlan, rates} from '../stores'
import API from '../services/api';
import { Plan } from '../objects/Plan';

export const fetchPlans = async () => {
	const plansJson = await API.getPlans();
	const plans = plansJson.map((plan) => new Plan(plan, rates.getUSDRate()))
	selectedPlan.setPlans(plans)
}

export const setPlan = (plan) => {
	selectedPlan.setPlan(plan)
}

export const createPlan = async (name, investments = []) => {
	const newPlan = await API.createPlan(name, investments)
	selectedPlan.setPlan(newPlan)
}

export const deletePlan = async (id) => {
	API.deletePlan(id)
	// TODO - update store
}

export const addInvestment = async (investmentInput, rate) => {
	const investmentJson = await API.addInvestment(selectedPlan.plan.id, investmentInput)
	const investment = new Investment(investmentJson, rate)
	selectedPlan.addInvestment(investment)
}

export const updatePlanName = async (name, id) => {
	const success = await API.updatePlan(name, id)
	if (success) selectedPlan.updatePlanName(name)
}

export const deleteInvestment = async (investmentId) => {
	const success = await API.deleteInvestment(investmentId, selectedPlan.plan.id)
	if (success) {
		selectedPlan.deleteInvestment(investmentId)
	} else alert('Server error')
}