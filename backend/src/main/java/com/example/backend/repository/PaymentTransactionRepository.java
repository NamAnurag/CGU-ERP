package com.example.backend.repository;

import com.example.backend.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    List<PaymentTransaction> findByStudentEmail(String email);
    List<PaymentTransaction> findByStudentRoll(String roll);
    List<PaymentTransaction> findByStatus(String status);
}
