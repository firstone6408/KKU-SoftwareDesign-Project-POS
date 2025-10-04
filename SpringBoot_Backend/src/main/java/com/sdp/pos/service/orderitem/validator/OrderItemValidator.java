package com.sdp.pos.service.orderitem.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.entity.OrderItemEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.repository.OrderItemRepository;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.orderitem.exception.OrderItemNotFoundException;
import com.sdp.pos.service.product.exception.InsufficientStockException;
import com.sdp.pos.service.product.exception.ProductNotFoundException;

@Component
public class OrderItemValidator {
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderItemValidator(ProductRepository productRepository, OrderItemRepository orderItemRepository) {
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public OrderItemEntity validateOrderItem(String orderItemId) {
        OrderItemEntity existingItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new OrderItemNotFoundException(orderItemId));
        return existingItem;
    }

    public ProductEntity validateProduct(String productId, int quantity) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        if (product.getStockLevel() < quantity) {
            throw new InsufficientStockException(productId, quantity, product.getStockLevel());
        }
        return product;
    }

}
