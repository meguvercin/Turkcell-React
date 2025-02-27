import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// 📌 Rastgele renkler belirledik
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#FF5733",
];

// 📌 Props interface
interface PieChartComponentProps {
  dataSets: {
    title: string;
    data: { label: string; value: number }[];
    color?: string;
  }[];
}

// 📌 Functional PieChart Component
const PieChartComponent: React.FC<PieChartComponentProps> = ({ dataSets }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {dataSets.map((set, index) => (
        <div key={index} className="w-1/2 flex flex-col items-center -mt-20">
          <ResponsiveContainer width={800} height={400}>
            <PieChart>
              <Pie
                data={set.data}
                cx={380}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={(entry) => `${entry.label}: ${entry.value}`} // 📌 Burada kredi türü ismini ekledik
              >
                {set.data.map((_, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default PieChartComponent;
