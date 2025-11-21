import { getQueryClient } from "@/providers/queryclient-provider";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

const queryClient = getQueryClient();

export function useLogOut(router: AppRouterInstance) {
  return useMutation({
    mutationFn: () => {
      return axios.get("/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isLoggedIn"] });
      router.replace("/login");
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.msg);
      } else {
        toast.error("Logout failed");
      }
    },
  });
}
