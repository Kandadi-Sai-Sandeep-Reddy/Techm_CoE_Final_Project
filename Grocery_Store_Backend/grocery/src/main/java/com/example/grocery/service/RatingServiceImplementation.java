package com.example.grocery.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.grocery.exception.ProductException;
import com.example.grocery.model.Product;
import com.example.grocery.model.Rating;
import com.example.grocery.model.User;
import com.example.grocery.repository.RatingRepository;
import com.example.grocery.request.RatingRequest;

@Service
public class RatingServiceImplementation implements RatingService {
	
	private RatingRepository ratingRepository;
	private ProductService productService;
	
	public RatingServiceImplementation(RatingRepository ratingRepository,ProductService productService) {
		this.ratingRepository=ratingRepository;
		this.productService=productService;
		
	}
	

	@Override
	public Rating createRating(RatingRequest req, User user) throws ProductException {
		// TODO Auto-generated method stub
		Product product=productService.findProductById(req.getProductId());
		
		Rating rating=new Rating();
		rating.setProduct(product);
		rating.setUser(user);
		rating.setRating(req.getRating());
		rating.setCreatedAt(LocalDateTime.now());
		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductsRating(Long productId) {
		// TODO Auto-generated method stub
		
		return ratingRepository.getAllProductsRating(productId);
	}

}
