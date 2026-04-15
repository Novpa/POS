import { api } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      return await api.get("/category");
    },
  });

  return { data, isLoading };
};
