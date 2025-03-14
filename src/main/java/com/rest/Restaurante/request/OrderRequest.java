package com.rest.Restaurante.request;

import com.rest.Restaurante.model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;
    private Address deliceryAddress;
}
