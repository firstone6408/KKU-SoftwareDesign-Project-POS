package com.sdp.pos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sdp.pos.entity.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity, String> {
    @Query("SELECT c FROM CustomerEntity c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.contactInfo) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<CustomerEntity> searchByNameOrContact(@Param("keyword") String keyword);
}