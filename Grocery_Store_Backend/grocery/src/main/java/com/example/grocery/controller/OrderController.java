package com.example.grocery.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.grocery.exception.OrderException;
import com.example.grocery.exception.UserException;
import com.example.grocery.model.Address;
import com.example.grocery.model.Order;
import com.example.grocery.model.User;
import com.example.grocery.service.OrderService;
import com.example.grocery.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/")
	public ResponseEntity<Order>createOrder(@RequestBody Address shippingAddress,
			@RequestHeader("Authorization")String jwt) throws UserException{
		User user=userService.findUserProfileByJwt(jwt);
		
		Order order=orderService.createOrder(user, shippingAddress);
		
		System.out.println("order"+order);
		
		return new ResponseEntity<Order>(order,HttpStatus.CREATED);
		
	}
	
	@GetMapping("/{Id}")
	public ResponseEntity<Order> findOrderById(
			@PathVariable("Id")Long orderId,
			@RequestHeader("Authorization")String jwt)throws UserException,OrderException{
		User user=userService.findUserProfileByJwt(jwt);
		
		Order order=orderService.findOrderById(orderId);
		
		return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
		
	}
	
	
	@GetMapping("/user")
	public ResponseEntity<List<Order>> getOrderHistoryByUser(
			@RequestHeader("Authorization")String jwt)throws UserException,OrderException{
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Order> order=orderService.usersOrderHistory(user.getId());
		
		return new ResponseEntity<List<Order>>(order,HttpStatus.ACCEPTED);
		
	}
	
	
	
}
