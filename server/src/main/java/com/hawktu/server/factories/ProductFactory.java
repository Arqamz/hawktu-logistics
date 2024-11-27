package com.hawktu.server.factories;

import com.hawktu.server.models.Product;
import com.hawktu.server.builders.ProductBuilder;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import com.hawktu.server.repositories.ProductRepository;

public class ProductFactory {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(String name, String description, BigDecimal price, String imageLink, 
                                            boolean unlisted, Double averageRating, Long categoryId, int stock, Long sellerId) {
        Product product = new ProductBuilder()
            .name(name)
            .description(description)
            .price(price)
            .imageLink(imageLink)
            .unlisted(unlisted)
            .averageRating(averageRating)
            .categoryId(categoryId)
            .stock(stock)
            .sellerId(sellerId)
            .build();
        
        productRepository.save(product);
        return product;


    }

}