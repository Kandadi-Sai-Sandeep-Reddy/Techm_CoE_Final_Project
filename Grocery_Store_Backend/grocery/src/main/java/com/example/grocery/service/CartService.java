package com.example.grocery.service;

import com.example.grocery.exception.ProductException;
import com.example.grocery.model.Cart;
import com.example.grocery.model.User;
import com.example.grocery.request.AddItemRequest;

public interface CartService {
	public Cart createCart(User user);
	
	public String addCartItem(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
