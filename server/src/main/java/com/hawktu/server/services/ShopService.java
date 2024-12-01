package com.hawktu.server.services;

import com.hawktu.server.dtos.request.ProductFilterRequest;
import com.hawktu.server.dtos.response.ProductDTO;
import com.hawktu.server.dtos.response.ProductListResponse;
import com.hawktu.server.repositories.ReviewRepository;
import com.hawktu.server.repositories.ProductRepository;
import com.hawktu.server.repositories.CategoryRepository;
import com.hawktu.server.models.Category;
import com.hawktu.server.models.Product;
import com.hawktu.server.models.Review;
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
    private final CategoryRepository categoryRepository;

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    public ShopService(ProductRepository productRepository, ReviewRepository reviewRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.categoryRepository = categoryRepository;
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
            filterRequest.getMaxRating(), 
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

    public List<Category> getAllCategories() {
        return categoryRepository.findAllCategories();
     }
}