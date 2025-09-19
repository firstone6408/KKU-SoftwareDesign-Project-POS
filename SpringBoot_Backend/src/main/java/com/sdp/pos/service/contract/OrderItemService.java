package com.sdp.pos.service.contract;

import com.sdp.pos.dto.order.item.OrderItemCreateRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemRemoveRequestDTO;

public interface OrderItemService {
    void addItem(String orderId, OrderItemCreateRequestDTO requestDTO);

    void removeItem(String orderId, OrderItemRemoveRequestDTO requestDTO);
}
