export const FILE_CONFIG = {
  IMAGES: {
    ERRORS: {
      ERROR_1: "/images/errors/error_1_by_ai.webp",
      ERROR_2: "/images/errors/error_2_by_ai.webp",
      ERROR_3: "/images/errors/image_error2_by_ai.webp",
    },
    LOGOS: {},
    NO_USER_IMAGE: "/images/no-user-image.webp",
    NO_PRODUCT_IMAGE: "/images/no-product-image.webp",
  },
  UPLOAD: {
    IMAGE: {
      /** Limit 5 MB */
      MAX_SIZE: 1024 * 1024 * 5,
    },
    //  ถ้ามีไฟล์อื่นในอนาคต เช่น PDF, VIDEO:
    PDF: {
      PATH: {},
    },
  },
} as const;
