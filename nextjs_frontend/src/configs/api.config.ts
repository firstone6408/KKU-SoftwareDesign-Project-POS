// หน้าแรก
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080",
  ENDPOINTS: {
    CATEGORIES: "/product-categories",
  },
} as const;
