import React, { useState, useEffect, useContext } from "react";
import { loginAPI } from "../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [loadingApi, setLoadingApi] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const handleGoBack = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Enter your email and password");
      return;
    }
    setLoadingApi(true);
    let res = await loginAPI(email.trim(), password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingApi(false);
  };
  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container col-4 col-sm-4">
      <div className="title">Login</div>
      <div className="text">User name or email</div>
      <input
        type="text"
        placeholder="Username or Passsword"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <div className="input-2">
        <input
          type={isShowPassword === true ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          onKeyDown={(event) => handlePressEnter(event)}
        />
        <i
          className={
            isShowPassword === true
              ? "fa-solid fa-eye"
              : "fa-solid fa-eye-slash"
          }
          onClick={() => {
            setIsShowPassword(!isShowPassword);
          }}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => {
          handleLogin();
        }}
      >
        {loadingApi && <i className="fa-solid fa-spinner fa-spin"></i>}
        Login
      </button>
      <div className="back">
        <span onClick={() => handleGoBack()}>Go Back</span>
      </div>
    </div>
  );
}

export default Login;
