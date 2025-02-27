import React, { useState } from "react";

interface KrediTuruComboBoxProps {
  options: string[]; // 📌 Kredi türleri listesi (Örn: ["İhtiyaç Kredisi", "Konut Kredisi"])
  type: string; // 📌 Kullanım tipi (krediTuruMiktari gibi)
  placeholder?: string; // 📌 Dinamik placeholder
  onSearch: (query: any) => void; // 📌 Arama fonksiyonu
  onClose: () => void; // 📌 Kapatma fonksiyonu
}

const KrediTuruComboBox: React.FC<KrediTuruComboBoxProps> = ({
  options,
  type,
  onSearch,
  placeholder,
  onClose,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(""); // 📌 Seçilen kredi türü
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");

  // 📌 "Ara" butonuna basıldığında arama yapılır
  const handleSubmit = () => {
    if (type === "krediTuruMiktari" && selectedValue) {
      onSearch({ type: selectedValue, minAmount, maxAmount });
    }
    onClose();
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 shadow rounded">
      <label htmlFor="comboBox" className="text-lg font-bold">
        {placeholder}
      </label>

      {/* 📌 Kredi Türü Seçimi */}
      <select
        id="comboBox"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
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

      {/* 📌 Kredi Tutarı Giriş Alanları */}
      {type === "krediTuruMiktari" && (
        <div className="flex flex-col space-y-2">
          <input
            type="number"
            placeholder="Min Tutar"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Max Tutar"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      )}

      {/* 📌 Ara Butonu */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ara
      </button>
    </div>
  );
};

export default KrediTuruComboBox;
