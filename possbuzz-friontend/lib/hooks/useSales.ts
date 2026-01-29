// src/hooks/useSales.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { message } from "antd";
import { apiClient } from "lib/api/apiIntercepters";

export const useSales = () => {
  const queryClient = useQueryClient();

  const createSaleMutation = useMutation({
    mutationFn: async (saleData: {
      items: { productId: string; quantity: number }[];
    }) => {
      const { data } = await apiClient.post("/sales", saleData);
      return data;
    },

    onMutate: () => {
      // Optional: Logic to run the moment the request starts
    },

    onSuccess: () => {
      message.success("Transaction completed successfully!");

      queryClient.invalidateQueries({ queryKey: ["products"] });

      queryClient.invalidateQueries({ queryKey: ["sales-history"] });
    },

    onError: (error: any) => {
      const msg =
        error.response?.data?.message ||
        "Transaction failed. Please check stock.";
      message.error(msg);
    },
  });

  return {
    createSale: createSaleMutation.mutate,
    isSelling: createSaleMutation.isPending,
    saleData: createSaleMutation.data,
    error: createSaleMutation.error,
  };
};
