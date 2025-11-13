package com.project1.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project1.backend.models.Inventory;
import com.project1.backend.models.InventoryId;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, InventoryId> {
    
    public List<Inventory> findByWarehouseId(Integer warehouseId);

    public List<Inventory> findByProductId(Integer productId);
}
