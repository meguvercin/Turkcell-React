import React from "react";
import { Line } from "react-chartjs-2";
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

// 📌 Chart.js bileşenlerini kaydediyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  dataSets: {
    title: string;
    data: any[];
    color: string;
    yAxisType?: "money" | "count";
  }[];
}

// 📌 TL formatı
const formatMoney = (value: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(value);
};

const ChartComponent: React.FC<ChartComponentProps> = ({ dataSets }) => {
  return (
    <Line
      data={{
        labels: dataSets[0].data.map((item) => item.label),
        datasets: dataSets.map((set) => ({
          label: set.title,
          data: set.data.map((item) => item.value),
          borderColor: set.color,
          backgroundColor: set.color + "33",
          borderWidth: 2,
          pointRadius: 5,
        })),
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Başvurular ve Krediler Grafiği" },
        },
        scales: {
          y: {
            ticks: {
              callback: function (value: any, index: number, values: any) {
                const yAxisType = dataSets.some(
                  (set) => set.yAxisType === "money"
                )
                  ? "money"
                  : "count";
                return yAxisType === "money" ? formatMoney(value) : value;
              },
            },
          },
        },
      }}
    />
  );
};

export default ChartComponent;
