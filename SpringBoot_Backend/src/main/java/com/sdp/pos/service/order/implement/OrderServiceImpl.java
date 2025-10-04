package com.sdp.pos.service.order.implement;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.pos.constant.OrderStatusEnum;
import com.sdp.pos.context.user.UserContextProvider;
import com.sdp.pos.dto.order.OrderCreateRequestDTO;
import com.sdp.pos.dto.order.OrderCreateResponseDTO;
import com.sdp.pos.dto.order.OrderResponseDTO;
import com.sdp.pos.dto.order.OrderSaveRequestDTO;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.entity.OrderItemEntity;
import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.repository.ProductRepository;
import com.sdp.pos.service.order.contract.OrderCodeGenerator;
import com.sdp.pos.service.order.contract.OrderService;
import com.sdp.pos.service.order.validator.OrderValidator;

@Service
public class OrderServiceImpl implements OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderValidator orderValidator;
    private final OrderCodeGenerator orderCodeGenerator;
    private final UserContextProvider userContextProvider;

    public OrderServiceImpl(OrderRepository orderRepository, OrderValidator orderValidator,
            OrderCodeGenerator orderCodeGenerator, ProductRepository productRepository,
            UserContextProvider userContextProvider) {
        this.orderRepository = orderRepository;
        this.orderValidator = orderValidator;
        this.orderCodeGenerator = orderCodeGenerator;
        this.productRepository = productRepository;
        this.userContextProvider = userContextProvider;
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
        OrderEntity order = orderValidator.validateOrderExists(id);

        return OrderResponseDTO.fromEntity(order);
    }

    @Override
    @Transactional
    public void delete(String id) {
        OrderEntity orderToDelete = orderValidator.validateOrderExists(id);

        orderValidator.validateOrderAlreadyClosed(id); // ปิดยัง
        orderValidator.validateOrderIsNotPaid(id); // เช็ค status
        orderValidator.validateOrderDoesNotHaveInvoice(id); // มีการจ่ายไหม
        orderValidator.validateOrderHasNoItems(id); // มีของไหม
        orderValidator.validateOrderIsNotCanceled(id); // ยกเลิกยัง

        orderRepository.delete(orderToDelete);
    }

    @Override
    @Transactional
    public OrderCreateResponseDTO create(OrderCreateRequestDTO requestDTO) {
        String userId = userContextProvider.getCurrentUser().getId();

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
        orderValidator.validateOrderAlreadyClosed(orderId); // ปิดยัง
        orderValidator.validateOrderIsNotPaid(orderId);
        orderValidator.validateOrderIsNotCanceled(orderId); // ยกเลิกยัง
        OrderEntity orderToUpdate = orderValidator.validateOrderDoesNotHaveInvoice(orderId);

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
        orderValidator.validateOrderAlreadyClosed(orderId); // ปิดยัง
        orderValidator.validateOrderIsPaid(orderId); // จ่ายยัง
        orderValidator.validateOrderIsNotCanceled(orderId); // ยกเลิกยัง
        OrderEntity orderToUpdate = orderValidator.validateOrderHasInvoice(orderId);

        // update
        orderToUpdate.setStatus(OrderStatusEnum.COMPLETED);

        // save
        orderRepository.save(orderToUpdate);
    }

    @Override
    @Transactional
    public void cancel(String orderId) {
        // validate
        OrderEntity orderToCancel = orderValidator.validateOrderExists(orderId);
        orderValidator.validateOrderIsNotCanceled(orderId);

        // คืน stock ของแต่ละ item และ save product
        for (OrderItemEntity item : orderToCancel.getItems()) {
            ProductEntity productToUpdate = item.getProduct();
            productToUpdate.increaseStock(item.getQuantity());
            productRepository.save(productToUpdate);
        }
        // update status
        orderToCancel.setStatus(OrderStatusEnum.CANCELLED);

        // save
        orderRepository.save(orderToCancel);

    }

}
