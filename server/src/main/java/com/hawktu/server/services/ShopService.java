package com.hawktu.server.services;

import com.hawktu.server.dtos.request.ProductFilterRequest;
import com.hawktu.server.dtos.response.ProductDTO;
import com.hawktu.server.dtos.response.ProductListResponse;
import com.hawktu.server.repositories.ReviewRepository;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Review;
import com.hawktu.server.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShopService {
    private static final int PAGE_SIZE = 24;

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    public ShopService(ProductRepository productRepository, ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    public ProductListResponse getProductsByPage(int page) {
        // Create a pageable request with the current page and fixed page size
        Pageable pageRequest = PageRequest.of(page, PAGE_SIZE);

        // Fetch the page of products
        Page<Product> productPage = productRepository.findAll(pageRequest);

        // Convert Product entities to ProductDTOs
        List<ProductDTO> productDTOs = productPage.getContent().stream()
            .map(this::convertToProductDTO)
            .collect(Collectors.toList());

        // Calculate total number of pages
        int totalPages = productPage.getTotalPages();

        // Create and return the response DTO
        return new ProductListResponse(
            productDTOs, 
            totalPages, 
            page, 
            productPage.getTotalElements()
        );
    }


    public ProductListResponse getFilteredProducts(ProductFilterRequest filterRequest) {
        // Prepare sorting
        Sort sort = prepareSorting(filterRequest.getSortBy());
        
        // Prepare pagination
        Pageable pageable = PageRequest.of(
            filterRequest.getPage(), 
            PAGE_SIZE, 
            sort
        );

        // Perform dynamic filtering
        Page<Product> productPage = productRepository.findByDynamicFilter(
            filterRequest.getMinPrice(), 
            filterRequest.getMaxPrice(), 
            filterRequest.getMinRating(), 
            filterRequest.getCategoryId(), 
            pageable
        );

        // Convert to DTOs
        List<ProductDTO> productDTOs = productPage.getContent().stream()
            .map(this::convertToProductDTO)
            .collect(Collectors.toList());

        // Construct response
        ProductListResponse response = new ProductListResponse();
        response.setProducts(productDTOs);
        response.setNumOfPages(productPage.getTotalPages());
        response.setCurrentPage(productPage.getNumber());
        response.setTotalProducts((int) productPage.getTotalElements());

        return response;
    }

    private Sort prepareSorting(ProductFilterRequest.SortOption sortOption) {
        switch (sortOption) {
            case PRICE_LOW_TO_HIGH:
                return Sort.by("price").ascending();
            case PRICE_HIGH_TO_LOW:
                return Sort.by("price").descending();
            case RATING_HIGH_TO_LOW:
                return Sort.by("rating").descending();
            default:
                return Sort.unsorted();
        }
    }

    private ProductDTO convertToProductDTO(Product product) {
        return new ProductDTO(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getCategoryId().toString(), 
            product.getImageLink()     
        );
    }

    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findAllByProductId(productId);
    }
}