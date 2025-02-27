import { useState, useEffect } from "react";

interface SearchBoxProps {
  type: string;
  onSearch: (query: any) => void;
  onClose: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ type, onSearch, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [krediTuru, setKrediTuru] = useState("");

  // 📅 Varsayılan olarak dün ve bugünü belirle
  useEffect(() => {
    if (type === "tarih") {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      // 🟢 YYYY-MM-DD formatında tarih ayarla
      setStartDate(yesterday.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    }
  }, [type]); // ⏳ "type" değiştiğinde çalışır

  const handleSubmit = () => {
    switch (type) {
      case "onay":
        onSearch(inputValue);
        break;
      case "tarih":
        onSearch({ startDate, endDate });
        break;
      case "krediTuru":
        onSearch(krediTuru);
        break;
      case "krediMiktari":
        onSearch({ minAmount, maxAmount });
        break;
      case "krediTuruMiktari":
        onSearch({ type: krediTuru, minAmount, maxAmount }); // 🟢 Kredi Türü eklendi
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100 shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Arama Yap</h2>

      {/* Onay Durumu */}
      {type === "onay" && (
        <input
          type="text"
          placeholder="1, 0 veya 2 girin"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 border rounded mb-2"
        />
      )}

      {/* Tarih Seçimi */}
      {type === "tarih" && (
        <>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded mb-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded mb-2"
          />
        </>
      )}

      {/* Kredi Türü */}
      {(type === "krediTuru" || type === "krediTuruMiktari") && ( // 🟢 Kredi Türü Kutucuğu Buraya Eklendi
        <input
          type="text"
          placeholder="Kredi Türü"
          value={krediTuru}
          onChange={(e) => setKrediTuru(e.target.value)}
          className="p-2 border rounded mb-2"
        />
      )}

      {/* Kredi Miktarı */}
      {(type === "krediMiktari" || type === "krediTuruMiktari") && (
        <>
          <input
            type="number"
            placeholder="Min Tutar"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="p-2 border rounded mb-2"
          />
          <input
            type="number"
            placeholder="Max Tutar"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="p-2 border rounded mb-2"
          />
        </>
      )}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ara
      </button>
    </div>
  );
};

export default SearchBox;
