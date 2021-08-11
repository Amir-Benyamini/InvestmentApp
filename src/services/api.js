
class API {
	baseUrl = "http://localhost:4000"

	getPlans() {

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
		const plansJson = res.json()
	}
}

export default new API()