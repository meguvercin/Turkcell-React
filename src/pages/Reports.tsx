import { useState } from "react";
import api from "../api"; // Axios API dosyası
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import TableComponent from "../components/TableComponent";
<img src={turkcell} alt="turkcell" />; // 📌 Grafiği import ediyoruz
import ComboBox from "../components/KrediComboBox";
import OnayCombo from "../components/OnayComponents";
import { useEffect } from "react";
import KrediTuruComboBox from "../components/KrediTuruComboBox";
import turkcell from "C:/Users/Monster/Desktop/turkcell-react/image/TKC_BIG (1).svg";

function Reports() {
  // let items = ["Home", "Raporlar", "Services", "Contact"];

  // 🛠 State Yönetimi
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showCombo, setShowCombo] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<string>("");
  const krediTurleri = ["İhtiyaç Kredisi", "Konut Kredisi", "Araç Kredisi"];
  const [isSearchDone, setIsSearchDone] = useState(false);

  const OnayTurleri = [
    { label: "Onaylandı", value: 1 },
    { label: "Beklemede", value: 2 },
    { label: "Reddedildi", value: 0 },
  ];
  const [selectedKredi, setSelectedKredi] = useState<string>("");
  const [selectedOnay, setSelectedOnay] = useState<string>("");

  useEffect(() => {
    setData([]); // 📌 Buton değiştiğinde veriyi temizle
    setIsSearchDone(false); // 📌 Buton değiştiğinde arama yapıldı bilgisini temizle
  }, [searchType, showCombo, selectedKredi, selectedOnay]);

  // 🛠 Dinamik API Çağrısı Yapan Fonksiyon
  const fetchData = async (endpoint: string, params: any = {}) => {
    setLoading(true);
    setError(null);
    setIsSearchDone(false);
    try {
      const response = await api.post(endpoint, params);
      setData(response.data.basvurular || response.data);
    } catch (err: any) {
      console.error("API Hatası:", err);
      setError(`Veri alınırken hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
      setIsSearchDone(true);
    }
  };

  // onay durumunu dropdown list veya combobox yapıcaz
  // Tarihi formatla gün ay yıl,                 filtreleme tarihler defult olarak bugün ve dünü getirsin
  // kolon isimlerini değiştir
  // 🛠 Arama Kutusu İçin Arama Fonksiyonu
  //miktar 250.000,00
  // refresh olsun
  const handleSearch = (query: any) => {
    setData([]);
    setIsSearchDone(true); // 📌 Arama yapıldığında tabloyu temizle
    switch (searchType) {
      case "onay":
        fetchData("/kredi/onayfiltrele", { onaydurumu: query });
        break;
      case "tarih":
        fetchData("/kredi/tarihfiltrele", {
          BaslangicTarihi: query.startDate,
          BitisTarihi: query.endDate,
        });
        break;
      case "krediTuru":
        fetchData("/kredi/krediTurufiltrele", { KrediTuru: query });
        break;
      case "krediMiktari":
        fetchData("/kredi/krediBasvurufiltrele", {
          FirstMiktar: query.minAmount,
          SecondMiktar: query.maxAmount,
        });
        break;
      case "krediTuruMiktari":
        fetchData("/kredi/krediTurTutarfiltrele", {
          KrediTuru: query.type,
          FirstMiktar: query.minAmount,
          SecondMiktar: query.maxAmount,
        });
        break;
      default:
        break;
    }
    setShowSearch(false); // Arama yapıldıktan sonra SearchBox'ı kapat
    setShowCombo(null); // Arama yapıldıktan sonra ComboBox'ı kapat
  };

  const handleKrediTuruTutarSecimi = (query: any) => {
    setData([]);
    setIsSearchDone(true);
    fetchData("/kredi/krediTurTutarfiltrele", {
      KrediTuru: query.type,
      FirstMiktar: query.minAmount,
      SecondMiktar: query.maxAmount,
    }).then(() => {
      setShowCombo(null); // 📌 API çağrısından sonra ComboBox'ı kapat
    });
  };

  const handleKrediSecimi = (krediTuru: string) => {
    setData([]);
    setIsSearchDone(true); // 📌 Arama yapıldığında tabloyu temizle
    setSelectedKredi(krediTuru); // 📌 Seçilen kredi türünü güncelle
    fetchData("/kredi/krediTurufiltrele", { KrediTuru: krediTuru }); // 📌 API çağrısı yap
    setShowSearch(false); // Arama yapıldıktan sonra SearchBox'ı kapat
    setShowCombo(null); // Arama yapıldıktan sonra ComboBox'ı kapat
  };

  const handleOnaySecimi = (onayTuru: string) => {
    setData([]);
    setIsSearchDone(true); // 📌 Arama yapıldığında tabloyu temizle
    setSelectedOnay(onayTuru); // 📌 Seçilen kredi türünü güncelle
    fetchData("/kredi/onayfiltrele", { OnayDurumu: onayTuru }); // 📌 API çağrısı yap
    setShowSearch(false); // Arama yapıldıktan sonra SearchBox'ı kapat
    setShowCombo(null); // Arama yapıldıktan sonra ComboBox'ı kapat
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col mt-48 justify-center absolute opacity-10 -z-50">
          <img className="w-220 h-fit" src={turkcell} alt="Watermark" />
        </div>
      </div>
      {/* 🔥 SearchBox'ı dinamik olarak aç */}
      {showSearch && (
        <SearchBox
          type={searchType}
          onSearch={handleSearch}
          onClose={() => setShowSearch(false)}
        />
      )}

      {/* 🛠 Butonlar */}
      {!showSearch && !showCombo && (
        <div className="w-full flex flex-row justify-center items-center gap-2 p-2">
          <Button
            color="primary"
            onClick={() => setShowCombo(showCombo === "onay" ? null : "onay")}
          >
            Onay Durumu
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setSearchType("tarih");
              setShowSearch(true);
            }}
          >
            Başvuru Tarihi
          </Button>

          <Button
            color="primary"
            onClick={() => setShowCombo(showCombo === "kredi" ? null : "kredi")}
          >
            Kredi Türüne
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setSearchType("krediMiktari");
              setShowSearch(true);
            }}
          >
            Kredi Miktarına
          </Button>
          <Button
            color="primary"
            onClick={() =>
              setShowCombo(
                showCombo === "krediTuruMiktari" ? null : "krediTuruMiktari"
              )
            }
          >
            Kredi Türü ve Tutarı
          </Button>
        </div>
      )}

      {/* 📌 Butona Basınca Açılan ComboBox'lar */}
      {/* 📌 Seçime Bağlı Açılan Component'ler */}
      <div className="p-4">
        {showCombo === "onay" && (
          <OnayCombo options={OnayTurleri} onSearch={handleOnaySecimi} />
        )}
        {showCombo === "kredi" && (
          <ComboBox
            options={krediTurleri}
            onSearch={handleKrediSecimi}
            placeholder="Kredi Türü Seçiniz"
          />
        )}
        {showCombo === "krediTuruMiktari" && (
          <KrediTuruComboBox
            options={krediTurleri}
            onSearch={handleKrediTuruTutarSecimi}
            placeholder="Kredi Türü ve Miktarını Seçiniz"
            onClose={() => setShowCombo(null)}
            type="krediTuruMiktari"
          />
        )}
      </div>

      {/* 🛠 Yükleniyor ve Hata Mesajları */}
      {loading && <div>Yükleniyor...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* 🛠 Gelen Veriyi Tablo Olarak Göster */}
      {!loading && data.length > 0 ? (
        <TableComponent data={data} />
      ) : (
        isSearchDone &&
        !loading && (
          <div className="text-gray-500 text-center mt-4 text-2xl">
            ⚠️ İlgili kriterlere uygun veri bulunamadı.
          </div>
        )
      )}
    </>
  );
}

export default Reports;
