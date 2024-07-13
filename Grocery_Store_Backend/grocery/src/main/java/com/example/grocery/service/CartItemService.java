package com.example.grocery.service;

import com.example.grocery.exception.CartItemException;
import com.example.grocery.exception.UserException;
import com.example.grocery.model.Cart;
import com.example.grocery.model.CartItem;
import com.example.grocery.model.Product;

public interface CartItemService {
	
	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId,Long id,CartItem cartItem)throws CartItemException,UserException;

	public CartItem isCartItemExist(Cart cart,Product product,String size,Long userId);
	
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException,UserException;
	
	public CartItem findCartItemById(Long cartItemId)throws CartItemException;
	
}
