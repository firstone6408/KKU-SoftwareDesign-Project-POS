package com.sdp.pos.service.saleinovice.implement;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.constant.OrderStatusEnum;
import com.sdp.pos.dto.saleinovice.PaymentRequestDTO;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.entity.SaleInoviceEntity;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.repository.SaleInoviceRepository;
import com.sdp.pos.service.order.validator.OrderValidator;
import com.sdp.pos.service.saleinovice.contract.SaleInoviceService;
import com.sdp.pos.util.ImageFileHandler;

@Service
public class SaleInoviceServiceImpl implements SaleInoviceService {

    private final OrderRepository orderRepository;
    private final SaleInoviceRepository saleInoviceRepository;
    private final OrderValidator orderValidator;
    private final ImageFileHandler imageFileHandler = new ImageFileHandler("saleinovice");

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
        orderValidator.validateOrderIsNotCanceled(orderId); // ยกเลิกยัง
        OrderEntity order = orderValidator.validateOrderAlreadyClosed(orderId);
        orderValidator.validateOrderHasItems(orderId);
        orderValidator.validateDiscount(order, requestDTO.getDiscount());

        SaleInoviceEntity saleInovice = order.getSaleInovice() != null
                ? order.getSaleInovice()
                : new SaleInoviceEntity();

        // set
        order.setStatus(OrderStatusEnum.PAID);
        saleInovice.setOrder(order);
        saleInovice.setPaymentMethod(requestDTO.getPaymentMethod());
        saleInovice.setPaidAmount(requestDTO.getPaidAmount());
        saleInovice.setChangeAmount(
                Math.max(requestDTO.getPaidAmount() - (order.getTotalAmount() - requestDTO.getDiscount()), 0));
        saleInovice.setTotalAmount(order.getTotalAmount());
        saleInovice.setDiscount(requestDTO.getDiscount());
        saleInovice.setInoviceDate(requestDTO.getInoviceDate());

        // save slip
        String slipPath;
        if (saleInovice.getSlipImageUrl() == null) {
            slipPath = imageFileHandler.uploadFile(requestDTO.getSlipImage());
        } else {
            slipPath = imageFileHandler.replaceFile(saleInovice.getSlipImageUrl(), requestDTO.getSlipImage());
        }
        saleInovice.setSlipImageUrl(slipPath);

        // update order if discount is not equal
        if (order.getDiscount() != requestDTO.getDiscount()) {
            order.setDiscount(requestDTO.getDiscount());
        }

        // save
        saleInoviceRepository.save(saleInovice);
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void deletePayment(String orderId) {
        orderValidator.validateOrderIsNotCanceled(orderId); // ยกเลิกยัง
        orderValidator.validateOrderAlreadyClosed(orderId);
        OrderEntity order = orderValidator.validateOrderHasInvoice(orderId);
        SaleInoviceEntity inoviceToDelete = order.getSaleInovice();

        // delete image
        if (inoviceToDelete.getSlipImageUrl() != null) {
            imageFileHandler.deleteFile(inoviceToDelete.getSlipImageUrl());
        }

        // delete
        order.setStatus(OrderStatusEnum.PENDING);
        order.setSaleInovice(null); // ตัดความสัมพันธ์ก่อน
        orderRepository.save(order); // save order เพื่อ update FK
        saleInoviceRepository.delete(inoviceToDelete);

    }

}
