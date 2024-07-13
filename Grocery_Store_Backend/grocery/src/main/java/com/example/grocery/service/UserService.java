package com.example.grocery.service;

import com.example.grocery.exception.UserException;
import com.example.grocery.model.User;
import java.util.List;

public interface UserService {

	public User findUserById(Long userId) throws UserException;
	public User findUserProfileByJwt(String jwt) throws UserException;
	public List<User> getAllUsers();
	public long countCustomers();

	
}
