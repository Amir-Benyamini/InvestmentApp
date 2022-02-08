class investmentsAPI {
  baseUrl =
    process.env.REACT_APP_ENV == "production"
      ? "https://enwhealthy.herokuapp.com/"
      : "http://localhost:3000/";

  async addInvestment(planId, investment, userId) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ investment }),
    };

    const res = await fetch(
      `${this.baseUrl}investments/addInvestment/${planId}/${userId}`,
      options
    );
    const planJson = res.json();
    return planJson;
  }

  async deleteInvestment(investmentId, planId, userId) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${this.baseUrl}investments/deleteInvestment/${investmentId}/${planId}/${userId}`,
      options
    );
    return res.ok;
  }
}

export default new investmentsAPI();
