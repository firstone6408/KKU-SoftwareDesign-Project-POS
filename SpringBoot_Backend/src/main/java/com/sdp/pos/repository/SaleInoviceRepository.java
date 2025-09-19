package com.sdp.pos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdp.pos.entity.SaleInoviceEntity;

@Repository
public interface SaleInoviceRepository extends JpaRepository<SaleInoviceEntity, String> {

}
