package com.sdp.pos.service.contract;

import com.sdp.pos.dto.order.OrderCloseRequestDTO;
import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;

public interface OrderService {
    void create(OrderCreateRequestDTO requestDTO);

    void save(String id, OrderSaveRequestDTO requestDTO);

    void close(String id, OrderCloseRequestDTO requestDTO);
}
