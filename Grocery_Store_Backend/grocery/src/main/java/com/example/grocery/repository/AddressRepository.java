package com.example.grocery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.grocery.model.Address;

public interface AddressRepository extends JpaRepository<Address,Long>{

}
