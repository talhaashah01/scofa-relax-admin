import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../Util/token";

export default function PrivateRoutes({ children }) {
  const navigate = useNavigate();
  let token = getAccessToken();
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]);

  return (
    <>
      {children}
    </>
  );
}
