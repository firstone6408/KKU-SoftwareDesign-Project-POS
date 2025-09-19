package com.sdp.pos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sdp.pos.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, String> {
    @Query("SELECT o FROM OrderEntity o WHERE o.customer.id = :customerId ORDER BY o.orderDate DESC LIMIT 1")
    OrderEntity findLastOrderByCustomerId(@Param("customerId") String customerId);
}
