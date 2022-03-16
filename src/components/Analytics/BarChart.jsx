import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = observer((props) => {
  const plan = props.plan;
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "",
        backgroundColor: "",
      },
    ],
  });

  const options = {
    animation: false,
    responsive: true,
    locale: "en-US",
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "ILS",
              notation: "compact",
            }).format(value);
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estimated Profit Over Years",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "ILS",
                notation: "compact",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };
  const chart = () => {
    let planData = plan.interestAmountByYear;
    const labels = planData.years;

    const data = {
      labels,
      datasets: [
        {
          label: "Estimated Profit",
          data: planData.intrests,
          backgroundColor: "#4caf50",
        },
      ],
    };

    setBarData(data);
  };

  useEffect(() => {
    if (plan.id) {
      chart();
    }
  }, [plan.timeFrame, plan.investments.length]);

  return (
    <div style={{ width: 380 }}>
      <Bar options={options} data={barData} />
    </div>
  );
});
