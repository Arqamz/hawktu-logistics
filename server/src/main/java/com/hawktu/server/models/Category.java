package com.hawktu.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;  // Nullable: Root categories will have no parent

    @Column(nullable = false)
    private boolean isActive;

    public Category() {}

    public Category(String name, Category parentCategory, boolean isActive) {
        this.name = name;
        this.parentCategory = parentCategory;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(Category parentCategory) {
        this.parentCategory = parentCategory;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public String toString() {
        return String.format("Category[id=%s, name=%s, parent=%s, isActive=%s]",
                "C" + id, name, parentCategory != null ? parentCategory.getName() : "None", isActive);
    }
}
