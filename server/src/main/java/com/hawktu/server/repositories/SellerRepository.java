package com.hawktu.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    // Find by email
    Optional<Seller> findByEmail(String email);

    // Find sellers registered in the current month
    @Query("SELECT s FROM Seller s WHERE YEAR(s.registeredAt) = :year AND MONTH(s.registeredAt) = :month")
    List<Seller> findSellersRegisteredInCurrentMonth(@Param("year") int year, @Param("month") int month);
}
