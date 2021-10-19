
class API {

	async getPlans() {
		const res = await fetch("http://localhost:4000/getPlans")
		const plansJson = res.json()
		return plansJson
	}

	async getPlan(id) {
		const res = await fetch(`http://localhost:4000/getPlan/${id}`)
		const planJson = res.json()
		return planJson
	}

	async createPlan(name, investments) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, investments })
		}

		const res = await fetch("http://localhost:4000/createPlan", options)
		const planJson = res.json()
		return planJson;
	}

	async updatePlan(name, id) {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const res = await fetch(`http://localhost:4000/updatePlan/${id}/${name}`, options)
		return res.ok;
	}

	async addInvestment(id, investment) {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ investment })
		}

		const res = await fetch(`http://localhost:4000/addInvestment/${id}`, options)
		const planJson = res.json()
		return planJson;
	}

	async deletePlan(id) {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		}

		const res = await fetch(`http://localhost:4000/deletePlan/${id}`, options)
		const planJson = res.json()
	}

	async deleteInvestment(id, planId) {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		}

		const res = await fetch(`http://localhost:4000/deleteInvestment/${id}/${planId}`, options)
		return res.ok
	}

	async signup(name, email, password) {
		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*"
			},
			body: JSON.stringify({
				name,
				email,
				password
			})
		}

		return await fetch(`http://localhost:4000/auth/signup`, options)
	};

	async login(email, password) {
		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*"
			},
			body: JSON.stringify({
				email,
				password
			})
		}

		return await fetch(`http://localhost:4000/auth/login`, options)
	}

	async accountActivation(token) {
		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*"
			},
			body: JSON.stringify({
				token
			})
		}

		return await fetch(`http://localhost:4000/auth/account-activation`, options)
	}
}


export default new API()