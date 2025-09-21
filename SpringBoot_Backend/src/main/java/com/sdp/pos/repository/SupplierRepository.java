package com.sdp.pos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdp.pos.entity.SupplierEntity;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierEntity, String> {
    List<SupplierEntity> findAllByOrderByNameAsc();
}
