package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_transactions")
@Data
public class PaymentTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String txnId;
    private String studentRoll;
    private String studentName;
    private String studentEmail;
    private Long amount;
    private String paymentMethod; // upi, card, netbanking
    private String status; // pending, approved, rejected
    private String remarks;
    private LocalDateTime submittedAt;
    private LocalDateTime reviewedAt;
    private String reviewedBy;
}
