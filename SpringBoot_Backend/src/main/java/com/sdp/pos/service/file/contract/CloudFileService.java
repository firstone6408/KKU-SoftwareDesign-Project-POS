package com.sdp.pos.service.file.contract;

import org.springframework.web.multipart.MultipartFile;

import com.sdp.pos.dto.cloud.CloudFileResultDTO;

public interface CloudFileService {
    CloudFileResultDTO uploadFile(MultipartFile file);

    CloudFileResultDTO replaceFile(String oldUrl, MultipartFile file);

    boolean deleteFile(String fileId);
}
