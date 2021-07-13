// import './styles/AdminLTE.css'
import React, { useState, useEffect } from "react";
import ax from "../axios.config";
import jwt_decode from "jwt-decode";
import { useToasts } from "react-toast-notifications";

import { useHistory } from "react-router";

const Login = (props) => {
  // if (localStorage.getItem("token")) {
  //   return <Redirect to="/" />;
  // }
  // console.log(
  //   jwt_decode(

  //   )
  // );
  const history = useHistory();

  const { addToast } = useToasts();

  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const log = () => {
    if (username != null && password != null) {
      ax.post("Auth/Login", { username: username, password: password }).then(
        (e) => {
          if (e.status === 400) {
            addToast("نام کاربری و رمز عبور اجباری است", {
              appearance: "error",
            });
          } else {
            if (e.data.success) {
              localStorage.setItem("token", e.data.token);
              history.replace({
                pathname: "/",
              });
            } else {
              addToast(e.data.errors[0], { appearance: "error" });
            }
          }
        }
      );
    }
  };
  const handle_username = (e) => {
    setusername(e.target.value);
  };
  const handle_password = (e) => {
    setpassword(e.target.value);
  };

  return (
    <body class="t">
      <div class="container t register">
        <div class="row">
          <div class="col-12 col-md-3 register-right">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>خوش آمدید</h3>
            <input
              type="submit"
              value="ثبت نام"
              style={{ marginBottom: "30px" }}
              onClick={() => {
                history.replace({ pathname: "/register" });
              }}
            />
            <input
              type="submit"
              style={{ marginBottom: "30px" }}
              value="فراموشی رمز عبور"
              onClick={() => {
                history.replace({ pathname: "/forgot" });
              }}
            />
            <br />
          </div>
          <div class="col-12 col-md-9">
            <div class="register-left p-3">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 class="register-heading">ورود </h3>
                  <div class="row register-form mx-auto">
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          onChange={(e) => handle_username(e)}
                          class="form-control"
                          placeholder="نام کاربری"
                          required
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="password"
                          onChange={(e) => handle_password(e)}
                          class="form-control"
                          required
                          placeholder="رمز عبور"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <button
                        style={{ border: "none", outline: "none" }}
                        onClick={() => log()}
                        class="btnRegister"
                      >
                        ورود
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
