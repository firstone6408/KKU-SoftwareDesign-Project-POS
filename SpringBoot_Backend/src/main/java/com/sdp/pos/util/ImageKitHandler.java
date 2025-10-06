package com.sdp.pos.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.sdp.pos.dto.imagekit.ImageKitResultDTO;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import net.coobird.thumbnailator.Thumbnails;

@Component
public class ImageKitHandler {

    private final ImageKit imageKit = ImageKit.getInstance();

    private String reFilename(String originalFilename) {
        // ดึงสกุลไฟล์เดิม
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        } else {
            extension = "jpg"; // default ถ้าไม่มี extension
        }

        // Unique name พร้อม extension เดิม
        String uniqueName = UUID.randomUUID().toString() + "." + extension;

        return uniqueName;
    }

    public ImageKitResultDTO uploadFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Invalid file provided");
        }

        try {
            // Resize image before upload
            ByteArrayOutputStream resizedOutput = new ByteArrayOutputStream();
            Thumbnails.of(file.getInputStream())
                    .size(800, 800)
                    .outputFormat("jpg")
                    .outputQuality(0.8) // 80%
                    .toOutputStream(resizedOutput);

            byte[] resizedBytes = resizedOutput.toByteArray();

            // Upload resized image
            FileCreateRequest request = new FileCreateRequest(
                    resizedBytes,
                    reFilename(file.getOriginalFilename()));
            request.setFolder("pos-kku-sdp-img/");
            Result result = imageKit.upload(request);

            return ImageKitResultDTO.fromEntity(result);
        } catch (IOException e) {
            throw new RuntimeException("Failed to resize image before upload", e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image to ImageKit", e);
        }
    }

    public ImageKitResultDTO replaceFile(String oldFileId, MultipartFile newFile) {
        deleteFile(oldFileId);
        return uploadFile(newFile);
    }

    public boolean deleteFile(String fileId) {
        if (fileId == null || fileId.trim().isEmpty()) {
            return false;
        }

        try {
            imageKit.deleteFile(fileId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}