package com.rest.Restaurante.repository;


import com.rest.Restaurante.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderitemRepository extends JpaRepository<OrderItem, Long> {


}
