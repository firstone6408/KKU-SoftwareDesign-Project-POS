import { useState } from "react";
import { ImageField as ImageUploadField } from "@/components/shared/field/image-field";

export function useImageUploadField() {
  const [images, setImages] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const handleImageChange = (
    images: File[],
    deletedIds: string[] = []
  ) => {
    setImages(images);
    setDeletedImageIds(deletedIds);
  };

  //   const reset = () => {
  //     setImages([]);
  //     setMainImageIndex(0);
  //     setDeletedImageIds([]);
  //   };

  return {
    images,
    deletedImageIds,
    ImageUploadField,
    handleImageChange,
  };
}
