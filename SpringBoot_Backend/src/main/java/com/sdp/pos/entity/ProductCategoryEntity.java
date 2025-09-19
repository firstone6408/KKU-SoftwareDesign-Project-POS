package com.sdp.pos.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_categories")
public class ProductCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    /*
     * mappedBy
     * ใช้ใน @OneToMany ฝั่งที่ไม่ถือ FK (inverse side)
     * ค่า = ชื่อ field ที่ ถือ FK ใน entity อีกฝั่ง
     * 
     * cascade = CascadeType.ALL
     * หมายถึง: เวลา Category ถูก persist, merge, remove, refresh, detach →
     * ส่งผลไปยัง Product ด้วย
     * เช่น ลบ Category → ลบ Product ทั้งหมดที่อยู่ในนั้น (ถ้า FK/constraint อนุญาต)
     */
    // @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @OneToMany(mappedBy = "category")
    private List<ProductEntity> products = new ArrayList<>();

    public ProductCategoryEntity() {
    }

    public ProductCategoryEntity(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("ProductCategoryEntity{id='").append(id)
                .append("', name='").append(name)
                .append("'}");
        return sb.toString();
    }
}
