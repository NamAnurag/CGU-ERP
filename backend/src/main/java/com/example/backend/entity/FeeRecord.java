package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "fee_records")
@Data
public class FeeRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String roll;
    private String dept;
    @Column(name = "academic_year")
    private Integer year;
    private Long total;
    private Long paid;
    private Long due;
    private String status; // paid, partial, unpaid
    private Long scholarship;
}
