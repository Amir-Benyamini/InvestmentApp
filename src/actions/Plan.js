import { Investment } from '../objects/Investment'
import {plansStore, rates} from '../stores'
import API from '../services/api';
import { Plan } from '../objects/Plan';

export const fetchPlans = async (userId) => {
	const plansJson = await API.getPlans(userId);
	const plans = plansJson.map((plan) => new Plan(plan, rates.getUSDRate()))
	plansStore.setPlans(plans)
}

export const setPlan = (plan) => {
	plansStore.setPlan(plan)
}


export const createPlan = async (name, userId) => {
	const planJason = await API.createPlan(name, userId)
	const plan = new Plan(planJason, rates.getUSDRate())
	plansStore.setPlan(plan)
}

export const deletePlan = async (userId) => {
	API.deletePlan(plansStore.plan.id, userId)
	plansStore.deletePlan(plansStore.plan.id)
}

export const addInvestment = async (investmentInput, userId) => {
	const investmentJson = await API.addInvestment(plansStore.plan.id, investmentInput, userId)
	const investment = new Investment(investmentJson, rates.latestRates.quotes.USDILS)
	plansStore.addInvestment(investment)
}

export const updatePlanName = async (name, planId, userId) => {
	const success = await API.updatePlan(name, planId, userId)
	if (success) {
		plansStore.updatePlanName(name)
		// const planJason = await API.getPlan(id)
		// const plan = new Plan (planJason, rates.getUSDRate())
		// plansStore.setPlan(plan)
	}}

export const changePlanTimeFrame = (timeFrame) => {
	plansStore.setPlanTimeFrame(timeFrame)
}


export const deleteInvestment = async (investmentId, userId) => {
	const success = await API.deleteInvestment(investmentId, plansStore.plan.id, userId)
	if (success) {
		plansStore.deleteInvestment(investmentId)
	} else alert('Server error')
}


