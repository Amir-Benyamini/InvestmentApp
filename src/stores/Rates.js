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
      "https://freecurrencyapi.net/api/v2/latest?apikey=86697850-88f9-11ec-a628-3dea19c29d44&base_currency=ILS",
      options
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.latestRates = data.data;
    console.log(this.latestRates);
  }

  convertUSDILS(amount) {
    let converted = this.latestRates.quotes.USDILS * parseInt(amount);
    return Math.round(converted);
  }

  getUSDRate() {
    return this.latestRates.USD;
  }
}
