import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const navItems = [
    { name: "Ana Sayfa", path: "/home" },
    { name: "Raporlar", path: "/reports" },
  ];

  return (
    <>
      {isAuthenticated && (
        <Navbar
          brandName="Turkcell"
          imageSrcPath="/TKC.svg"
          navItems={navItems}
        />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;

/* 

 // onay durumunu dropdown list veya combobox yapıcaz
  // Tarihi formatla gün ay yıl,                 filtreleme tarihler defult olarak bugün ve dünü getirsin
  // kolon isimlerini değiştir
  // 🛠 Arama Kutusu İçin Arama Fonksiyonu
  //miktar 250.000,00
  // refresh olsun

function TrImage() {
  return (
    <div>
      <img src={turkcell} alt="turkcell" style={{ width: "300px" }} />
    </div>
  );
}

      <div className="flex flex-col space-y-4 items-start gap-2 p-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Buton 1
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Buton 2
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Buton 3
        </button>
      </div>




const TurkcellImage = () => {
        return (
            <div>
            <img src={turkcell} alt="Turkcell Resmi" style={{ width: "200px" }} />
            </div>
        );
        };


      <div className="p-4">
        <h1 className="text-lg font-bold">Kredi Türü Seç</h1>
        <ComboBox options={krediTurleri} onSearch={handleKrediSecimi} />
      </div>
      <div className="p-4">
        <h1 className="text-lg font-bold">Onay Türü Seç</h1>
        <OnayCombo options={OnayTurleri} onSearch={handleOnaySecimi} />
      </div>



                <Button
            color="primary"
            onClick={() => {
              setSearchType("onay");
              setShowSearch(true);
            }}
          >
            Onay Durumu
          </Button>

                    <Button
            color="primary"
            onClick={() => {
              setSearchType("krediTuru");
              setShowSearch(true);
            }}
          >
            Kredi Türüne
          </Button>



                {🛠 Butonlar }
      <div className="flex space-y-4 items-start gap-2 p-2">
      <Button
        color="primary"
        onClick={() => setShowCombo(showCombo === "onay" ? null : "onay")}
      >
        Onay Durumu
      </Button>
      <Button 
        color="primary"
        onClick={() => setShowCombo(showCombo === "kredi" ? null : "kredi")}
      >
        Kredi Türüne
      </Button>
    </div>
        export default TurkcellImage;
*/
