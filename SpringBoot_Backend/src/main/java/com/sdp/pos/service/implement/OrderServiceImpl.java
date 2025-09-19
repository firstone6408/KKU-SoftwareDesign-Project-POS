package com.sdp.pos.service.implement;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.dto.order.OrderCloseRequestDTO;
import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.service.contract.OrderService;
import com.sdp.pos.service.validator.OrderValidator;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderValidator orderValidator;

    public OrderServiceImpl(OrderRepository orderRepository,
            OrderValidator orderValidator) {
        this.orderRepository = orderRepository;
        this.orderValidator = orderValidator;
    }

    @Override
    @Transactional
    public void create(OrderCreateRequestDTO requestDTO) {
        // validate customer and order
        CustomerEntity customer = orderValidator.validateCustomer(requestDTO.getCustomerId());
        orderValidator.validateOpenOrderExistsByCustomerId(requestDTO.getCustomerId());

        // create order
        OrderEntity orderToCreate = new OrderEntity();
        orderToCreate.setStatus(requestDTO.getStatus());
        orderToCreate.setCustomer(customer);
        orderToCreate.setTotalAmount(0);
        orderToCreate.setDiscount(0);

        // save
        orderRepository.save(orderToCreate);
    }

    @Override
    @Transactional
    public void save(String id, OrderSaveRequestDTO requestDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    @Transactional
    public void close(String id, OrderCloseRequestDTO requestDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'close'");
    }

}
