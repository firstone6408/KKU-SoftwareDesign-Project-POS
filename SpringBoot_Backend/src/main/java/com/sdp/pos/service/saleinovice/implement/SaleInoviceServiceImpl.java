package com.sdp.pos.service.saleinovice.implement;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.saleinovice.PaymentRequestDTO;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.entity.SaleInoviceEntity;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.repository.SaleInoviceRepository;
import com.sdp.pos.service.order.validator.OrderValidator;
import com.sdp.pos.service.saleinovice.contract.SaleInoviceService;

@Service
public class SaleInoviceServiceImpl implements SaleInoviceService {

    private final OrderRepository orderRepository;
    private final SaleInoviceRepository saleInoviceRepository;
    private final OrderValidator orderValidator;

    public SaleInoviceServiceImpl(SaleInoviceRepository saleInoviceRepository, OrderValidator orderValidator,
            OrderRepository orderRepository) {
        this.saleInoviceRepository = saleInoviceRepository;
        this.orderValidator = orderValidator;
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    public void payment(String orderId, PaymentRequestDTO requestDTO) {
        // validate
        OrderEntity order = orderValidator.validateOrderAlreadyClosed(orderId);
        orderValidator.validateDiscount(order, requestDTO.getDiscount());

        SaleInoviceEntity saleInovice = order.getSaleInovice() != null
                ? order.getSaleInovice()
                : new SaleInoviceEntity();

        // set
        saleInovice.setOrder(order);
        saleInovice.setPaymentMethod(requestDTO.getPaymentMethod());
        saleInovice.setPaidAmount(requestDTO.getPaidAmount());
        saleInovice.setChangeAmount(
                Math.max(requestDTO.getPaidAmount() - order.getTotalAmount() - requestDTO.getDiscount(), 0));
        saleInovice.setTotalAmount(order.getTotalAmount());
        saleInovice.setDiscount(requestDTO.getDiscount());
        saleInovice.setInoviceDate(requestDTO.getInoviceDate());

        // update order if discount is not equal
        if (order.getDiscount() != requestDTO.getDiscount()) {
            order.setDiscount(requestDTO.getDiscount());
            orderRepository.save(order);
        }

        // save
        saleInoviceRepository.save(saleInovice);
    }

}
