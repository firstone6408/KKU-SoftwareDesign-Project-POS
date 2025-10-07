package com.sdp.pos.dto.cloud;

import io.imagekit.sdk.models.results.Result;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CloudFileResultDTO {
    private String fileId;
    private String url;

    public static CloudFileResultDTO fromEntity(Result result) {
        return new CloudFileResultDTO(result.getFileId(), result.getUrl());
    }
}
