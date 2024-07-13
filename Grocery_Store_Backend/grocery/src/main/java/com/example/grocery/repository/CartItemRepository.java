package com.example.grocery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.grocery.model.Cart;
import com.example.grocery.model.CartItem;
import com.example.grocery.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem,Long>{
	
	@Query("SELECT ci From CartItem ci Where ci.cart=:cart And ci.product=:product And ci.size=:size And ci.userId=:userId")
	public CartItem isCartItemExist(@Param("cart")Cart cart,@Param("product")Product product,@Param("size")String size,@Param("userId")Long userId);
	

}
