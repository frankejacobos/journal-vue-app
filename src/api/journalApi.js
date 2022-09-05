import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://api-backend-35acb-default-rtdb.firebaseio.com",
});

journalApi.interceptors.request.use((config) => {
  const auth = localStorage.getItem("idToken");
  if (auth) config.params = { auth };
  return config;
});

export default journalApi;
