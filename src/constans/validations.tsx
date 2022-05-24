export const investmentIn = {
  type: "Investment",
  subType: "",
  name: "",
  company: "",
  currency: "",
  revPerYear: 0,
  amount: 0,
  liquidity: "",
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
  subType: { error: false, text: "investment type is requierd" },
};

export const loanInputValidation = {
  name: { error: false, text: "name is requierd" },
  company: { error: false, text: "company is requierd" },
  currency: { error: false, text: "currency is requierd" },
  interest: { error: false, text: "interest is requierd" },
  amount: { error: false, text: "amount is requierd" },

};

export const loanIn = {
  type: "Loan",
  name: "",
  company: "",
  currency: "",
  interest: 0,
  amount: 0,
};


export const validateInput = (
  input: any,
  validation: any,
  setValidation: any
) => {

  const inputList = Object.keys(input)
  const validationList = inputList.filter(key => `${key}` in validation)

  for (let i = 0; i < validationList.length; i++) {
    let key = validationList[i]
    if (!input[key]) {
      const newValidation = { ...validation };
      newValidation[key].error = true
      setValidation(newValidation)
      return false
    } else {
      const newValidation = { ...validation };
      newValidation[key].error = false
      setValidation(newValidation)
    }
  }
  return true;


};

export const resetValidation = (validation: any, setValidation: any) => {
  const validationList = Object.keys(validation)
  validationList.forEach(key => {
    validation[key].error = false
  })
  setValidation(validation)
}