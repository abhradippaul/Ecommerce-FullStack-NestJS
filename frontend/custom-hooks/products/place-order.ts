import { getQueryClient } from "@/providers/queryclient-provider";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const BACKEND_URL = process.env.NEXT_PUBLIC_PRODUCT_ORDER_BACKEND_URL || "";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "/api/v1";

interface PlaceOrderTypes {
  product_id: string;
  quantity: string;
}

interface CartItems {
  id: string;
  name: string;
  totalPrice: number;
  quantity: number;
  price: number;
}

const queryClient = getQueryClient();

export function usePlaceOrder(
  userId: string,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>,
  setCartItems: Dispatch<SetStateAction<CartItems | null | undefined>>
) {
  return useMutation({
    mutationFn: (body: PlaceOrderTypes) => {
      return axios.post(`${BACKEND_URL}${API_VERSION}/orders`, {
        ...body,
        user_id: userId,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["order-history"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Order placed successfully");
      setIsDialogOpen(false);
      setCartItems(null);
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Place order failed");
      }
    },
  });
}
