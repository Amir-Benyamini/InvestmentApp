import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = observer((props) => {
  const plan = props.plan;
  const [lineData, setLineData] = useState({
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
              style: "percent",
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
        text: "Estimated Yield Over Years",
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
                style: "percent",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };
  const chart = () => {
    let planData = plan.yieldByYear;
    const labels = planData.years;

    const data = {
      labels,
      datasets: [
        {
          label: "Estimated Yield",
          data: planData.intrests,
          backgroundColor: "#4caf50",
        },
      ],
    };

    setLineData(data);
  };

  useEffect(() => {
    if (plan.id) {
      chart();
    }
  }, [plan.timeFrame, plan.investments.length]);

  return (
    <div style={{ width: 380 }}>
      <Line options={options} data={lineData} />
    </div>
  );
});
