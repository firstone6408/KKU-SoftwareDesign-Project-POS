package com.sdp.pos.service.order.contract;

import java.util.List;

import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderResponseDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;

public interface OrderService {
    List<OrderResponseDTO> getAll();

    OrderResponseDTO getById(String id);

    void create(OrderCreateRequestDTO requestDTO);

    void delete(String id);

    void save(String orderId, OrderSaveRequestDTO requestDTO);

    void close(String orderId);
}
