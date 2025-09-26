package com.sdp.pos.service.order.validator;

import org.springframework.stereotype.Component;

import com.sdp.pos.constant.OrderStatusEnum;
import com.sdp.pos.dto.order.DiscountExceedsTotalAmountException;
import com.sdp.pos.entity.CustomerEntity;
import com.sdp.pos.entity.OrderEntity;
import com.sdp.pos.entity.UserEntity;
import com.sdp.pos.repository.CustomerRepository;
import com.sdp.pos.repository.OrderRepository;
import com.sdp.pos.repository.UserRepository;
import com.sdp.pos.service.customer.exception.CustomerNotFoundException;
import com.sdp.pos.service.order.exception.OpenOrderExistsException;
import com.sdp.pos.service.order.exception.OrderAlreadyCanceledException;
import com.sdp.pos.service.order.exception.OrderAlreadyClosedException;
import com.sdp.pos.service.order.exception.OrderAlreadyHasInvoiceException;
import com.sdp.pos.service.order.exception.OrderAlreadyPaidException;
import com.sdp.pos.service.order.exception.OrderHasItemsException;
import com.sdp.pos.service.order.exception.OrderHasNoInvoiceException;
import com.sdp.pos.service.order.exception.OrderItemEmptyException;
import com.sdp.pos.service.order.exception.OrderNotCanceledException;
import com.sdp.pos.service.order.exception.OrderNotCompletedException;
import com.sdp.pos.service.order.exception.OrderNotFoundException;
import com.sdp.pos.service.order.exception.OrderNotPaidException;
import com.sdp.pos.service.user.exception.UserNotFoundException;

@Component
public class OrderValidator {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    public OrderValidator(OrderRepository orderRepository, CustomerRepository customerRepository,
            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    /**
     * ตรวจสอบว่า Order มีอยู่ในฐานข้อมูลหรือไม่
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderNotFoundException ถ้าไม่พบ Order
     */
    public OrderEntity validateOrderExists(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
    }

    /**
     * ตรวจสอบว่า Customer มีอยู่ในฐานข้อมูลหรือไม่
     * 
     * @param customerId รหัสลูกค้า
     * @return CustomerEntity ที่พบ
     * @throws CustomerNotFoundException ถ้าไม่พบ Customer
     */
    public CustomerEntity validateCustomer(String customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException(customerId));
    }

    /**
     * ตรวจสอบว่า User มีอยู่ในฐานข้อมูลหรือไม่
     * 
     * @param userId รหัสผู้ใช้
     * @return UserEntity ที่พบ
     * @throws UserNotFoundException ถ้าไม่พบ User
     */
    public UserEntity validateUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    /**
     * ตรวจสอบว่ามี Order ล่าสุด ที่ยังเปิดอยู่ (Pending) ของลูกค้ารายนี้หรือไม่
     * 
     * @param customerId รหัสลูกค้า
     * @return OrderEntity ที่ยังเปิดอยู่ หรือ null ถ้าไม่มี
     * @throws OpenOrderExistsException ถ้ามี Order เปิดอยู่แล้ว
     */
    public OrderEntity validateOpenOrderExistsByCustomerId(String customerId) {
        OrderEntity lastOrderOpen = orderRepository.findLastOrderByCustomerId(customerId);
        if (lastOrderOpen != null && lastOrderOpen.getStatus().equals(OrderStatusEnum.PENDING)) {
            throw new OpenOrderExistsException(lastOrderOpen.getId());
        }

        return lastOrderOpen;
    }

    /**
     * ตรวจสอบว่าค่าลดราคามากกว่ายอดรวม Order หรือไม่
     * 
     * @param order    OrderEntity
     * @param discount จำนวนส่วนลด
     * @throws DiscountExceedsTotalAmountException ถ้าส่วนลดมากกว่ายอดรวม
     */
    public void validateDiscount(OrderEntity order, double discount) {
        if (discount > order.getTotalAmount()) {
            throw new DiscountExceedsTotalAmountException(discount, order.getTotalAmount());
        }
    }

