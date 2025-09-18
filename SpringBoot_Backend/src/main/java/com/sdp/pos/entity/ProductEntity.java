package com.sdp.pos.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class) // เพิ่มให้ timestamp อัปเดต auto
@Table(name = "products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "unit_price", nullable = false)
    private double unitPrice;

    @Column(name = "stock_level", nullable = false)
    private int stockLevel;

    @Column(name = "description")
    private String description;

    /*
     * @CreatedDate → เวลา persist entity ครั้งแรก (insert row) → ค่า timestamp
     * จะถูกเซ็ตอัตโนมัติ
     * 
     * เกี่ยวอะไรกับ LocalDateTime
     * LocalDateTime = Java 8 Date/Time API (เก็บวันที่ + เวลา แต่ไม่มี timezone)
     * 
     * @CreatedDate / @LastModifiedDate สามารถใช้กับ type ที่ Spring รองรับ
     * เช่น:
     * java.time.LocalDateTime ✅
     * java.time.LocalDate ✅ (เก็บเฉพาะวัน)
     * java.util.Date ✅
     * java.sql.Timestamp ✅
     * Instant ✅
     * Spring Data JPA จะ map ค่าเวลาจาก database column → type ที่คุณใช้
     */
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    /*
     * @LastModifiedDate → เวลา update entity → ค่า timestamp
     * จะถูกอัปเดตเป็นเวลาล่าสุดอัตโนมัติ
     */
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /*
     * @JoinColumn
     * ปกติ เอาไว้เขียนใน Owning side เท่านั้น
     * บอกชื่อ column ที่จะเป็น FK ใน table
     * 
     * name = "category_id" → ชื่อ column FK ในตาราง product
     * referencedColumnName = "id" → FK นี้อ้างไปที่ column id ของ category
     */
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private ProductCategoryEntity category;

    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private SupplierEntity supplier;

    public ProductEntity() {
    }

}
