import { API_CONFIG } from "@/configs/api.config";

export const UrlUtil = {
  getImageUrl: function (localUrl: string) {
    return `${API_CONFIG.BASE_URL}${localUrl}`;
  },
};
