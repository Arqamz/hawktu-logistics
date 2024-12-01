package com.hawktu.server.controllers;

import com.hawktu.server.dtos.response.ProductListResponse;
import com.hawktu.server.models.Category;
import com.hawktu.server.models.Review;
import com.hawktu.server.dtos.request.ProductFilterRequest;
import com.hawktu.server.services.ShopService;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/shop")
@CrossOrigin(origins = "http://localhost:5173") // Adjust frontend URL as needed
public class ShopController extends BaseController {

    private final ShopService shopService;

    @Autowired
    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "minPrice", required = false) BigDecimal minPrice,
        @RequestParam(value = "maxPrice", required = false) BigDecimal maxPrice,
        @RequestParam(value = "minRating", required = false) Double minRating,
        @RequestParam(value = "minRating", required = false) Double maxRating,
        @RequestParam(value = "categoryId", required = false) Long categoryId,
        @RequestParam(value = "sortBy", defaultValue = "DEFAULT") ProductFilterRequest.SortOption sortBy
    ) {
        try {
            if (page < 0) {
                logger.warn("Attempted to access negative page number: {}", page);
                return badRequestError("Invalid page number");
            }

            ProductFilterRequest filterRequest = new ProductFilterRequest();
            filterRequest.setPage(page);
            filterRequest.setMinPrice(minPrice);
            filterRequest.setMaxPrice(maxPrice);
            filterRequest.setMinRating(minRating);
            filterRequest.setMaxRating(maxRating);
            filterRequest.setCategoryId(categoryId);
            filterRequest.setSortBy(sortBy);

            ProductListResponse productList = shopService.getFilteredProducts(filterRequest);

            logger.info("Successfully retrieved products for page {} with filters", page);
            return ResponseEntity.ok(productList);

        } catch (IllegalArgumentException e) {
            logger.error("Invalid argument when fetching products: ", e);
            return badRequestError("Invalid request parameters");

        } catch (Exception e) {
            logger.error("Unexpected error while fetching products: ", e);
            return internalServerError("Internal server error");
        }
    }

    @GetMapping("/reviews")
    public ResponseEntity<?> getProductReviews(@RequestParam Long productId) {
        try {
            if (productId == null || productId <= 0) {
                return badRequestError("Invalid product ID");
            }

            List<Review> reviews = shopService.getReviewsByProductId(productId);
            
            if (reviews.isEmpty()) {
                return notFoundError("No reviews found for the specified product");
            }

            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            logger.error("Error fetching reviews for product ID: " + productId, e);
            return internalServerError("An error occurred while fetching product reviews");
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        try {
        List<Category> categories = shopService.getAllCategories();
       
       if (categories.isEmpty()) {
           return notFoundError("No categories found");
       }

       return ResponseEntity.ok(categories);
   } catch (Exception e) {
       logger.error("Error fetching categories", e);
       return internalServerError("An error occurred while fetching categories");
   }
}

}
