import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../Util/token";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  let token = getAccessToken();
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token]);

  return (
    <>
        {children}
    </>
  );
}
