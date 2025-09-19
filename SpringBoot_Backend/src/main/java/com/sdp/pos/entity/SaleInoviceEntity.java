package com.sdp.pos.entity;

import java.time.LocalDateTime;

import com.sdp.pos.constant.PaymentMethodEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sale_inovice")
public class SaleInoviceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Enumerated
    @Column(name = "payment_method")
    private PaymentMethodEnum paymentMethod;

    @Column(name = "slip_image_url")
    private String slipImageUrl;

    @Column(name = "paid_amount")
    private double paidAmount;

    @Column(name = "change_amount")
    private double changeAmount;

    @Column(name = "discount")
    private double discount;

    @Column(name = "total_amount")
    private double totalAmount;

    @Column(name = "inovice_date")
    private LocalDateTime inoviceDate;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderEntity order;

}
