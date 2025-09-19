package com.sdp.pos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdp.pos.entity.OrderItemEntity;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, String> {

}
