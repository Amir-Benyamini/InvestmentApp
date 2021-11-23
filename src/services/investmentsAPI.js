class investmentsAPI {
  async addInvestment(planId, investment, userId) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ investment }),
    };

    const res = await fetch(
      `http://localhost:4000/investments/addInvestment/${planId}/${userId}`,
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
      `http://localhost:4000/investments/deleteInvestment/${investmentId}/${planId}/${userId}`,
      options
    );
    return res.ok;
  }
}

export default new investmentsAPI();
