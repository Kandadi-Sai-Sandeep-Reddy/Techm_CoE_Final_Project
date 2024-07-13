package com.example.grocery.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.grocery.config.JwtProvider;
import com.example.grocery.exception.UserException;
import com.example.grocery.model.User;
import com.example.grocery.repository.UserRepository;


@Service
public class UserServiceImplementation implements UserService {
	
	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	
	public UserServiceImplementation(UserRepository userRepository,JwtProvider jwtProvider) {
		this.userRepository=userRepository;
		this.jwtProvider=jwtProvider;
	}

	@Override
	public User findUserById(Long userId) throws UserException {
		// TODO Auto-generated method stub
		
		Optional<User>user=userRepository.findById(userId);
		if(user.isPresent()) {
			return user.get();
		}
		
		throw new UserException("User not found with id:"+userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		// TODO Auto-generated method stub
		
		String email=jwtProvider.getEmailFromToken(jwt);
		User user=userRepository.findByEmail(email);
		
		if(user==null) {
			throw new UserException("user not found with email"+email); 
		}
		return user;
	}
	
	
	  @Override
	    public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }
	  
	  @Override
	    public long countCustomers() {
	        return userRepository.count();
	    }




}
