package com.sdp.pos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdp.pos.entity.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {
    List<ProductEntity> findAllByOrderByCreatedAtDesc();

    ProductEntity findFirstByOrderByCreatedAtDesc();
}
