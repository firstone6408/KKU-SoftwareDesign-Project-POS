package com.sdp.pos.dto.saleinovice;

import java.time.LocalDateTime;

import com.sdp.pos.constant.PaymentMethodEnum;
import com.sdp.pos.entity.SaleInoviceEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SaleInoviceResponseDTO {
    private final String id;

    private final PaymentMethodEnum paymentMethod;

    private final String slipImageUrl;

    private final double paidAmount;

    private final double changeAmount;

    private final double discount;

    private final double totalAmount;

    private final LocalDateTime inoviceDate;

    public static SaleInoviceResponseDTO fromEntity(SaleInoviceEntity saleInovice) {
        return new SaleInoviceResponseDTO(saleInovice.getId(), saleInovice.getPaymentMethod(),
                saleInovice.getSlipImageUrl(), saleInovice.getPaidAmount(), saleInovice.getChangeAmount(),
                saleInovice.getDiscount(), saleInovice.getTotalAmount(), saleInovice.getInoviceDate());
    }
}
