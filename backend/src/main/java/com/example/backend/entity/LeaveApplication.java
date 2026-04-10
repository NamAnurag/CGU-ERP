package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "leave_applications")
@Data
public class LeaveApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String facultyEmpId;
    private String type; // Casual, Medical, Earned, On Duty
    private String fromDate;
    private String toDate;
    private Integer days;
    private String reason;
    private String substitute;
    private String status; // pending, approved, rejected
    private String color;
}
