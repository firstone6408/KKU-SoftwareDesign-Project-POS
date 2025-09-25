package com.sdp.pos.dto.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.sdp.pos.constant.OrderStatusEnum;
import com.sdp.pos.dto.customer.CustomerResponseDTO;
import com.sdp.pos.dto.order.item.OrderItemResponseDTO;
import com.sdp.pos.dto.saleinovice.SaleInoviceResponseDTO;
import com.sdp.pos.entity.OrderEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderResponseDTO {
    private final String id;

    private final OrderStatusEnum status;

    private final double totalAmount;

    private final double discount;

    private final String note;

    private final LocalDateTime orderDate;

    private final LocalDateTime deliveryDate;

    private final LocalDateTime updatedAt;

    private final CustomerResponseDTO customer;

    private final SaleInoviceResponseDTO saleInovice;

    private final List<OrderItemResponseDTO> items;

    public static OrderResponseDTO fromEntity(OrderEntity order) {
        SaleInoviceResponseDTO saleInvoice = Optional.ofNullable(order.getSaleInovice())
                .map(SaleInoviceResponseDTO::fromEntity)
                .orElse(null);

        return new OrderResponseDTO(order.getId(), order.getStatus(), order.getTotalAmount(), order.getDiscount(),
                order.getNote(),
                order.getOrderDate(), order.getDeliveryDate(), order.getUpdateAt(),
                CustomerResponseDTO.fromEntitty(order.getCustomer()),
                saleInvoice,
                order.getItems().stream().map(OrderItemResponseDTO::fromEntity).toList());
    }
}
