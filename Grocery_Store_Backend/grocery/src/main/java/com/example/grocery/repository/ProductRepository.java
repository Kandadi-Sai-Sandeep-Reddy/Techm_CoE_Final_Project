/*
package com.example.grocery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.grocery.model.Product;

public interface ProductRepository extends JpaRepository<Product,Long>{
	
	
	@Query("SELECT p FROM PRODUCT p"+
	"WHERE(p.category.name= :category OR :category= '')"+
	"AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice))"+
			"AND (:minDiscount IS NULL OR p.discountPresent>= :minDiscount)"+
	"ORDER BY "+
			"CASE WHEN :sort='price_low' THEN p.discountedPrice END ASC,"+
			"CASE WHEN :sort='price_high' THEN p.discountedPrice END DESC"
			)
	public List<Product> filterProducts(@Param("category")String category,
			@Param("minPrice")Integer minPrice,
			@Param("maxPrice")Integer maxPrice,
			@Param("minDiscount")Integer minDiscount,
			@Param("sort")String sort);
}

*/


/*package com.example.grocery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.grocery.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p " +
           "WHERE (:category IS NULL OR p.category.name = :category) " +
           "AND (:minPrice IS NULL OR :maxPrice IS NULL OR p.discountedPrice BETWEEN :minPrice AND :maxPrice) " +
           "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
           "ORDER BY " +
           "CASE WHEN :sort = 'price_low' THEN p.discountedPrice ELSE NULL END ASC, " +
           "CASE WHEN :sort = 'price_high' THEN p.discountedPrice ELSE NULL END DESC")
    List<Product> filterProducts(@Param("category") String category,
                                 @Param("minPrice") Integer minPrice,
                                 @Param("maxPrice") Integer maxPrice,
                                 @Param("minDiscount") Integer minDiscount,
                                 @Param("sort") String sort);
}
*/
package com.example.grocery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.grocery.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findAll();
	
	
    @Query("SELECT p FROM Product p " +
           "WHERE (:category IS NULL OR p.category.name = :category) " +
           "AND (:minPrice IS NULL OR :maxPrice IS NULL OR p.discountedPrice BETWEEN :minPrice AND :maxPrice) " +
           "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
           "ORDER BY " +
           "CASE WHEN :sort = 'price_low' THEN p.discountedPrice ELSE NULL END ASC, " +
           "CASE WHEN :sort = 'price_high' THEN p.discountedPrice ELSE NULL END DESC")
    List<Product> filterProducts(@Param("category") String category,
                                 @Param("minPrice") Integer minPrice,
                                 @Param("maxPrice") Integer maxPrice,
                                 @Param("minDiscount") Integer minDiscount,
                                 @Param("sort") String sort);
    @Query("SELECT p FROM Product p")
    List<Product> findAllProducts();
}
