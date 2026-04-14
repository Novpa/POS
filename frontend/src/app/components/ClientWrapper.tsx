"use client";

import { useAuth } from "@/store/useAuth";
import { api } from "@/utils/axiosInstance";
import { useEffect } from "react";

function ClientWrapper({ children }: { children: React.ReactNode }) {
  const setAuth = useAuth((state) => state.setAuth);

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        const res = await api.get("/auth/refresh");
        console.log("res", res);
        const user = res.data.data;
        setAuth(user.firstName, user.lastName, user.role);
      } catch (error) {
        console.log(error);
      }
    };

    handleRefresh();
  });
  return <div>{children}</div>;
}

export default ClientWrapper;
