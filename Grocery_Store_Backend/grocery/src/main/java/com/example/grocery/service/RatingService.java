package com.example.grocery.service;

import java.util.List;

import com.example.grocery.exception.ProductException;
import com.example.grocery.model.Rating;
import com.example.grocery.model.User;
import com.example.grocery.request.RatingRequest;

public interface RatingService {

	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating>getProductsRating(Long productId);
}
