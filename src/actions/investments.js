import { Investment } from "../objects/Investment";
import { plansStore, rates } from "../stores";
import investmentsAPI from "../services/investmentsAPI";

export const addInvestment = async (investmentInput, userId) => {
  const investmentJson = await investmentsAPI.addInvestment(
    plansStore.plan.id,
    investmentInput,
    userId
  );
  const investment = new Investment(investmentJson);
  investment.convertCurrency(rates.latestRates[investment.currency]);
  plansStore.addInvestment(investment);
};

export const deleteInvestment = async (investmentId, userId) => {
  const success = await investmentsAPI.deleteInvestment(
    investmentId,
    plansStore.plan.id,
    userId
  );
  if (success) {
    plansStore.deleteInvestment(investmentId);
  } else alert("Server error");
};
