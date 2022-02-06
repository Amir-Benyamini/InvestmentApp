export const investmentIn = {
  name: "",
  company: "",
  currency: "",
  revPerYear: 0,
  amount: 0,
  liquidity: "",
  type: "",
  isCompanyCapital: false,
  isRegulated: false,
  endDate: "",
};

export const inputValidation = {
  name: { error: false, text: "name is requierd" },
  company: { error: false, text: "company is requierd" },
  currency: { error: false, text: "currency is requierd" },
  revPerYear: { error: false, text: "revenue is requierd" },
  amount: { error: false, text: "amount is requierd" },
  liquidity: { error: false, text: "liquitidy is requierd" },
  type: { error: false, text: "investment type is requierd" },
};
