import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import Spinning from "../../components//spining/Spinner";
import routes from "../../configs/routes";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { isLoading, err } = useSelector((state) => state.user);

  const isAuth = localStorage.getItem("jwt");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(routes.dashBoard);
    }
  }, [navigate, isAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRef?.current?.value || !passwordRef?.current?.value) {
      alert("Please enter invalid input!");
      return;
    }

    if (!emailRef?.current?.value.includes("@")) {
      alert("Invalid email!");
      return;
    }

    if (passwordRef?.current?.value.length < 8) {
      alert("Passwords must be at least 8 characters");
      return;
    }

    const data = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    };

    try {
      await dispatch(apiConfig.loginUser(data));

      if (Object.keys(err).length !== 0) {
        alert(err.message);
        return;
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spinning spinning={isLoading}>
      <div className="login">
        <h2>Admin Login </h2>
        <form onSubmit={handleLogin} className="d-flex flex-column">
          <div className="input-form">
            <input
              type="text"
              placeholder="Email"
              ref={emailRef}
              value={email}
            />
          </div>
          <div className="input-form">
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              value={password}
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </Spinning>
  );
}

export default Login;
