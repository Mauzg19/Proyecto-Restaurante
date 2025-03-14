package com.rest.Restaurante.repository;

import com.rest.Restaurante.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
