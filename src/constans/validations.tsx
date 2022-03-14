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

export const validateInvestmentInput = (
  investmentInput: any,
  validation: any,
  setValidation: any
) => {
  if (investmentInput.name === "") {
    const newValidation = { ...validation };
    newValidation.name.error = true;
    setValidation(newValidation);
    return false;
  } else {
    const newValidation = { ...validation };
    newValidation.name.error = false;
    setValidation(newValidation);
  }
  if (investmentInput.company === "") {
    const newValidation = { ...validation };
    newValidation.company.error = true;
    setValidation(newValidation);
    return false;
  }
  if (investmentInput.company !== "") {
    const newValidation = { ...validation };
    newValidation.company.error = false;
    setValidation(newValidation);
  }
  if (investmentInput.currency === "") {
    const newValidation = { ...validation };
    newValidation.currency.error = true;
    setValidation(newValidation);
    return false;
  }
  if (investmentInput.currency !== "") {
    const newValidation = { ...validation };
    newValidation.currency.error = false;
    setValidation(newValidation);
  }
  if (investmentInput.revPerYear === 0) {
    const newValidation = { ...validation };
    newValidation.revPerYear.error = true;
    setValidation(newValidation);
    return false;
  }
  if (investmentInput.revPerYear !== 0) {
    const newValidation = { ...validation };
    newValidation.revPerYear.error = false;
    setValidation(newValidation);
  }
  if (investmentInput.amount === 0) {
    const newValidation = { ...validation };
    newValidation.amount.error = true;
    setValidation(newValidation);
    return false;
  }
  if (investmentInput.amount !== 0) {
    const newValidation = { ...validation };
    newValidation.amount.error = false;
    setValidation(newValidation);
  }
  if (investmentInput.type === "") {
    const newValidation = { ...validation };
    newValidation.type.error = true;
    setValidation(newValidation);
    return false;
  }
  if (investmentInput.type !== "") {
    const newValidation = { ...validation };
    newValidation.type.error = false;
    setValidation(newValidation);
  }
  if (investmentInput.liquidity === "") {
    const newValidation = { ...validation };
    newValidation.liquidity.error = true;
    setValidation(newValidation);
    return false;
  }
  if (investmentInput.liquidity !== "") {
    const newValidation = { ...validation };
    newValidation.liquidity.error = false;
    setValidation(newValidation);
  }

  return true;
};