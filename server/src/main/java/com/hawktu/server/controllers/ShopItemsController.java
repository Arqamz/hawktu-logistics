package com.hawktu.server.controllers;

import com.hawktu.server.dtos.response.ProductListResponse;
import com.hawktu.server.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shop")
@CrossOrigin(origins = "http://localhost:5173") // Adjust frontend URL as needed
public class ShopItemsController extends BaseController {

    private final ShopService shopService;

    @Autowired
    public ShopItemsController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(
        @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        try {
            // Validate page number is non-negative
            if (page < 0) {
                logger.warn("Attempted to access negative page number: {}", page);
                return badRequestError("Invalid page number");
            }

            // Fetch products for the given page
            ProductListResponse productList = shopService.getProductsByPage(page);

            logger.info("Successfully retrieved products for page {}", page);
            return ResponseEntity.ok(productList);

        } catch (IllegalArgumentException e) {
            // Handle invalid arguments
            logger.error("Invalid argument when fetching products: ", e);
            return badRequestError("Invalid request parameters");

        } catch (Exception e) {
            // Catch any unexpected errors
            logger.error("Unexpected error while fetching products: ", e);
            return internalServerError("Internal server error");
        }
    }
}
