package com.hawktu.server.repositories;

import com.hawktu.server.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Fetch categories with no parent (root categories)
    List<Category> findByParentCategoryIsNull();

    // Fetch subcategories of a specific parent category
    List<Category> findByParentCategoryId(Long parentCategoryId);

    // Find a category by name (could be useful for querying by name)
    Optional<Category> findByName(String name);

    // Fetch all categories including nested ones (recursively _ if needed, but could require a custom query)
    List<Category> findByParentCategory(Category parentCategory);
}
