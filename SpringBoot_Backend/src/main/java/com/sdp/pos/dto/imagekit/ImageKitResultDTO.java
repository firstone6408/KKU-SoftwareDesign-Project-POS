package com.sdp.pos.dto.imagekit;

import io.imagekit.sdk.models.results.Result;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ImageKitResultDTO {
    private String fileId;
    private String url;

    public static ImageKitResultDTO fromEntity(Result result) {
        return new ImageKitResultDTO(result.getFileId(), result.getUrl());
    }
}
