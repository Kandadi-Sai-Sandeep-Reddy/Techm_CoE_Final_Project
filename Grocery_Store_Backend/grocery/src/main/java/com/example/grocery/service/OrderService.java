package com.example.grocery.service;

import java.util.List;

import com.example.grocery.exception.OrderException;
import com.example.grocery.model.Address;
import com.example.grocery.model.Order;
import com.example.grocery.model.User;

public interface OrderService {

	public Order createOrder(User user,Address shippingAddress);
	
	public Order findOrderById(Long orderId) throws OrderException;
	
	public List<Order> usersOrderHistory(Long userId);
	
	public Order placedOrder(Long orderId) throws OrderException;
	
	public Order ConfirmedOrder(Long orderId) throws OrderException;
	
	public Order ShippedOrder(Long orderId) throws OrderException;
	
	public Order DeliveredOrder(Long orderId) throws OrderException;
	
	public Order CancelledOrder(Long orderId) throws OrderException;
	
	public List<Order>getAllOrders();
	
	public void deleteOrder(Long orderId) throws OrderException;
	
	public long countOrders();
}
