package com.sdp.pos.service.contract;

import com.sdp.pos.dto.order.CreateOrderRequestDTO;

public interface OrderService {
    void create(CreateOrderRequestDTO requestDTO);

}
