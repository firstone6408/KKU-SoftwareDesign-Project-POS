package com.sdp.pos.service.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.constant.OrderStatusEnum;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.repository.CustomerRepository;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.service.exception.customer.CustomerNotFoundException;
import com.sdp.pos.service.exception.order.OpenOrderExistsException;

@Component
public class OrderValidator {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    public OrderValidator(OrderRepository orderRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
    }

    public CustomerEntity validateCustomer(String customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException(customerId));
    }

    public OrderEntity validateOpenOrderExistsByCustomerId(String customerId) {
        OrderEntity lastOrderOpen = orderRepository.findLastOrderByCustomerId(customerId);
        if (lastOrderOpen.getStatus().equals(OrderStatusEnum.PENDING)) {
            throw new OpenOrderExistsException(lastOrderOpen.getId());
        }

        return lastOrderOpen;
    }
}
