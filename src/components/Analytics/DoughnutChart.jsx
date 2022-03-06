import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = observer((props) => {
  const plan = props.plan;
  const [doughnutData, setDoughnutData] = useState({
    labels: ["Capital", "Profit"],
    datasets: [
      {
        label: "Capital vs Profit",
        data: [],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      },
    ],
  });
  const options = {
    responsive: true,
    locale: "en-US",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Capital vs Profit",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";

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
      labels: ["Capital", "Profit"],
      datasets: [
        {
          label: "Capital vs Profit",
          data: data,
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    });
  };

  useEffect(() => {
    if (plan.id) {
      chart();
    }
  }, [plan.id, plan.timeFrame]);

  return (
    <div style={{ width: 300 }}>
      <Doughnut options={options} data={doughnutData} />
    </div>
  );
});
