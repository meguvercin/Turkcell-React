import { FaCreditCard } from "react-icons/fa6";
import turkcell from "C:/Users/Monster/Desktop/turkcell-react/image/TKC_BIG (1).svg";
import ChartComponent from "../components/ChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import { useEffect, useState } from "react";
import api from "../api"; // Axios API dosyası

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [krediData, setKrediData] = useState<any[]>([]);
  const [basvuruData, setBasvuruData] = useState<any[]>([]);
  const [onayData, setOnayData] = useState<any[]>([]);
  const [krediAyData, setKrediAyData] = useState<any[]>([]);
  const [krediOrani, setKrediOraniData] = useState<any[]>([]);

  // 📌 API'den birden fazla veri çekiyoruz

  const fetchChartData = async () => {
    setLoading(true);
    setError(null);
    try {
      const krediResponse = await api.get("/kredi/krediturugrafik");
      const basvuruResponse = await api.get("/kredi/ayagorebasvuru");
      const onayResponse = await api.get("/kredi/onayagorebasvuru");
      const krediAyResponse = await api.get("/kredi/aykrediturubasvuru");
      const krediOraniResponse = await api.get("/kredi/krediorani");

      setKrediData(
        krediResponse.data.map((item: any) => ({
          label: item["Kredi Türü"],
          value: Number(item["Toplam"].replace(".", "").replace(",", ".")),
        }))
      );

      setBasvuruData(
        basvuruResponse.data.map((item: any) => ({
          label: item["Ay"],
          value: Number(item["Başvuru Sayısı"]),
        }))
      );

      setOnayData(
        onayResponse.data.map((item: any) => ({
          label: item["Ay"], // Ayı X ekseninde göster
          value: Number(item["Başvuru Sayısı"]), // Y ekseni Başvuru Sayısı
        }))
      );

      setKrediAyData(
        krediAyResponse.data.map((item: any) => ({
          label: item["Kredi Türü"], // Ayı X ekseninde göster
          value: Number(item["Başvuru Sayısı"]), // Y ekseni Başvuru Sayısı
        }))
      );

      setKrediOraniData(
        krediOraniResponse.data.map((item: any) => ({
          label: item["Kredi Türü"], // Ayı X ekseninde göster
          value: Number(item["Başvuru Sayısı"]), // Y ekseni Başvuru Sayısı
        }))
      );
    } catch (err: any) {
      console.error("API Hatası:", err);
      setError(`Veri alınırken hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChartData();
  }, []);
  return (
    <>
      <div className="p-8 flex justify-center w-full">
        <div className="flex flex-col mt-48 justify-center absolute opacity-10 -z-50">
          <img className="w-220 h-fit" src={turkcell} alt="Watermark" />
        </div>

        <div className="gap-8  w-2/3 h-[60px] bg-white border border-amber-700 rounded-2xl  hover:bg-gray-400 transition-colors duration-200 flex items-center justify-center shadow-md text-3xl">
          <div className="h-full flex flex-col  justify-center text-yellow-400">
            <FaCreditCard />
          </div>
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-3xl font-bold text-blue-600">
              Kredi Dashboard
            </h1>
          </div>
        </div>
        <div></div>
      </div>
      <div className=" ms-5 items-center w-1/3 h-full">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mt-5">
              Kredi Türlerine Göre Toplam Tutar Dağılım (₺)
            </h2>
            <ChartComponent
              dataSets={[
                {
                  title: "Kredi Türleri",
                  data: krediData,
                  color: "blue",
                  yAxisType: "money",
                },
              ]}
            />

            <h2 className="text-2xl font-bold mt-5">
              Aylara Göre Başvuru Sayılarına Göre Dağılım
            </h2>
            <ChartComponent
              dataSets={[
                {
                  title: "Başvuru Sayısı",
                  data: basvuruData,
                  color: "red",
                  yAxisType: "count",
                },
              ]}
            />

            <h2 className="ms-5 text-2xl font-bold mt-1">
              Kredi Türüne Göre Toplam Başvurular
            </h2>
            <PieChartComponent
              dataSets={[
                {
                  title: "Kredi Türüne Göre Toplam Başvurular",
                  data: krediOrani,
                  color: "blue",
                },
              ]}
            />
          </>
        )}
      </div>
      <>
        <div>
          <div className="ms-250 -mt-252 w-1/3 h-full">
            <h2 className="text-2xl font-bold mt-5">
              Aylara Göre Onaylanan Başvuru Sayıları Dağılım
            </h2>
            <ChartComponent
              dataSets={[
                {
                  title: "Onaylanan Başvuru Sayısı",
                  data: onayData,
                  color: "blue",
                  yAxisType: "count",
                },
              ]}
            />
            <h2 className="text-2xl font-bold mt-5">
              Kredi Türlerine Göre Onaylanan Başvuru Sayıları Dağılım
            </h2>
            <ChartComponent
              dataSets={[
                {
                  title: "Onaylanan Başvuru Sayısı",
                  data: krediAyData,
                  color: "black",
                  yAxisType: "count",
                },
              ]}
            />
          </div>
        </div>
      </>
    </>
  );
}

export default Home;
