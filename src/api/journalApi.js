import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://api-backend-35acb-default-rtdb.firebaseio.com",
});

export default journalApi;
