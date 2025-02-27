import React from "react";

interface TableProps {
  data: any[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Gösterilecek veri yok.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table border={1} className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col, index) => (
            <th key={index} className="p-2 border">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="p-2 border">{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
