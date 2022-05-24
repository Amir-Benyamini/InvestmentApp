class loansAPI {
  baseUrl =
    process.env.REACT_APP_ENV == "production"
      ? "https://enwhealthy.herokuapp.com/"
      : "http://localhost:4000/";

  async addLoan(planId, loan, userId) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loan }),
    };

    const res = await fetch(
      `${this.baseUrl}loans/addLoan/${planId}/${userId}`,
      options
    );
    const planJson = res.json();
    return planJson;
  }

  async deleteLoan(loanId, planId, userId) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${this.baseUrl}loans/deleteLoan/${loanId}/${planId}/${userId}`,
      options
    );
    return res.ok;
  }
}

export default new loansAPI();
