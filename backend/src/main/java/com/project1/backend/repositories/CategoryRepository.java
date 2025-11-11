package com.project1.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project1.backend.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
     
}

