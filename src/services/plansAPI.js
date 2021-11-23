class plansAPI {
  async getPlans(userId) {
    const res = await fetch(`http://localhost:4000/plans/getPlans/${userId}`);
    const plansJson = res.json();
    return plansJson;
  }

  async getPlan(planId, userId) {
    const res = await fetch(
      `http://localhost:4000/plans/getPlan/${planId}/${userId}`
    );
    const planJson = await res.json();
    return planJson;
  }

  async createPlan(name, userId) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": "<calculated when request is sent>",
      },
      body: JSON.stringify({ name }),
    };

    const res = await fetch(
      `http://localhost:4000/plans/createPlan/${userId}`,
      options
    );
    const planJson = await res.json();
    return planJson;
  }

  async updatePlan(name, planId, userId) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `http://localhost:4000/plans/updatePlan/${planId}/${name}/${userId}`,
      options
    );
    return res.ok;
  }

  async deletePlan(planId, userId) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `http://localhost:4000/plans/deletePlan/${planId}/${userId}`,
      options
    );
    const planJson = res.json();
    return planJson;
  }
}

export default new plansAPI();
