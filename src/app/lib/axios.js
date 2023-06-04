import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://techfinder.onrender.com/api",
  // baseURL: "http://localhost:4000/api",
  "content-type": "application/json",
});
export { api };

export const useDynamicQuery = (queryKey, requestConfig) => {
  const fetchData = async () => {
    const response = await api(requestConfig);
    return response.data;
  };

  return useQuery(queryKey, fetchData);
};

