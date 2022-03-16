import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { flexbox } from "@mui/system";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = observer((props) => {
  const plan = props.plan;
  const [doughnutData, setDoughnutData] = useState({
    labels: ["Initial Capital", "Estimated Profit"],
    datasets: [
      {
        label: "Initial Capital vs Estimated Profit",
        data: [],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      },
    ],
  });
  const options = {
    animation: false,
    responsive: true,
    locale: "en-US",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Initial Capital vs Estimated Profit",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || "";

            if (label) {
              label += ": ";
            }
            if (context !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "ILS",
                notation: "compact",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };
  const chart = () => {
    let data = [];

    data[0] = plan.totalInvestmentAmount;
    data[1] = plan.interestAmount;

    setDoughnutData({
      labels: ["Initial Capital", "Estimated Profit"],
      datasets: [
        {
          label: "Capital vs Estimated Profit",
          data: data,
          backgroundColor: ["#bdbdbd", "#4caf50"],
        },
      ],
    });
  };

  useEffect(() => {
    if (plan.id) {
      chart();
    }
  }, [plan.timeFrame, plan.investments.length]);

  return (
    <div style={{ width: 220 }}>
      <Doughnut options={options} data={doughnutData} />;
    </div>
  );
});
