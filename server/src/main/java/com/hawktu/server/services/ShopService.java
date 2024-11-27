package com.hawktu.server.services;

import com.hawktu.server.dtos.response.ProductDTO;
import com.hawktu.server.dtos.response.ProductListResponse;
import com.hawktu.server.models.Product;
import com.hawktu.server.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShopService {
    private static final int PAGE_SIZE = 24;

    private final ProductRepository productRepository;

    @Autowired
    public ShopService(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
}