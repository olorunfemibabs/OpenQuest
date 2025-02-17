import apiClient from "@/services/api-client";

export const userService = {
  async linkWallet(data: { user_uuid: string; wallet_address: string }) {
    const response = await apiClient.post("/user/wallet", data);
    return response.data;
  },
};
