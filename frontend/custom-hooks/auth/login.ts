import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

const BACKEND_URL = process.env.NEXT_PUBLIC_CUSTOMER_BACKEND_URL || "";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "/api/v1";

interface UserLogInTypes {
  email: string;
  password: string;
}

export function useLogIn(router: AppRouterInstance) {
  return useMutation({
    mutationFn: (body: UserLogInTypes) => {
      return axios.post(`${BACKEND_URL}${API_VERSION}/auth/login`, body);
    },
    onSuccess: async (data) => {
      const cookieToken = data.data.cookieToken;
      console.log(cookieToken);
      if (cookieToken) {
        await axios.get("/set-cookie", {
          params: { token: cookieToken },
        });
      }
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.msg);
      } else {
        toast.error("Login failed");
      }
    },
  });
}
