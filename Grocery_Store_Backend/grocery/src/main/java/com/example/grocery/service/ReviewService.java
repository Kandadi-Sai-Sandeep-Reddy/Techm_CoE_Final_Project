package com.example.grocery.service;

import java.util.List;

import com.example.grocery.exception.ProductException;
import com.example.grocery.model.Review;
import com.example.grocery.model.User;
import com.example.grocery.request.ReviewRequest;

public interface ReviewService {

	public Review CreateReview(ReviewRequest req,User user)throws ProductException;
	
	public List<Review>getAllReview(Long productId);
}
