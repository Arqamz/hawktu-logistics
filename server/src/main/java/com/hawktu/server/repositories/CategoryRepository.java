package com.hawktu.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hawktu.server.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Recursive query to fetch the entire category tree
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.parentCategory")
    List<Category> findAllWithHierarchy();

    // Fetch all categories
    @Query("SELECT c FROM Category c")
    List<Category> findAllCategories();

    // Fetch all parent categories (categories that are parents to other categories)
    @Query("SELECT DISTINCT c FROM Category c WHERE EXISTS (SELECT 1 FROM Category child WHERE child.parentCategory = c)")
    List<Category> findAllParentCategories();

    // Fetch all non-parent categories (categories that are not parents to any other categories)
    @Query("SELECT c FROM Category c WHERE NOT EXISTS (SELECT 1 FROM Category child WHERE child.parentCategory = c)")
    List<Category> findAllLeafCategories();
}
