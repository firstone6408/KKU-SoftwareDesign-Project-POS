package com.sdp.pos.dto.order.item;

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

    private final ProductResponseDTO product;

    public static OrderItemResponseDTO fromEntity(OrderItemEntity orderItem) {

        return new OrderItemResponseDTO(orderItem.getId(), orderItem.getQuantity(), orderItem.getUnitPrice(),
                ProductResponseDTO.fromEntity(orderItem.getProduct()));

    }
}
