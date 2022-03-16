import { observable, makeObservable, action } from "mobx";

export class Rates {
  constructor() {
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
      "https://api.currencyapi.com/v3/latest?apikey=86697850-88f9-11ec-a628-3dea19c29d44&base_currency=ILS",
      options
    );
    
    const data = await response.json();

    this.latestRates = data.data;
   
  }

  convertUSDILS(amount) {
    let converted = this.latestRates.USD.value * parseInt(amount);
    return Math.round(converted);
  }

  getUSDRate() {
    return this.latestRates.USD.value;
  }
}
