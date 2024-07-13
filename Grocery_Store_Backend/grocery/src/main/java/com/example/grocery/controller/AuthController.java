package com.example.grocery.controller;


import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.grocery.config.JwtProvider;
import com.example.grocery.exception.UserException;
import com.example.grocery.model.Cart;
import com.example.grocery.model.User;
import com.example.grocery.repository.UserRepository;
import com.example.grocery.request.LoginRequest;
import com.example.grocery.response.AuthResponse;
import com.example.grocery.service.CartService;
import com.example.grocery.service.CustomerUserServiceImplementation;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private CustomerUserServiceImplementation customUserService;
	private CartService cartService;
	
	public AuthController(UserRepository userRepository,CustomerUserServiceImplementation customUserService,PasswordEncoder passwordEncoder,JwtProvider jwtProvider,CartService cartService) {
		this.userRepository=userRepository;
		this.customUserService=customUserService;
		this.passwordEncoder=passwordEncoder;
		this.jwtProvider=jwtProvider;
		this.cartService=cartService;
	}
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user)throws UserException{
		
		String email=user.getEmail();
		String password=user.getPassword();
		String firstName=user.getFirstName();
		String lastName=user.getLastName();
		String role=user.getRole();
		String mobile=user.getMobile();		
		User isEmailExist=userRepository.findByEmail(email);
		
		if(isEmailExist!=null) {
			throw new UserException("Email is already used with another account");
		}
		
		
		
		User createdUser=new User();
		createdUser.setEmail(email);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setFirstName(firstName);
		createdUser.setLastName(lastName);
		createdUser.setRole(role);
		createdUser.setMobile(mobile);
		
		User SavedUser=userRepository.save(createdUser);
		
		Cart cart=cartService.createCart(SavedUser);
		
		Authentication authentication=new UsernamePasswordAuthenticationToken(SavedUser.getEmail(),SavedUser.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token=jwtProvider.generateToken(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("signup success");
		
		return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
	}
	

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse>loginUserHandler(@RequestBody LoginRequest loginRequest){
		String username=loginRequest.getEmail();
		String password=loginRequest.getPassword();
		
		Authentication authentication=authenticate(username,password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token=jwtProvider.generateToken(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("signin success");
		
		return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
		
		
	}

	private Authentication authenticate(String username, String password) {
		// TODO Auto-generated method stub
		UserDetails userDetails=customUserService.loadUserByUsername(username);
		if(userDetails==null) {
			throw new BadCredentialsException("Invalid User Name");
		}
		if(!passwordEncoder.matches(password, userDetails.getPassword())){
			throw new BadCredentialsException("Invalid Password...");
		}
		
		return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities()) ;
	}
}
