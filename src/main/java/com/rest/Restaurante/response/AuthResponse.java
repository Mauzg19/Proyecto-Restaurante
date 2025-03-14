package com.rest.Restaurante.response;

import lombok.Data;


import com.rest.Restaurante.model.USER_ROLE;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
