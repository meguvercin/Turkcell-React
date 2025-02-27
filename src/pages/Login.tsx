import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify için CSS

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      if (data.success) {
        login(); // AuthContext ile giriş işlemini yap
        toast.success("Giriş başarılı!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/home");
        }, 30); // 0.030 saniye sonra yönlendirme yap
      } else {
        toast.error("Kullanıcı adı veya şifre hatalı!", {
          position: "bottom-right",
          autoClose: 30,
        });
      }
    } catch (error) {
      toast.error("Kullanıcı adı veya şifre hatalı!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <div className="bg-blue-800">
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <h2 className="flex flex-row text-white text-2xl font-bold mb-4 italic " >
            <img className = "w-15 mr-2 -mt-3" src="public\TKC.svg" alt="" />
            Financell | Turkcell Kredi API
          </h2>
          <div className="bg-white rounded-xl border-2 flex flex-col items-center justify-center h-60 w-75">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              className="border p-2 mb-2 rounded-xl w-65"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Şifre"
              className="border p-2 mb-3 rounded-xl w-65"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-yellow-500 text-black p-2 w-65 rounded-full"
            >
              Giriş Yap
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
