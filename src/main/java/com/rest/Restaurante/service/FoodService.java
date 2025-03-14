package com.rest.Restaurante.service;

import com.rest.Restaurante.model.Category;
import com.rest.Restaurante.model.Food;
import com.rest.Restaurante.model.Restaurant;
import com.rest.Restaurante.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId,
                                         boolean isVegitarian,
                                         boolean isNonveg,
                                         boolean isSeasonal,
                                         String foodCategory
    );

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId)throws Exception;

    public Food updateAvailibiityStatus(long foodId)throws Exception;

}
