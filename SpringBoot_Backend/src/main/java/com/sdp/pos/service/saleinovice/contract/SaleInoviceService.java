package com.sdp.pos.service.saleinovice.contract;

import com.sdp.pos.dto.saleinovice.PaymentRequestDTO;

public interface SaleInoviceService {
    void payment(String orderId, PaymentRequestDTO requestDTO);
}
