import { observable, makeObservable, action } from "mobx";

export class Rates {
  constructor() {
    this.url = process.env.REACT_APP_ENV === "production" ? "https://enwhealthy.herokuapp.com/rates/getRates" : "http://localhost:4000/rates/getRates"
    this.latestRates = {};
    this.fetchLatests();

    makeObservable(this, {
      latestRates: observable,
      fetchLatests: action,
    });
  }

  async fetchLatests() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      this.url,
      options
    );
    
    const data = await response.json();
    this.latestRates = data
   
  }

  convertUSDILS(amount) {
    let converted = this.latestRates.USD.value * parseInt(amount);
    return Math.round(converted);
  }

  getUSDRate() {
    return this.latestRates.USD.value;
  }
}
