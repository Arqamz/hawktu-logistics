package com.hawktu.server.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hawktu.server.dtos.request.CartDTO;
import com.hawktu.server.dtos.request.CartProductDTO;
import com.hawktu.server.dtos.request.OrderItemDTO;
import com.hawktu.server.dtos.request.ProductFilterRequest;
import com.hawktu.server.dtos.response.OrderItemStatusDTO;
import com.hawktu.server.dtos.response.OrderStatusDTO;
import com.hawktu.server.dtos.response.ProductDTO;
import com.hawktu.server.dtos.response.ProductListResponse;
import com.hawktu.server.dtos.response.ReviewResponsePayload;
import com.hawktu.server.dtos.response.ReviewsResponse;
import com.hawktu.server.factories.OrderFactory;
import com.hawktu.server.models.Category;
import com.hawktu.server.models.Customer;
import com.hawktu.server.models.Order;
import com.hawktu.server.models.OrderItem;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Review;
import com.hawktu.server.repositories.CategoryRepository;
import com.hawktu.server.repositories.OrderItemRepository;
import com.hawktu.server.repositories.ProductRepository;
import com.hawktu.server.repositories.ReviewRepository;

@Service
public class ShopService {
    private static final int PAGE_SIZE = 24;

    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final ReviewRepository reviewRepository;
    
    @Autowired
    private final ProductService productService;
    
    @Autowired
    private final CustomerService customerService;
    
    @Autowired
    private final OrderFactory orderFactory;

    @Autowired
    private final OrderItemRepository orderItemRepository;

    @Autowired
    public ShopService(ProductRepository productRepository, ReviewRepository reviewRepository, CategoryRepository categoryRepository, ProductService productService, CustomerService customerService, OrderFactory orderFactory, OrderItemRepository orderItemRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.categoryRepository = categoryRepository;
        this.productService = productService;
        this.customerService = customerService;
        this.orderFactory = orderFactory;
        this.orderItemRepository = orderItemRepository;
    }

    public ProductListResponse getProductsByPage(int page) {
        Pageable pageRequest = PageRequest.of(page, PAGE_SIZE);

        Page<Product> productPage = productRepository.findAll(pageRequest);

        List<ProductDTO> productDTOs = productPage.getContent().stream()
            .map(this::convertToProductDTO)
            .collect(Collectors.toList());

        int totalPages = productPage.getTotalPages();

        return new ProductListResponse(
            productDTOs, 
            totalPages, 
            page, 
            productPage.getTotalElements()
        );
    }

    public ProductListResponse getFilteredProducts(ProductFilterRequest filterRequest) {
        Sort sort = prepareSorting(filterRequest.getSortBy());
        
        Pageable pageable = PageRequest.of(
            filterRequest.getPage(), 
            PAGE_SIZE, 
            sort
        );

        Page<Product> productPage = productRepository.findByDynamicFilter(
            filterRequest.getMinPrice(), 
            filterRequest.getMaxPrice(), 
            filterRequest.getMinRating(),
            filterRequest.getMaxRating(), 
            filterRequest.getCategoryId(), 
            pageable
        );

        List<ProductDTO> productDTOs = productPage.getContent().stream()
            .map(this::convertToProductDTO)
            .collect(Collectors.toList());

        ProductListResponse response = new ProductListResponse();
        response.setProducts(productDTOs);
        response.setNumOfPages(productPage.getTotalPages());
        response.setCurrentPage(productPage.getNumber());
        response.setTotalProducts((int) productPage.getTotalElements());

        return response;
    }

    private Sort prepareSorting(ProductFilterRequest.SortOption sortOption) {
        return switch (sortOption) {
            case PRICE_LOW_TO_HIGH -> Sort.by("price").ascending();
            case PRICE_HIGH_TO_LOW -> Sort.by("price").descending();
            case RATING_HIGH_TO_LOW -> Sort.by("rating").descending();
            default -> Sort.unsorted();
        };
    }

    private ProductDTO convertToProductDTO(Product product) {
        return new ProductDTO(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getCategoryId().toString(), 
            product.getImageLink(), 
            product.getAverageRating()    
        );
    }

    public ReviewsResponse getReviewsByProductId(Long productId) {

        List<Review> reviews = reviewRepository.findAllByProductId(productId);

        List<ReviewResponsePayload> reviewResponsePayloads = new ArrayList<>();

        for (Review review : reviews) {
            String customerName = customerService.findFullNameById(review.getCustomerId());

            ReviewResponsePayload payload = new ReviewResponsePayload(
                review.getId(),
                review.getProductId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                customerName
            );
            reviewResponsePayloads.add(payload);
        }

        return new ReviewsResponse(reviewResponsePayloads);

    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAllCategories();
    }
    
    @Transactional
    public Order placeOrder(CartDTO cartDTO) {
        Customer customer = customerService.getCustomerByEmail(cartDTO.getEmail());

        double total = 0.0;
        List<OrderItemDTO> orderItemDTOs = new ArrayList<>();

        for (CartProductDTO cartProduct : cartDTO.getCartProducts()) {
            Product product = productService.getProductById(cartProduct.getProductId());

            double productTotal = product.getPrice().multiply(BigDecimal.valueOf(cartProduct.getQuantity())).doubleValue();
            total +=(productTotal);

            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.setProductId(product.getId());
            orderItemDTO.setUnitPrice(product.getPrice());
            orderItemDTO.setQuantity(cartProduct.getQuantity());
            orderItemDTO.setDeliveryAddress(cartDTO.getDeliveryAddress());

            orderItemDTOs.add(orderItemDTO);
        }

        int loyaltyPoints = ((int)(total*10));

        for (CartProductDTO cartProduct : cartDTO.getCartProducts()) {
            Product product = productService.getProductById(cartProduct.getProductId());
            productService.updateProductStock(product, cartProduct.getQuantity());
        }

        customerService.updateCustomerWallet(customer, total);
        customerService.updateCustomerLoyaltyPoints(customer, loyaltyPoints);

        return orderFactory.createOrder(customer.getId(), orderItemDTOs);
    }

    public OrderStatusDTO findOrderStatus(Long orderId) {
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(orderId);
        
        if (orderItems.isEmpty()) {
            throw new RuntimeException("No order items found for order ID: " + orderId);
        }

        List<OrderItemStatusDTO> orderItemStatusDTOs = orderItems.stream()
            .map(orderItem -> {
                Product product = productRepository.findById(orderItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found for ID: " + orderItem.getProductId()));
                
                return new OrderItemStatusDTO(orderItem, product.getName());
            })
            .collect(Collectors.toList());

        return new OrderStatusDTO(orderItemStatusDTOs);
    }
}