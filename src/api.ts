import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7201/api", // Backend'in ana URL'si
  headers: {
    "Content-Type": "application/json",
  },
});


export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post("/user/login", { username, password });
    return response.data; // Backend'den gelen veriyi döndür
  } catch (error) {
    throw error; // Hata fırlat
  }
};


export default api;