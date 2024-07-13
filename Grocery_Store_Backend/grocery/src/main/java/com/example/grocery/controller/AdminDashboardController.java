
package com.example.grocery.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.grocery.service.OrderService;
import com.example.grocery.service.ProductService;
import com.example.grocery.service.UserService;


@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final OrderService orderService;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public AdminDashboardController(OrderService orderService, ProductService productService, UserService userService) {
        this.orderService = orderService;
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping("/orders/count")
    public ResponseEntity<Long> getOrderCount() {
        long count = orderService.countOrders();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/products/count")
    public ResponseEntity<Long> getProductCount() {
        long count = productService.countProducts();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/customers/count")
    public ResponseEntity<Long> getCustomerCount() {
        long count = userService.countCustomers();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}

