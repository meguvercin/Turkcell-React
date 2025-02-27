import React, { useState } from "react";

interface ComboBoxProps {
  options: string[]; // 📌 Seçenekler dizisi (Örn: ["İhtiyaç Kredisi", "Konut Kredisi"])
  onSearch: (value: string) => void; // 📌 Seçimi dışarı bildiren fonksiyon
  placeholder?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSearch,placeholder}) => {
  const [selectedValue, setSelectedValue] = useState<string>(""); // 📌 Seçilen değeri tutar

  // 📌 Seçim yapıldığında sadece state güncelleniyor
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  // 📌 "Ara" butonuna basıldığında onSearch çağrılıyor
  const handleSearch = () => {
    if (selectedValue) {
      onSearch(selectedValue);
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4 bg-gray-100 shadow rounded">
      <label htmlFor="comboBox" className="text-lg font-bold mb-2">{placeholder}</label>
      <select
        id="comboBox"
        value={selectedValue}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="" disabled>
          Seçiniz...
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ara
      </button>
    </div>
  );
};

export default ComboBox;