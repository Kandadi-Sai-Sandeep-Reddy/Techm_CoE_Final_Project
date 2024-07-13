package com.example.grocery.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.grocery.exception.OrderException;
import com.example.grocery.model.Address;
import com.example.grocery.model.Cart;
import com.example.grocery.model.CartItem;
import com.example.grocery.model.Order;
import com.example.grocery.model.OrderItem;
import com.example.grocery.model.User;
import com.example.grocery.repository.AddressRepository;
import com.example.grocery.repository.CartRepository;
import com.example.grocery.repository.OrderItemRepository;
import com.example.grocery.repository.OrderRepository;
import com.example.grocery.repository.UserRepository;

@Service
public class OrderServiceImplementation implements OrderService{
	
	//private CartRepository cartRepository;
	private CartService cartService;
	//private ProductService productService;
	private OrderRepository orderRepository;
	private AddressRepository addressRepository;
	private UserRepository userRepository;
	private OrderItemRepository orderItemRepository;
	private OrderItemService orderItemService;
	
	public OrderServiceImplementation(CartService cartService,OrderRepository orderRepository,
			AddressRepository addressRepository,UserRepository userRepository,OrderItemRepository orderItemRepository,
			OrderItemService orderItemService) {
		this.cartService=cartService;
		this.addressRepository=addressRepository;
		this.orderItemRepository=orderItemRepository;
		this.orderItemService=orderItemService;
		this.userRepository=userRepository;
		this.orderRepository=orderRepository;
	}

	@Override
	public Order createOrder(User user, Address shippingAddress) {
		// TODO Auto-generated method stub
		
		shippingAddress.setUser(user);
		Address address=addressRepository.save(shippingAddress);
		user.getAddress().add(address);
		userRepository.save(user);
		Cart cart=cartService.findUserCart(user.getId());
		List<OrderItem> orderItems=new ArrayList<>();
		
		for(CartItem item:cart.getCartItems()) {
			OrderItem orderItem=new OrderItem();
			
			orderItem.setPrice(item.getPrice());
			orderItem.setProduct(item.getProduct());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setSize(item.getSize());
			orderItem.setUserId(item.getUserId());
			orderItem.setDiscountedPrice(item.getDiscountedPrice());
			
			OrderItem createdOrderItem=orderItemRepository.save(orderItem);
			
			orderItems.add(createdOrderItem);
		}
		Order createdOrder=new Order();
		createdOrder.setUser(user);
		createdOrder.setOrderitems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItem(cart.getTotalItem());
		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.getPaymentDetails().setStatus("PENDING");
		createdOrder.setCreatedAt(LocalDateTime.now());
		
		Order savedOrder=orderRepository.save(createdOrder);
		
		for(OrderItem item:orderItems) {
			item.setOrder(savedOrder);
			orderItemRepository.save(item);
		}
		
		
		return savedOrder;
	}

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		Optional<Order> opt=orderRepository.findById(orderId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		
		throw new OrderException("order not exist with id"+orderId);
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		// TODO Auto-generated method stub
		List<Order> orders=orderRepository.getUsersOrders(userId);
		return orders;
	}

	@Override
	public Order placedOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		
		Order order=findOrderById(orderId);
		order.setOrderStatus("PLACED");
		order.getPaymentDetails().setStatus("COMPLETED");
		return order;
	}

	@Override
	public Order ConfirmedOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		Order order=findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		return orderRepository.save(order);
	}

	@Override
	public Order ShippedOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		Order order=findOrderById(orderId);
		order.setOrderStatus("SHIPPED");
		return orderRepository.save(order);
		
	}

	@Override
	public Order DeliveredOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		Order order=findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
	}

	@Override
	public Order CancelledOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		
		Order order=findOrderById(orderId);
		order.setOrderStatus("CANCELLED");
		return orderRepository.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		// TODO Auto-generated method stub
		
		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		
		Order order=findOrderById(orderId);
		orderRepository.deleteById(orderId);
		
	}
	
	@Override
    public long countOrders() {
        return orderRepository.count();
    }


}
