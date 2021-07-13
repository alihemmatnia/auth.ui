import ax from "../axios.config";
import { Redirect } from "react-router-dom";

const Check = () => {
  const token = localStorage.getItem("token");
  if (token) {
    ax.post(`Auth/CheckValidToken/${token}`).then((e) => {
      if (!e.data.success) {
        return false;
      } else {
        return true;
      }
    });
  }
};
export default Check;
