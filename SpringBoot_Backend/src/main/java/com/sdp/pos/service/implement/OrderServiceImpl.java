package com.sdp.pos.service.implement;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.order.CreateOrderRequestDTO;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.repository.CustomerRepository;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.service.contract.OrderService;
import com.sdp.pos.service.exception.customer.CustomerNotFoundException;
import com.sdp.pos.service.exception.order.OpenOrderExistsException;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    public OrderServiceImpl(OrderRepository orderRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public void create(CreateOrderRequestDTO requestDTO) {
        // check customer
        CustomerEntity customerExist = customerRepository.findById(requestDTO.getCustomerId())
                .orElseThrow(() -> new CustomerNotFoundException(requestDTO.getCustomerId()));

        // check last order
        OrderEntity lastOrderOpen = orderRepository.findLastOrderByCustomerId(requestDTO.getCustomerId());

        if (lastOrderOpen != null) {
            throw new OpenOrderExistsException(lastOrderOpen.getId());
        }

        // create order
        OrderEntity orderToCreate = new OrderEntity();
        orderToCreate.setStatus(requestDTO.getStatus());
        orderToCreate.setCustomer(customerExist);
        orderToCreate.setTotalAmount(0);
        orderToCreate.setDiscount(0);

        // save
        orderRepository.save(orderToCreate);
    }

}
