import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: { key: "AIzaSyDUu28oZvIK9Kx3ovyQtLHBzCGOv-weKLk" },
});

export default authApi;
