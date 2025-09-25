package com.sdp.pos.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sdp.pos.constant.OrderStatusEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "order_code", nullable = false, unique = true)
    private String orderCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrderStatusEnum status;

    @Column(name = "total_amount", nullable = false)
    private double totalAmount;

    @Column(name = "discount", nullable = false)
    private double discount;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @CreatedDate
    @Column(name = "order_date", updatable = false)
    private LocalDateTime orderDate;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updateAt;

    @Column(name = "delivery_date")
    private LocalDateTime deliveryDate;

    @OneToMany(mappedBy = "order")
    @OrderBy("createdAt ASC")
    private List<OrderItemEntity> items = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private CustomerEntity customer;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private SaleInoviceEntity saleInovice;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private UserEntity createdBy;

    public void recalculateTotalAmount() {
        this.totalAmount = items.stream()
                .mapToDouble(item -> item.getUnitPrice() * item.getQuantity())
                .sum();
        // this.totalAmount = Math.max(total - discount, 0);
    }

}
