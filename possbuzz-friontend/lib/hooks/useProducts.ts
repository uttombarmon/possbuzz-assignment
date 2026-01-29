import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { apiClient } from "lib/api/apiIntercepters";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const fetchProducts = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/product");
      return res.data;
    },
  });

  const addProduct = useMutation({
    mutationFn: (newProduct: any) => apiClient.post("/product", newProduct),
    onSuccess: () => {
      message.success("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const editProductApi = useMutation({
    mutationFn: (updatedProduct: any) =>
      apiClient.patch(
        `/product/${updatedProduct.productId}`,
        updatedProduct.product,
      ),
    onSuccess: () => {
      message.success("Product Updated!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { fetchProducts, addProduct, editProductApi };
};
