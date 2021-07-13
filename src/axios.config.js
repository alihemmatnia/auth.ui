import axios from "axios";

const ax = axios.create({
  baseURL: "https://localhost:5001/Api/",
});

export default ax;
