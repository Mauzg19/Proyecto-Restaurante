package com.rest.Restaurante.repository;

import com.rest.Restaurante.model.IngredientsItem;
import com.rest.Restaurante.service.IngredientsService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientItemRepository extends JpaRepository<IngredientsItem, Long> {
    List<IngredientsItem> findByRestaurantId(Long restaurantId);

}

