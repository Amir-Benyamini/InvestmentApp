
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