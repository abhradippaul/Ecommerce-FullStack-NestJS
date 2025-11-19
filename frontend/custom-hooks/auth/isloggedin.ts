import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_CUSTOMER_BACKEND_URL || "";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "/api/v1";

export function useIsLoggedIn() {
  return useQuery({
    queryFn: () => {
      return axios.get(`${BACKEND_URL}${API_VERSION}/verify-customer`, {
        withCredentials: true,
      });
    },
    queryKey: ["isLoggedIn"],
  });
}