    /**
     * ตรวจสอบว่า Order ถูกปิดแล้วหรือยัง
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderAlreadyClosedException ถ้า Order ถูกปิดแล้ว
     */
    public OrderEntity validateOrderAlreadyClosed(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (order.getStatus().equals(OrderStatusEnum.COMPLETED)) {
            throw new OrderAlreadyClosedException(orderId);
        }

        return order;
    }

    /**
     * ตรวจสอบว่า Order เป็น COMPLETED
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderNotCompletedException ถ้า Order ไม่ใช่ COMPLETED
     * @throws OrderNotFoundException     ถ้าไม่พบ Order
     */
    public OrderEntity validateOrderIsCompleted(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (!order.getStatus().equals(OrderStatusEnum.COMPLETED)) {
            throw new OrderNotCompletedException(orderId);
        }

        return order;
    }

    /**
     * ตรวจสอบว่า Order ถูกชำระเงินแล้วหรือยัง
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderNotPaidException ถ้า Order ยังไม่ได้จ่าย
     */
    public OrderEntity validateOrderIsPaid(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (!order.getStatus().equals(OrderStatusEnum.PAID)) {
            throw new OrderNotPaidException(orderId);
        }

        return order;
    }

    /**
     * ตรวจสอบว่า Order ยังไม่ได้จ่ายเงิน
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderAlreadyPaidException ถ้า Order ถูกจ่ายแล้ว
     */
    public OrderEntity validateOrderIsNotPaid(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (!order.getStatus().equals(OrderStatusEnum.PENDING)) {
            throw new OrderAlreadyPaidException(orderId); // custom exception
        }

        return order;
    }

    /**
     * ตรวจสอบว่า Order มีรายการสินค้า (Items) หรือไม่
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderItemEmptyException ถ้า Order ไม่มีรายการสินค้า
     */
    public OrderEntity validateOrderHasItems(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (order.getItems().isEmpty()) {
            throw new OrderItemEmptyException(orderId);
        }

        return order;
    }

    /**
     * ตรวจสอบว่า Order ไม่มีรายการสินค้า (Items)
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderHasItemsException ถ้า Order มีรายการสินค้า
     */
    public OrderEntity validateOrderHasNoItems(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (!order.getItems().isEmpty()) {
            throw new OrderHasItemsException(orderId);
        }

        return order;
    }

    /**
     * ตรวจสอบว่า Order มี Invoice หรือไม่
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderHasNoInvoiceException ถ้า Order ไม่มี Invoice
     */
    public OrderEntity validateOrderHasInvoice(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (order.getSaleInovice() == null) {
            throw new OrderHasNoInvoiceException(orderId);
        }
        return order;
    }

    /**
     * ตรวจสอบว่า Order ไม่มี Invoice อยู่ก่อน
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderAlreadyHasInvoiceException ถ้า Order มี Invoice อยู่แล้ว
     */
    public OrderEntity validateOrderDoesNotHaveInvoice(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (order.getSaleInovice() != null) {
            throw new OrderAlreadyHasInvoiceException(orderId);
        }
        return order;
    }

    /**
     * ตรวจสอบว่า Order ยกเลิกแล้วหรือยัง
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderAlreadyCanceledException ถ้า Order ยังไม่ถูกยกเลิก
     */
    public OrderEntity validateOrderIsCanceled(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (!order.getStatus().equals(OrderStatusEnum.CANCELLED)) {
            throw new OrderAlreadyCanceledException(orderId);
        }

        return order;
    }

    /**
     * ตรวจสอบว่า Order ยังไม่ถูกยกเลิก
     * 
     * @param orderId รหัส Order
     * @return OrderEntity ที่พบ
     * @throws OrderNotCanceledException ถ้า Order ถูกยกเลิกแล้ว
     */
    public OrderEntity validateOrderIsNotCanceled(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (order.getStatus().equals(OrderStatusEnum.CANCELLED)) {
            throw new OrderNotCanceledException(orderId);
        }

        return order;
    }
}
