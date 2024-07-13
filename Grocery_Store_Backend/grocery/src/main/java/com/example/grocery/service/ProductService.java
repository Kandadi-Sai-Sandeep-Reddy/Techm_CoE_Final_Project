package com.example.grocery.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.grocery.exception.ProductException;
import com.example.grocery.model.Product;
import com.example.grocery.request.CreateProductRequest;

public interface ProductService {
	
	public Product createProduct(CreateProductRequest req);
	
	public String deleteProduct(Long productId) throws ProductException;
	
	public Product updateProduct(Long productId,Product req) throws ProductException;
	
	public Product findProductById(Long id) throws ProductException;
	
	public List<Product>findProductByCategory(String category);
	
	public Page<Product>getAllProduct(String category,List<String>colors,List<String>sizes,Integer minPrice,Integer maxPrice,Integer minDiscount,String sort,String stock,Integer pageNumber,Integer pageSize);

	List<Product> getAllProducts();
	
	public long countProducts();


	

}
