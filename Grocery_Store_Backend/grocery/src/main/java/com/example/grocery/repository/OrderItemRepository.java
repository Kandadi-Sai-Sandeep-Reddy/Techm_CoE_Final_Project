package com.example.grocery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.grocery.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long>{

}
