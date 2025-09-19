package com.sdp.pos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.sdp.pos.entity.OrderItemEntity;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemEntity, String> {
    @Query("SELECT i FROM OrderItemEntity i WHERE i.order.id = :orderId AND i.product.id = :productId")
    OrderItemEntity findByOrderIdAndProductId(@Param("orderId") String orderId, @Param("productId") String productId);

    @Modifying
    @Query("DELETE FROM OrderItemEntity i WHERE i.id = :id")
    void deleteById(@NonNull @Param("id") String id);
}
