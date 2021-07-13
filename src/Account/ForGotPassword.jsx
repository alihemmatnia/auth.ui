import React, { useState, useEffect } from "react";
import ax from "../axios.config";
import jwt_decode from "jwt-decode";
import { useToasts } from "react-toast-notifications";

import { useHistory } from "react-router";

const ForGotPassword = () => {
  const history = useHistory();
  if (localStorage.getItem("token")) {
    history.replace({
      pathname: "/",
    });
  }
  const { addToast } = useToasts();

  const [email, setEmail] = useState(null);
  const log = () => {
    if (email != null) {
      ax.post(`Auth/ForGotPassword?Email=${email}`).then((e) => {
        if (e.data.success) {
          addToast(e.data.message, { appearance: "success" });
          history.replace({
            pathname: "/login",
          });
        } else {
          addToast(e.data.errors[0], { appearance: "error" });
        }
      });
    } else {
      addToast("ایمیل را وارد کنید", { appearance: "error" });
    }
  };
  const handle_email = (e) => {
    setEmail(e.target.value);
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
              style={{ marginBottom: "30px" }}
              onClick={() => {
                history.replace({ pathname: "/login" });
              }}
            />
            <input
              type="submit"
              style={{ marginBottom: "30px" }}
              value="ثبت نام"
              onClick={() => {
                history.replace({ pathname: "/register" });
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
                  <h3 class="register-heading">فراموشی رمزعبور </h3>
                  <div class="row register-form mx-auto">
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          onChange={(e) => handle_email(e)}
                          class="form-control"
                          placeholder="ایمیل شما"
                          required
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <button
                          style={{ border: "none", outline: "none" }}
                          onClick={() => log()}
                          class="btnRegister"
                        >
                          انجام
                        </button>
                      </div>
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

export default ForGotPassword;
