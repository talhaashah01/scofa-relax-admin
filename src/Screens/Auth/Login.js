import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { setAccessToken } from "../../Util/token";

import { AuthLayout } from "../../Layout/AuthLayout";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";

import "./style.css";
import BASEURL from "../../Config/global";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loginError, setLoginError] = useState({ error: false, text: "" });

  const handleClick = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("type", "admin");
    try {
      const response = await axios.post(`${BASEURL}/api/user/login/`, formDataToSend);
      if (response.data.error === false) {
        const token = response.data.data[0].token;
        setAccessToken(token)
        navigate("/dashboard");
        setLoginError({ error: false, text: "" });
      } else {
        setLoginError({ error: true, text: response.data.message });
      }
    } catch (error) {
      setLoginError({
        error: true,
        text: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <>
      <AuthLayout>
        <form>
          <div className="row">
            <div className="col-12">
              <CustomInput
                label="Email"
                required
                id="email"
                type="text"
                labelClass="mainLabel"
                inputClass="mainInput"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    username: event.target.value,
                  });
                }}
              />
            </div>
            <div className="col-12">
              <CustomInput
                label="Password"
                required
                id="pass"
                type="password"
                labelClass="mainLabel"
                inputClass="mainInput"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    password: event.target.value,
                  });
                }}
              />
            </div>
            {loginError.error == true && (
              <div className="col-12">
                <p className="secondaryText">{loginError.text}</p>
              </div>
            )}
          </div>
          <div className="row mt-4 text-center">
            <div className="col-12">
              <CustomButton
                variant="primaryButton"
                text="Login"
                onClick={handleClick}
              />
            </div>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default AdminLogin;
