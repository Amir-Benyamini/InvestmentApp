
class API {

	async getPlans() {
		
		const res = await fetch("http://localhost:4000/getPlans")
		const plansJson = res.json()
		return plansJson
	}

	async savePlan(planName, investments) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ planName, investments })
		}

		const res = await fetch("http://localhost:4000/savePlan", options)
		const planJson = res.json()
	}
}

export default new API()