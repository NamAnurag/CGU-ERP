package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "courses")
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String name;
    private String dept;
    private Integer sem;
    private Integer credits;
    private String faculty;
    private Integer students;
    private String status; // active, inactive
    private String color;
}
