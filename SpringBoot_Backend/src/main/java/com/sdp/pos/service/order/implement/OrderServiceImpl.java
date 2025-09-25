package com.sdp.pos.service.order.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.constant.OrderStatusEnum;
import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderCreateResponseDTO;
import com.sdp.pos.dto.order.OrderResponseDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.service.order.contract.OrderCodeGenerator;
import com.sdp.pos.service.order.contract.OrderService;
import com.sdp.pos.service.order.exception.OrderHasItemsException;
import com.sdp.pos.service.order.exception.OrderNotFoundException;
import com.sdp.pos.service.order.exception.OrderNotPaidException;
import com.sdp.pos.service.order.validator.OrderValidator;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderValidator orderValidator;
    private final OrderCodeGenerator orderCodeGenerator;

    public OrderServiceImpl(OrderRepository orderRepository, OrderValidator orderValidator,
            OrderCodeGenerator orderCodeGenerator) {
        this.orderRepository = orderRepository;
        this.orderValidator = orderValidator;
        this.orderCodeGenerator = orderCodeGenerator;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAll() {
        List<OrderEntity> orders = orderRepository.findAllByOrderByOrderDateDesc();
        return orders.stream().map(OrderResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDTO getById(String id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));

        return OrderResponseDTO.fromEntity(order);
    }

    @Override
    @Transactional
    public void delete(String id) {
        OrderEntity orderToDelete = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));

        if (!orderToDelete.getItems().isEmpty()) {
            throw new OrderHasItemsException(orderToDelete.getId());
        }
        orderRepository.delete(orderToDelete);
    }

    @Override
    @Transactional
    public OrderCreateResponseDTO create(String userId, OrderCreateRequestDTO requestDTO) {
        // validate user, customer and order
        UserEntity user = orderValidator.validateUser(userId);
        CustomerEntity customer = orderValidator.validateCustomer(requestDTO.getCustomerId());
        orderValidator.validateOpenOrderExistsByCustomerId(requestDTO.getCustomerId());

        // create order
        OrderEntity orderToCreate = new OrderEntity();
        orderToCreate.setOrderCode(orderCodeGenerator.generate());
        orderToCreate.setStatus(OrderStatusEnum.PENDING);
        orderToCreate.setCustomer(customer);
        orderToCreate.setTotalAmount(0);
        orderToCreate.setDiscount(0);
        orderToCreate.setCreatedBy(user);

        // save
        OrderEntity created = orderRepository.save(orderToCreate);

        return OrderCreateResponseDTO.from(created);
    }

    @Override
    @Transactional
    public void save(String orderId, OrderSaveRequestDTO requestDTO) {
        // validate
        OrderEntity orderToUpdate = orderValidator.validateOrderAlreadyClosed(orderId);

        // validate discount
        orderValidator.validateDiscount(orderToUpdate, requestDTO.getDiscount());

        // update
        orderToUpdate.setDiscount(requestDTO.getDiscount());
        orderToUpdate.setNote(requestDTO.getNote());
        orderToUpdate.setDeliveryDate(requestDTO.getDeliveryDate());

        // ! ไม่ต้อง recalculate
        // orderToUpdate.recalculateTotalAmount();

        // save
        orderRepository.save(orderToUpdate);
    }

    @Override
    @Transactional
    public void close(String orderId) {
        // validate
        OrderEntity orderToUpdate = orderValidator.validateOrderAlreadyClosed(orderId);

        if (orderToUpdate.getSaleInovice() == null) {
            throw new OrderNotPaidException(orderId);
        }

        // update
        orderToUpdate.setStatus(OrderStatusEnum.PAID);

        // save
        orderRepository.save(orderToUpdate);
    }

}
