package com.sdp.pos.service.order.contract;

import java.util.List;

import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderCreateResponseDTO;
import com.sdp.pos.dto.order.OrderResponseDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;

public interface OrderService {
    List<OrderResponseDTO> getAll();

    OrderResponseDTO getById(String id);

    OrderCreateResponseDTO create(String userId, OrderCreateRequestDTO requestDTO);

    void delete(String id);

    void save(String orderId, OrderSaveRequestDTO requestDTO);

    void close(String orderId);

    void cancel(String orderId);
}
