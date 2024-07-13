package com.example.grocery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.grocery.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
	
	public User findByEmail(String email);

}
