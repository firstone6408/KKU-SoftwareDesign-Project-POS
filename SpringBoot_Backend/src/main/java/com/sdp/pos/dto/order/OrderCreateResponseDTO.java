package com.sdp.pos.dto.order;

import com.sdp.pos.entity.OrderEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderCreateResponseDTO {
    private final String orderId;

    public static OrderCreateResponseDTO from(OrderEntity order) {
        return new OrderCreateResponseDTO(order.getId());
    }
}
