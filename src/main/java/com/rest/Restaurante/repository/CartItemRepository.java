package com.rest.Restaurante.repository;

import com.rest.Restaurante.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
