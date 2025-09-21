package com.sdp.pos.dto.order.item;

import java.time.LocalDateTime;

import com.sdp.pos.dto.product.ProductResponseDTO;
import com.sdp.pos.entity.OrderItemEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemResponseDTO {
    private final String id;

    private final int quantity;

    private final double unitPrice;

    private final LocalDateTime createdAt;

    private final LocalDateTime updatedAt;

    private final ProductResponseDTO product;

    public static OrderItemResponseDTO fromEntity(OrderItemEntity orderItem) {

        return new OrderItemResponseDTO(orderItem.getId(), orderItem.getQuantity(), orderItem.getUnitPrice(),
                orderItem.getCreatedAt(), orderItem.getUpdatedAt(),
                ProductResponseDTO.fromEntity(orderItem.getProduct()));

    }
}
