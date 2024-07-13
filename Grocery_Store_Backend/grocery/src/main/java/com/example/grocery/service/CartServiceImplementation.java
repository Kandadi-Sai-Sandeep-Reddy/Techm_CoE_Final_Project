package com.example.grocery.service;

import org.springframework.stereotype.Service;

import com.example.grocery.exception.ProductException;
import com.example.grocery.model.Cart;
import com.example.grocery.model.CartItem;
import com.example.grocery.model.Product;
import com.example.grocery.model.User;
import com.example.grocery.repository.CartRepository;
import com.example.grocery.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService{
	
	
	private CartRepository cartRepository;
	private CartItemService cartItemService;
	private ProductService productService;
	
	public CartServiceImplementation(CartRepository cartRepository,CartItemService cartItemService,ProductService productService) {
		this.cartRepository=cartRepository;
		this.cartItemService=cartItemService;
		this.productService=productService;
	}

	@Override
	public Cart createCart(User user) {
		// TODO Auto-generated method stub
		
		Cart cart=new Cart();
		cart.setUser(user);
		
		return cartRepository.save(cart);
	}

	@Override
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
		// TODO Auto-generated method stub
		
		Cart cart=cartRepository.findByUserId(userId);
		Product product=productService.findProductById(req.getProductId());
		
		CartItem isPresent=cartItemService.isCartItemExist(cart, product, req.getSize(), userId);
		
		if(isPresent==null) {
			CartItem cartItem=new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);
			
			int price=req.getQuantity()*product.getDiscountedPrice();
			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());
			CartItem createdCartItem=cartItemService.createCartItem(cartItem);
			cart.getCartItems().add(createdCartItem);
		}
		return "Item added to Cart";
	}

	@Override
	public Cart findUserCart(Long userId) {
		// TODO Auto-generated method stub
		
		Cart cart=cartRepository.findByUserId(userId);
		int totalPrice=0;
		int totalDiscountedPrice=0;
		int totalItem=0;
		
		for(CartItem cartItem :cart.getCartItems()) {
			totalPrice=totalPrice+cartItem.getPrice();
			totalDiscountedPrice=totalDiscountedPrice+cartItem.getDiscountedPrice();
			totalItem=totalItem+cartItem.getQuantity();
		}
		
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setTotalItem(totalItem);
		cart.setTotalPrice(totalPrice);
		cart.setDiscount(totalPrice-totalDiscountedPrice);
		
		return cartRepository.save(cart);
	}
	
	
	

}
