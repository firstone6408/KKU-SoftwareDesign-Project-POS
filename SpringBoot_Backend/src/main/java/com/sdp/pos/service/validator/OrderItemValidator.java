package com.sdp.pos.service.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.constant.OrderStatusEnum;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.exception.order.OrderAlreadyClosedException;
import com.sdp.pos.service.exception.order.OrderNotFoundException;
import com.sdp.pos.service.exception.product.InsufficientStockException;
import com.sdp.pos.service.exception.product.ProductNotFoundException;

@Component
public class OrderItemValidator {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public OrderItemValidator(ProductRepository productRepository, OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public ProductEntity validateProduct(String productId, int quantity) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        if (product.getStockLevel() < quantity) {
            throw new InsufficientStockException(productId, quantity, product.getStockLevel());
        }
        return product;
    }

    public OrderEntity validateOrder(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (!order.getStatus().equals(OrderStatusEnum.PENDING)) {
            throw new OrderAlreadyClosedException(orderId);
        }
        return order;
    }

}
