
class API {

	async getPlans(userId) {
		const res = await fetch(`http://localhost:4000/getPlans/${userId}`)
		const plansJson = res.json()
		return plansJson
	}

	async getPlan(planId, userId) {
		const res = await fetch(`http://localhost:4000/getPlan/${planId}/${userId}`)
		const planJson = res.json()
		return planJson
	}

	async createPlan(name, userId) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const res = await fetch(`http://localhost:4000/createPlan/${name}/${userId}`, options)
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

	async addInvestment(planId, investment, userId) {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ investment })
		}

		const res = await fetch(`http://localhost:4000/addInvestment/${planId}/${userId}`, options)
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
		return planJson
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

	async loadProfile(id, token) {
		const options = {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Authorization": `Bearer ${token}`
			}
		}

		return await fetch(`http://localhost:4000/user/${id}`, options)
	}

	async updateProfile(name, password, token) {
		const options = {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name,
				password
			})
		}

		return await fetch(`http://localhost:4000/user/update`, options)
	}

	async forgotPassword(email) {
		const options = {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
			},
			body: JSON.stringify({
				email
			})
		}

		return await fetch(`http://localhost:4000/auth/forgot-password`, options)
	}

	async resetPassword(newPassword, token) {
		const options = {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
			},
			body: JSON.stringify({
				resetPasswordLink: token,
				newPassword
			})
		}

		return await fetch(`http://localhost:4000/auth/reset-password`, options)
	}

	async googleLogin(token) {
		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*"
			},
			body: JSON.stringify({
				idToken: token
			})
		}

		return await fetch(`http://localhost:4000/auth/google-login`, options)
	}

	async facebookLogin(userID, accessToken) {
		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*"
			},
			body: JSON.stringify({
				userID,
				accessToken
			})
		}

		return await fetch(`http://localhost:4000/auth/facebook-login`, options)
	}
	
}




export default new API()