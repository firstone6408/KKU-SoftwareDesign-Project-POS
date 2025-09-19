package com.sdp.pos.service.implement;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.order.item.OrderItemCreateRequestDTO;
import com.sdp.pos.dto.order.item.OrderItemRemoveRequestDTO;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.entity.OrderItemEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.repository.OrderItemRepository;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.contract.OrderItemService;
import com.sdp.pos.service.exception.order.EmptyOrderException;
import com.sdp.pos.service.exception.order.item.OrderItemNotFoundException;
import com.sdp.pos.service.exception.order.item.OrderItemQuantityExceededException;
import com.sdp.pos.service.validator.OrderItemValidator;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemValidator orderItemValidator;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository, OrderRepository orderRepository,
            ProductRepository productRepository, OrderItemValidator orderItemValidator) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemValidator = orderItemValidator;
    }

    @Override
    @Transactional
    public void addItem(String orderId, OrderItemCreateRequestDTO requestDTO) {
        // validate order, product
        OrderEntity order = orderItemValidator.validateOrder(orderId);
        ProductEntity product = orderItemValidator.validateProduct(requestDTO.getProductId(), requestDTO.getQuantity());

        // check product in order item
        OrderItemEntity existingItem = orderItemRepository.findByOrderIdAndProductId(orderId,
                requestDTO.getProductId());

        if (existingItem != null) {
            // update item
            existingItem.increaseQuantity(requestDTO.getQuantity());
            existingItem.setUnitPrice(requestDTO.getUnitPrice());
            // save
            orderItemRepository.save(existingItem);

        } else {
            // create new item
            OrderItemEntity newItem = new OrderItemEntity();
            newItem.setOrder(order);
            newItem.setProduct(product);
            newItem.setQuantity(requestDTO.getQuantity());
            newItem.setUnitPrice(requestDTO.getUnitPrice());

            orderItemRepository.save(newItem);

            order.getItems().add(newItem);
        }

        // recalculate total amount for order
        order.recalculateTotalAmount();

        // save order
        orderRepository.save(order);

        // update stock product
        product.decreaseStock(requestDTO.getQuantity());
        productRepository.save(product);
    }

    @Override
    @Transactional
    public void removeItem(String orderId, OrderItemRemoveRequestDTO requestDTO) {
        // validate order
        OrderEntity order = orderItemValidator.validateOrder(orderId);
        if (order.getItems().size() == 0) {
            throw new EmptyOrderException(order.getId());
        }

        // check item
        OrderItemEntity existingItem = orderItemRepository.findById(requestDTO.getOrderItemId())
                .orElseThrow(() -> new OrderItemNotFoundException(requestDTO.getOrderItemId()));

        ProductEntity product = existingItem.getProduct();

        if (existingItem.getQuantity() > requestDTO.getQuantity()) {
            // decrese
            existingItem.decreaseQuantity(requestDTO.getQuantity());
            orderItemRepository.save(existingItem);
        } else if (existingItem.getQuantity() == requestDTO.getQuantity()) {
            // delete item
            order.getItems().remove(existingItem);
            orderItemRepository.deleteById(existingItem.getId());

        } else {
            throw new OrderItemQuantityExceededException(requestDTO.getQuantity(), existingItem.getQuantity());
        }

        order.recalculateTotalAmount();
        orderRepository.save(order);

        // update stock product
        product.increaseStock(requestDTO.getQuantity());
        productRepository.save(product);
    }

}
