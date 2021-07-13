import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import ax from "../axios.config";
import { useHistory } from "react-router";

export default function ProtectedRoute({ children, restOfProps }) {
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    ax.post(`https://localhost:5001/api/Auth/CheckValidToken/${token}`).then(
      (e) => {
        if (!e.data.success) {
          localStorage.removeItem("token");
          history.replace({ pathname: "/login" });
        }
      }
    );
  }, []);

  return (
    <Route
      {...restOfProps}
      render={(props) => (token ? children : <Redirect to="/login" />)}
    />
  );
}
