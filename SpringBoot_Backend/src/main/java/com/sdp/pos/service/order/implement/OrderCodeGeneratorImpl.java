package com.sdp.pos.service.order.implement;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.service.order.contract.OrderCodeGenerator;
import com.sdp.pos.service.order.exception.OrderCodeGenerationException;

@Component
public class OrderCodeGeneratorImpl implements OrderCodeGenerator {
    private final OrderRepository orderRepository;

    public OrderCodeGeneratorImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public String generate() {
        try {
            // หาเลขล่าสุดจาก DB
            OrderEntity lastOrder = orderRepository
                    .findFirstByOrderByOrderDateDesc();

            int nextNumber = 1;

            if (lastOrder != null && lastOrder.getOrderCode() != null) {
                String code = lastOrder.getOrderCode();

                if (code.startsWith("ORD-")) {
                    try {
                        int lastNumber = Integer.parseInt(code.substring(5));
                        nextNumber = lastNumber + 1;
                    } catch (Exception e) {
                        // ถ้า parse ไม่ได้ ให้เริ่มที่ 1
                        nextNumber = 1;
                    }
                }
            }

            return String.format("ORD-%06d", nextNumber);
        } catch (Exception e) {
            throw new OrderCodeGenerationException(e.getMessage());
        }
    }

}
