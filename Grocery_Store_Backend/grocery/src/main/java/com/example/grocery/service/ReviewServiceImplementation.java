package com.example.grocery.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.grocery.exception.ProductException;
import com.example.grocery.model.Product;
import com.example.grocery.model.Review;
import com.example.grocery.model.User;
import com.example.grocery.repository.ProductRepository;
import com.example.grocery.repository.ReviewRepository;
import com.example.grocery.request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements ReviewService{

	private ReviewRepository reviewRepository;
	private ProductService productService;
	private ProductRepository productRepository;
	
	public ReviewServiceImplementation(ReviewRepository reviewRepository,ProductService productService,ProductRepository productRepository) {

		this.reviewRepository=reviewRepository;
		this.productService=productService;
		this.productRepository=productRepository;
	}
	
	@Override
	public Review CreateReview(ReviewRequest req, User user) throws ProductException {
		// TODO Auto-generated method stub
		
		Product product=productService.findProductById(req.getProductId());
		
		Review review=new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setCreatedAt(LocalDateTime.now());
		
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReview(Long productId) {
		// TODO Auto-generated method stub
		
		return reviewRepository.getAllProductsReview(productId);
	}
	

}
