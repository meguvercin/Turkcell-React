import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Kullanıcı giriş yapmış mı kontrol et
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
