package com.sdp.pos.dto.saleinovice;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.sdp.pos.constant.PaymentMethodEnum;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaymentRequestDTO {

    @Min(value = 0, message = "discount must be at least 0")
    private final double discount; // ส่วนลด

    @NotNull(message = "slipImage is required")
    private final MultipartFile slipImage;

    @Min(value = 0, message = "paidAmount must be at least 0")
    private final double paidAmount; // ยอดที่ลูกค้าจ่าย

    @NotNull(message = "paymentMethod is required")
    private final PaymentMethodEnum paymentMethod;

    @NotNull(message = "inoviceDate is required")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private final LocalDateTime inoviceDate;
}
