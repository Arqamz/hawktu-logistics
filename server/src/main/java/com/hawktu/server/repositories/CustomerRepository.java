package com.hawktu.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hawktu.server.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Find by email
    Optional<Customer> findByEmail(String email);

    // Find customers registered in the current month
    @Query("SELECT c FROM Customer c WHERE YEAR(c.registeredAt) = :year AND MONTH(c.registeredAt) = :month")
    List<Customer> findCustomersRegisteredInCurrentMonth(@Param("year") int year, @Param("month") int month);
}
