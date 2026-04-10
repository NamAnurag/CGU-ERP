package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String roll;
    private String email;
    private String dept;
    private Integer sem;
    private Double cgpa;
    private Integer attendance;
    private String status; // active, suspended
    private String color;
}
