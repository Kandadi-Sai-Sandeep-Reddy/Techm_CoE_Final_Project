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

import com.example.grocery.exception.ProductException;
import com.example.grocery.exception.UserException;
import com.example.grocery.model.Rating;
import com.example.grocery.model.User;
import com.example.grocery.request.RatingRequest;
import com.example.grocery.service.RatingService;
import com.example.grocery.service.UserService;

@RestController
@RequestMapping("/api/ratings")

public class RatingController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RatingService ratingService;
	
	@PostMapping("/create")
	public ResponseEntity<Rating>createRating(@RequestBody RatingRequest req,
			@RequestHeader("Authorization")String jwt) throws UserException,ProductException{
		User user=userService.findUserProfileByJwt(jwt);
		Rating rating=ratingService.createRating(req, user);
		return new ResponseEntity<Rating>(rating,HttpStatus.CREATED);
	}
	
	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Rating>>getProductsRating(@PathVariable Long productId,
			@RequestHeader("Authorization")String jwt) throws UserException,ProductException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Rating> ratings=ratingService.getProductsRating(productId);
		
		return new ResponseEntity<>(ratings,HttpStatus.CREATED);
	}
	

}
