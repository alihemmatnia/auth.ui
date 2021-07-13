// import './styles/AdminLTE.css'
import React, { useState, useEffect } from "react";
import ax from "../axios.config";
import jwt_decode from "jwt-decode";
import { useToasts } from "react-toast-notifications";

import { useHistory } from "react-router";

const Register = (props) => {
  const history = useHistory();
  if (localStorage.getItem("token")) {
    history.replace({
      pathname: "/",
    });
  }
  const { addToast } = useToasts();

  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [email, setemail] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState(null);
  const log = () => {
    if (username != null && password != null) {
      ax.post("Auth/Register", {
        username: username,
        password: password,
        email: email,
        confirmPassword: confirmpassword,
      }).then((e) => {
        if (e.status === 400) {
          addToast("نام کاربری و رمز عبور اجباری است", {
            appearance: "error",
          });
        } else {
          if (e.data.success) {
            addToast(e.data.message, {
              appearance: "success",
            });
            history.replace({
              pathname: "/login",
            });
          } else {
            addToast(e.data.errors[0], { appearance: "error" });
          }
        }
      });
    }
  };
  const handle_username = (e) => {
    setusername(e.target.value);
  };
  const handle_password = (e) => {
    setpassword(e.target.value);
  };
  const handle_email = (e) => {
    setemail(e.target.value);
  };
  const handle_confirm = (e) => {
    setconfirmpassword(e.target.value);
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
              value="ورود"
              onClick={() => {
                history.replace({ pathname: "/login" });
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
                  <h3 class="register-heading">ثبت نام </h3>
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
                          type="text"
                          onChange={(e) => handle_email(e)}
                          class="form-control"
                          placeholder="ایمیل"
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
                      <div class="form-group">
                        <input
                          type="password"
                          onChange={(e) => handle_confirm(e)}
                          class="form-control"
                          required
                          placeholder="تایید رمز عبور"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <button
                        style={{ border: "none", outline: "none" }}
                        onClick={() => log()}
                        class="btnRegister"
                      >
                        ثبت نام
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

export default Register;
